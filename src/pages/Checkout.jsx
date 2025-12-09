import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { apiUrl } from "../utils/api";

const stripePromise = loadStripe("pk_test_51Nw...your_test_key_here..."); 

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const location = useLocation();
    const { amount = 1000, applicationData = {} } = location.state || {};
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.post(apiUrl("/payment/create-payment-intent"), { amount })
            .then(res => setClientSecret(res.data.clientSecret))
            .catch(() => setError("Failed to initialize payment."));
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);
        setError("");
        const card = elements.getElement(CardElement);
        const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        });
        if (stripeError) {
            setError(stripeError.message);
           
            await axios.post(apiUrl("/applications"), { ...applicationData, paymentStatus: "unpaid" });
            navigate("/dashboard/payment/failed");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          
            await axios.post(apiUrl("/applications"), { ...applicationData, paymentStatus: "paid" });
            navigate("/dashboard/payment/success", {
                state: {
                    scholarshipName: applicationData.scholarshipName,
                    universityName: applicationData.universityName,
                    amount: amount
                }
            });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Payment</h2>
            <CardElement className="mb-4 p-2 border rounded" />
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <button className="btn btn-primary w-full" type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay"}
            </button>
        </form>
    );
};

const Checkout = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Checkout;
