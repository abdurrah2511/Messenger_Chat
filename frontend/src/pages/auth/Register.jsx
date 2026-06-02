import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await registerUser({ name, email, password });
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-grid">
        <div className="auth-aside">
          <div className="aside-card">
            <p className="muted small">Why join</p>
            <h2 className="aside-title">Start your messaging journey</h2>
            <p className="muted">Create your account and keep all your conversations in one place.</p>
          </div>

          <div className="aside-list">
            <div className="aside-item">
              <p className="font-semibold">Instant messages</p>
              <p className="muted">Jump straight into conversations with real-time updates.</p>
            </div>
            <div className="aside-item">
              <p className="font-semibold">Groups & teams</p>
              <p className="muted">Create group chats for friends, work, or communities.</p>
            </div>
            <div className="aside-item">
              <p className="font-semibold">Privacy first</p>
              <p className="muted">Your data is secure with end-to-end encryption.</p>
            </div>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-head">
            <p className="muted small">Get started</p>
            <h1 className="auth-title">Create account</h1>
            <p className="muted">Join the chat network and start messaging instantly.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="label">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Your name"
            />

            <label className="label">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
            />

            <label className="label">Password</label>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Create a password"
            />

            <button type="submit" className="btn btn-block btn-accent">Create account</button>
          </form>

          <p className="auth-foot">
            Already have an account?{' '}
            <Link to="/login" className="link">Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
