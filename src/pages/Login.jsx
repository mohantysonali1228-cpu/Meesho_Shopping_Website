
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(
      localStorage.getItem("meesho_users") || "[]"
    );

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!found) {
      setError("Invalid email or password. Please register first.");
      return;
    }

    setUser({
      name: found.name,
      email: found.email,
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
            <h1>Welcome Back!</h1>
            <p>Discover amazing products and exciting deals.</p>
          </div>
          <p className="auth-bottom-text">Shop More. Save More.</p>
        </div>

        <div className="auth-right">
          <div className="auth-form">
            <h2>Login to your account</h2>
            <p className="auth-subtitle">
              Welcome back! Enter your account details.
            </p>

            <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
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

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-submit">
                Login
              </button>
            </form>

            <div className="auth-divider"><span>OR</span></div>

            <p className="auth-switch">
              Don't have an account?
              <Link to="/register"> Create Account</Link>
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

export default Login;
