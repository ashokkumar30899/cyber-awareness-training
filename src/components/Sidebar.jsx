import React from "react";
import { NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const Sidebar = ({ isOpen, roles }) => {
  const isAdmin = roles.includes("Admin");

  const navItems = [
    { name: "Home Dashboard", path: "/", icon: "🏠", roles: ["User", "Admin"] },
    { name: "Training Modules", path: "/modules", icon: "📚", roles: ["User", "Admin"] },
    { name: "My Results", path: "/my-results", icon: "📊", roles: ["User", "Admin"] },
  ];

  const adminItems = [
    { name: "Admin Dashboard", path: "/admin", icon: "🔐", roles: ["Admin"] },
    { name: "Training Logs", path: "/admin/logs", icon: "📋", roles: ["Admin"] },
  ];

  return (
    <aside style={{
      ...styles.sidebar,
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    }}>
      <div style={styles.scrollArea}>
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Main Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              style={({ isActive }) => ({
                ...styles.navLink,
                backgroundColor: isActive ? "var(--accent-color)" : "transparent",
                color: isActive ? "#ffffff" : "var(--text-secondary)",
                boxShadow: isActive ? "0 4px 12px rgba(37, 99, 235, 0.2)" : "none",
              })}
            >
              <span style={styles.icon}>{item.icon}</span>
              <span style={styles.linkText}>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {isAdmin && (
          <div style={styles.section}>
            <p style={styles.sectionTitle}>Administration</p>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                style={({ isActive }) => ({
                  ...styles.navLink,
                  backgroundColor: isActive ? "var(--accent-color)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  boxShadow: isActive ? "0 4px 12px rgba(37, 99, 235, 0.2)" : "none",
                })}
              >
                <span style={styles.icon}>{item.icon}</span>
                <span style={styles.linkText}>{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <p>© 2026 Wissda's Training Portal</p>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "260px",
    background: "var(--sidebar-bg)",
    height: "calc(100vh - 64px)",
    position: "fixed",
    top: "64px",
    left: 0,
    zIndex: 900,
    borderRight: "1px solid var(--border-color)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease",
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 0 24px rgba(0,0,0,0.02)",
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    padding: "32px 16px",
  },
  section: {
    marginBottom: "36px",
  },
  sectionTitle: {
    fontSize: "0.7rem",
    fontWeight: "800",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
    paddingLeft: "12px",
    marginBottom: "16px",
    letterSpacing: "0.1em",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "600",
    marginBottom: "8px",
    transition: "all 0.2s ease",
  },
  icon: {
    marginRight: "16px",
    fontSize: "1.25rem",
    width: "24px",
    textAlign: "center",
  },
  linkText: {
    whiteSpace: "nowrap",
  },
  footer: {
    padding: "24px",
    borderTop: "1px solid var(--border-color)",
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
    textAlign: "center",
    fontWeight: "500",
  },
};

export default Sidebar;
