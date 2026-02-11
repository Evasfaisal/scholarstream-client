import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardSidebar from "../components/DashboardSidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(localStorage.getItem('userRole') || "Student");

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.uid && !localStorage.getItem('userRole')) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userRole = userDoc.data().role || "Student";
                        setRole(userRole);
                        localStorage.setItem('userRole', userRole);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        };

        fetchUserRole();
    }, [user]);

    return (
        <div className="flex min-h-screen bg-base-100">
            <aside className="w-64 min-h-screen bg-white/90 border-r border-slate-200 p-8 hidden md:block shadow-xl rounded-r-3xl">
                <DashboardSidebar role={role} />
            </aside>

            <main className="flex-1 p-4 sm:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
