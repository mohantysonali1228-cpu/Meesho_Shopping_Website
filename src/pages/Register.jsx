
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 3) {
      setError("Please enter at least 3 characters for your name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("meesho_users") || "[]"
    );

    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      setError("Email already registered. Please login.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      password,
    };

    localStorage.setItem(
      "meesho_users",
      JSON.stringify([...users, newUser])
    );

    setUser({
      name: newUser.name,
      email: newUser.email,
    });

    navigate("/profile");
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-brand">meesho<span>.</span></div>

          <div className="auth-left-content">
            <ShoppingBag size={60} />
            <h1>Join Meesho!</h1>
            <p>Create your account and discover amazing products.</p>
          </div>

          <p className="auth-bottom-text">
            Your Shopping Journey Starts Here!
          </p>
        </div>

        <div className="auth-right">
          <div className="auth-form">
            <h2>Create Account</h2>
            <p className="auth-subtitle">
              Sign up to start your shopping journey.
            </p>

            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-submit">
                Create Account
              </button>
            </form>

            <div className="auth-divider"><span>OR</span></div>

            <p className="auth-switch">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

            <Link to="/" className="back-home">
              ← Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
