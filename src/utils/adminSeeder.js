import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";

// Admin Credentials - Change these to your desired admin credentials
const ADMIN_EMAIL = "admin@scholarstream.com";
const ADMIN_PASSWORD = "Admin@123456";
const ADMIN_NAME = "ScholarStream Admin";
const ADMIN_PHOTO = "https://via.placeholder.com/150";

export const createAdminAccount = async () => {
    try {
        console.log("Creating admin account...");

        // Create admin user with Firebase Auth
        const adminCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);

        // Update admin profile
        await updateProfile(adminCredential.user, {
            displayName: ADMIN_NAME,
            photoURL: ADMIN_PHOTO
        });

        // Save admin data to Firestore with Admin role
        await setDoc(doc(db, "users", adminCredential.user.uid), {
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            photoURL: ADMIN_PHOTO,
            role: "Admin",
            createdAt: new Date().toISOString(),
            isSeeded: true
        });

        console.log("✅ Admin account created successfully!");
        console.log("📧 Email:", ADMIN_EMAIL);
        console.log("🔒 Password:", ADMIN_PASSWORD);

        return {
            success: true,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        };

    } catch (error) {
        console.error("❌ Failed to create admin account:", error);

        if (error.code === 'auth/email-already-in-use') {
            console.log("👤 Admin account already exists!");
            return {
                success: false,
                message: "Admin account already exists",
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            };
        }

        throw error;
    }
};

// Helper function to check if admin exists
export const checkAdminExists = async () => {
    try {
        // This will be used to check if admin already exists
        return false; // For now, always allow creation
    } catch (error) {
        console.error("Error checking admin:", error);
        return false;
    }
};

// Export admin credentials for display
export const getAdminCredentials = () => ({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD
});