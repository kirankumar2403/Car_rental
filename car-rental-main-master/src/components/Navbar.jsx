import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const openRegister = (e) => {
    e.preventDefault();
    console.log('Opening register sidebar');
    setRegisterOpen(true);
    console.log('Register state after setting:', true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  // Disable page scroll when register sidebar is open
  useEffect(() => {
    if (registerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [registerOpen]);

  // Google authentication handler
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      console.log("Google authentication initiated");
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log("User authenticated:", result.user);
      closeRegister();
      alert(`Welcome ${result.user.displayName || result.user.email}!`);
    } catch (error) {
      console.error("Authentication error:", error);
      alert(`Authentication failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("You have been signed out");
    } catch (error) {
      console.error("Sign out error:", error);
      alert(`Sign out failed: ${error.message}`);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);



  // Log the registerOpen state before rendering
  console.log('Current registerOpen state:', registerOpen);

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link onClick={(e) => { openNav(); openRegister(e); }} to="#" className="mobile-navbar__sign-in">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link onClick={(e) => { openNav(); openRegister(e); }} to="#" className="mobile-navbar__register">
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <Link onClick={() => { openNav(); handleSignOut(); }} to="#">
                  Sign Out
                </Link>
              </li>
            )}
          </ul>
        </div>



        {/* desktop */}
        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
            {user ? (
              <>
                <span className="navbar__buttons__user-email">
                  {user.displayName || user.email}
                </span>
                <Link className="navbar__buttons__sign-out" onClick={handleSignOut} to="#">
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link className="navbar__buttons__sign-in" onClick={openRegister} to="#">
                  Sign In
                </Link>
                <Link className="navbar__buttons__register" onClick={openRegister} to="#">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
      {/* Register Sidebar */}
      <div className={`register-sidebar ${registerOpen ? 'open-sidebar' : ''}`}>
          <div className="register-sidebar__overlay" onClick={closeRegister}></div>
          <div className="register-sidebar__content">
            <div className="register-sidebar__close" onClick={closeRegister}>
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="register-sidebar__login">
              <h1>Login</h1>
              <button
                onClick={handleGoogleAuth}
                className="register-sidebar__login__google-btn"
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
        </div>
      
    </>
  );
}

export default Navbar;
