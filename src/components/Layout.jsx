import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { accounts } = useMsal();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      // Extract roles from ID token claims
      const idTokenClaims = accounts[0].idTokenClaims;
      const userRoles = idTokenClaims?.roles || [];
      // Fallback for development if no roles are present in Entra yet
      // In production, this should be purely based on Entra
      setRoles(userRoles);
    }
  }, [accounts]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={styles.layout}>
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} roles={roles} />
      
      <main style={{
        ...styles.main,
        marginLeft: isSidebarOpen && window.innerWidth > 1024 ? "260px" : "0",
      }}>
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

const styles = {
  layout: {
    minHeight: "100vh",
    backgroundColor: "var(--bg-primary)",
    transition: "background-color 0.3s ease",
  },
  main: {
    paddingTop: "64px",
    transition: "margin-left 0.3s ease-in-out",
    minHeight: "100vh",
  },
  content: {
    padding: "24px",
    maxWidth: "1600px",
    margin: "0 auto",
  },
};

export default Layout;
