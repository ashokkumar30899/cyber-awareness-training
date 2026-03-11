import React from "react";
import { useMsal } from "@azure/msal-react";

const Navbar = ({ onToggleSidebar }) => {
  const { accounts, instance } = useMsal();
  const user = accounts[0];
  const [isDarkMode, setIsDarkMode] = React.useState(
    localStorage.getItem("theme") === "dark"
  );

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.error(e);
    });
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <button onClick={onToggleSidebar} style={styles.menuBtn} aria-label="Toggle Sidebar">
          ☰
        </button>
        <span style={styles.logo}>
          Wissda
        </span>
      </div>
      
      <div style={styles.right}>
        <button onClick={toggleTheme} style={styles.themeBtn} title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <div style={styles.userInfo}>
          <span style={styles.userName}>{user?.name}</span>
          <div style={styles.avatar}>
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    height: "64px",
    background: "var(--bg-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
    borderBottom: "1px solid var(--border-color)",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  menuBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "var(--text-primary)",
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: "900",
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
    fontFamily: "'Outfit', sans-serif",
    display: "flex",
    alignItems: "center",
  },
  redDot: {
    width: "5px",
    height: "5px",
    backgroundColor: "#ef4444",
    borderRadius: "50%",
    position: "absolute",
    top: "-2px",
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  themeBtn: {
    background: "var(--bg-primary)",
    border: "1px solid var(--border-color)",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    boxShadow: "var(--card-shadow)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderRight: "1px solid var(--border-color)",
    paddingRight: "20px",
  },
  userName: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "var(--text-primary)",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.9rem",
    boxShadow: "0 4px 6px rgba(37,99,235,0.2)",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #ef4444",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#ef4444",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default Navbar;
