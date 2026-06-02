import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginUser({ email, password });
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-grid">
        <div className="auth-aside">
          <div className="aside-card">
            <p className="muted small">Why Chat App</p>
            <h2 className="aside-title">Built for modern conversations</h2>
            <p className="muted">A polished chat experience designed for speed, privacy, and collaboration.</p>
          </div>

          <div className="aside-list">
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
            <p className="muted small">Welcome back</p>
            <h1 className="auth-title">Sign in</h1>
            <p className="muted">Securely access your chats and stay connected.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />

            <button type="submit" className="btn btn-block btn-accent">Sign in</button>
          </form>

          <p className="auth-foot">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="link">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
