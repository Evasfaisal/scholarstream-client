import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from "../context/AuthContext";
import apiUrl from "../utils/api";
import { FaCreditCard, FaLock, FaInfoCircle } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51Nw...your_key");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { scholarship } = location.state || {};

    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalAmount = scholarship ?
        (parseFloat(scholarship.applicationFees) + parseFloat(scholarship.serviceCharge)) : 0;

    useEffect(() => {
        if (!scholarship) {
            navigate('/allscholarships');
            return;
        }

        const createPaymentIntent = async () => {
            try {
                const applicationFees = parseFloat(scholarship.applicationFees) || 0;
                const serviceCharge = parseFloat(scholarship.serviceCharge) || 0;

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: (applicationFees + serviceCharge) * 100,
                        currency: 'usd',
                        metadata: {
                            scholarshipId: scholarship._id || scholarship.id,
                            userId: user?.uid || '',
                            scholarshipName: scholarship.scholarshipName
                        }
                    })
                });

                const data = await response.json();
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    setError("Failed to initialize payment.");
                }
            } catch (err) {
                setError("Failed to initialize payment.");
                console.error(err);
            }
        };

        createPaymentIntent();
    }, [scholarship, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !user) return;

        setLoading(true);
        setError("");

        const card = elements.getElement(CardElement);
        const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        });

        const applicationData = {
            scholarshipId: scholarship._id,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            universityName: scholarship.universityName,
            scholarshipCategory: scholarship.scholarshipCategory,
            degree: scholarship.degree,
            applicationFees: scholarship.applicationFees,
            serviceCharge: scholarship.serviceCharge,
            applicationStatus: "pending",
            applicationDate: new Date().toISOString(),
            feedback: ""
        };

        if (stripeError) {
            setError(stripeError.message);

            try {
                await apiUrl.post('/api/applications', {
                    ...applicationData,
                    paymentStatus: "unpaid"
                });
            } catch (err) {
                console.error("Error saving application:", err);
            }
            navigate("/failed", {
                state: {
                    scholarshipName: scholarship.scholarshipName,
                    error: stripeError.message,
                    scholarship: scholarship
                }
            });
        } else if (paymentIntent && paymentIntent.status === "succeeded") {

            try {

                await apiUrl.post('/api/applications', {
                    ...applicationData,
                    paymentStatus: "paid",
                    paymentIntentId: paymentIntent.id
                });
                console.log("Paid application created/updated successfully");
            } catch (err) {
                console.error("Error saving paid application:", err);
            }
            navigate("/success", {
                state: {
                    scholarshipName: scholarship.scholarshipName,
                    universityName: scholarship.universityName,
                    amount: totalAmount,
                    refresh: true
                }
            });
        }

        setLoading(false);
    };

    if (!scholarship) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="grid md:grid-cols-2 gap-8">

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Scholarship Summary</h2>
                    <img
                        src={scholarship.universityImage}
                        alt={scholarship.universityName}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-primary mb-2">{scholarship.scholarshipName}</h3>
                    <p className="text-slate-600 mb-4">{scholarship.universityName}</p>

                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-slate-700">
                            <span>Application Fees:</span>
                            <span className="font-semibold">${scholarship.applicationFees}</span>
                        </div>
                        <div className="flex justify-between text-slate-700">
                            <span>Service Charge:</span>
                            <span className="font-semibold">${scholarship.serviceCharge}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between text-lg font-bold text-primary">
                            <span>Total Amount:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-700 mb-2">Applicant Details</h4>
                        <p className="text-sm text-slate-600">Name: {user?.displayName}</p>
                        <p className="text-sm text-slate-600">Email: {user?.email}</p>
                    </div>
                </div>


                <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl p-8 border-2 border-green-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="text-5xl"><FaCreditCard /></div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                                Payment Information
                            </h2>
                            <p className="text-slate-600 text-sm">Secure payment powered by Stripe</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                            <label className="flex items-center gap-2 text-base font-bold text-slate-800 mb-4">
                                <span className="text-2xl"><FaCreditCard /></span>
                                Card Details
                            </label>
                            <div className="border-3 border-slate-300 rounded-xl p-5 focus-within:border-green-500 focus-within:shadow-lg transition-all duration-300 bg-slate-50">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '18px',
                                                color: '#1e293b',
                                                fontWeight: '500',
                                                '::placeholder': {
                                                    color: '#94a3b8',
                                                },
                                                iconColor: '#22c55e',
                                            },
                                            invalid: {
                                                color: '#ef4444',
                                                iconColor: '#ef4444',
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span>Secured with 256-bit SSL encryption</span>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-5 shadow-lg animate-scaleIn">
                                <div className="flex items-center gap-3">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <div className="font-bold text-red-900 mb-1">Payment Error</div>
                                        <span className="text-red-700 text-sm">{error}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-success w-full btn-lg text-xl font-extrabold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-2 border-green-400 gap-3"
                            disabled={!stripe || loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-lg"></span>
                                    <span className="text-lg">Processing Payment...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-3xl"><FaLock /></span>
                                    <span>Pay ${totalAmount.toFixed(2)}</span>
                                </>
                            )}
                        </button>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl"><FaInfoCircle /></span>
                                <div>
                                    <p className="text-sm text-slate-700 leading-relaxed mb-2">
                                        <span className="font-semibold">Your payment is 100% secure and encrypted.</span>
                                    </p>
                                    <p className="text-xs text-slate-600">
                                        By proceeding, you agree to our terms and conditions. Your card information is never stored on our servers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 opacity-70">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-8" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Checkout = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Checkout;
