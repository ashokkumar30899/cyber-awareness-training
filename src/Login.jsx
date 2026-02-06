import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <div
        style={{
          backgroundColor: "#d8d2d2",
          width: "420px",
          padding: "40px",
          borderRadius: "14px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            marginBottom: "8px",
            fontSize: "24px",
            fontWeight: "600",
            color: "#1f2937"
          }}
        >
          Employee Training Portal
        </h1>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "12px",
            fontSize: "15px",
            fontWeight: "500",
            backgroundColor: "#000000",
            border: "1px solid #000000",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#3d5abb";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#070505";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 23 23">
            <rect x="1" y="1" width="10" height="10" fill="#F25022" />
            <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
            <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
            <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
          </svg>
          Sign in with Microsoft
        </button>

        <p
          style={{
            marginTop: "30px",
            fontSize: "12px",
            color: "#9ca3af"
          }}
        >
          © {new Date().getFullYear()} Wissda. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
