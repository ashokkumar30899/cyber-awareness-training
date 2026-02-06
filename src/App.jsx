import { Routes, Route } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import Home from "./pages/Home";
import Module1 from "./pages/Module1";
import Module2 from "./pages/Module2";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./Login";

function App() {
  return (
    <>
      {/* ✅ AUTHENTICATED USERS */}
      <AuthenticatedTemplate>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module1" element={<Module1 />} />
          <Route path="/module2" element={<Module2 />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </AuthenticatedTemplate>

      {/* ❌ UNAUTHENTICATED USERS */}
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
