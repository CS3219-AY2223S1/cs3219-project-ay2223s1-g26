import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import * as React from "react";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Box from "@mui/material/Box";
import { context } from "./context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import axios from "axios";
import Loader from "./components/Loader";
import DifficultySelect from "./components/DifficultySelect";
import Practice from "./pages/Practice";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [isLoading, setIsLoading] = React.useState(false);
  const api =
    process.env.NODE_ENV == "development"
      ? "http://localhost:5000/api"
      : "https://us-central1-peerprep-userser.cloudfunctions.net/api";
  const defaultOptions = {
    baseURL: api,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  let $axios = axios.create(defaultOptions);
  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  React.useEffect(() => {
    async function refreshIdToken() {
      if (!user) {
        return;
      }
      setIsLoading(true);
      const idToken = await user.getIdToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;
      console.log("idToken: ", idToken);
      setIsLoading(false);
    }
    refreshIdToken();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error />
          ) : (
            <context.Provider
              value={{
                user,
                $axios,
                isLoading,
                setIsLoading,
                error,
              }}
            >
              <div className="App">
                <NavBar />
                <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                  {user ? (
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/difficultySelect" element={<DifficultySelect />} />
                      <Route path="/practice" element={<Practice />} />
                      <Route
                        path="/"
                        element={<Navigate replace to="/dashboard" />}
                      />
                    </Routes>
                  ) : (
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                      />
                    </Routes>
                  )}
                </Box>
              </div>
            </context.Provider>
          )}
        </>
      )}
    </>
  );
}

export default App;
