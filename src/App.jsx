import { Routes, Route, Navigate } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from "@azure/msal-react";
import { useEffect, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Module1 from "./pages/Module1";
import Module2 from "./pages/Module2";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./Login";
import Layout from "./components/Layout";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TrainingLog from "./pages/TrainingLog";
import MyResults from "./pages/MyResults";

function App() {
  const { accounts } = useMsal();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      setRoles(accounts[0].idTokenClaims?.roles || []);
    }
  }, [accounts]);

  const isAdmin = roles.includes("Admin");

  return (
    <>
      {/* ✅ AUTHENTICATED USERS */}
      <AuthenticatedTemplate>
        <Layout>
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/modules" element={<Home />} />
            <Route path="/module1" element={<Module1 />} />
            <Route path="/module2" element={<Module2 />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/my-results" element={<MyResults />} />
            
            {/* Admin Routes */}
            {isAdmin ? (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/logs" element={<TrainingLog />} />
              </>
            ) : (
              <Route path="/admin/*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </Layout>
      </AuthenticatedTemplate>

      {/* ❌ UNAUTHENTICATED USERS */}
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
