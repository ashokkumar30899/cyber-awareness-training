import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import "./styles/Login.css";

function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <div className="login-wrapper">
      {/* Dynamic Backgrounds */}
      <div className="login-bg"></div>
      <div className="login-glow"></div>

      {/* Glass Container */}
      <div className="login-card">
        <div className="login-brand">
          <span className="login-shield">🛡️</span>
          <h1 className="login-title">Wissda Training</h1>
          <p className="login-subtitle">
            Secure entry to our organizational <br /> 
            cybersecurity awareness portal.
          </p>
        </div>

        <button className="microsoft-login-btn" onClick={handleLogin}>
          <svg width="22" height="22" viewBox="0 0 23 23">
            <rect x="1" y="1" width="10" height="10" fill="#F25022" />
            <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
            <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
            <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
          </svg>
          <span>Sign in with Microsoft</span>
        </button>

        <footer className="login-footer">
          © {new Date().getFullYear()} Wissda Security. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Login;
