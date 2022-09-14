import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import * as React from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";
import { userContext } from "./userContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import axios from "axios";
import backendApi from "./.env.json";

function App() {
  const [user, loading, error] = useAuthState(auth);
  
  return (
    <userContext.Provider value={user}>
      <div className="App">
        <NavBar />
        <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </Box>
      </div>
    </userContext.Provider>
  );
}

export default App;
