import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Redirect to home page if user is already logged in
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      console.log("Google login initiated");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User authenticated:", result.user);
      navigate('/');
    } catch (error) {
      console.error("Authentication error:", error);
      alert(`Authentication failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>
        <button
          onClick={handleGoogleLogin}
          className="login__container__google-btn"
          disabled={loading}
        >
          {loading ? (
            "Connecting..."
          ) : (
            <>
              <FcGoogle />
              Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
