import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import * as React from 'react';
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Practice from './pages/Practice'
import NavBar from './components/NavBar'
import Box from '@mui/material/Box';
import { context } from './context';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import axios from "axios";
import backendApi from './.env.json'
import Loader from "./components/Loader";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [ isLoading, setIsLoading ] = React.useState(false)
  React.useEffect(() => {
    setIsLoading(loading)
  }, [loading])
  return (
    <div>
    {isLoading && <Loader/> }
      <context.Provider value={{
        user,
        isLoading,
        setIsLoading
      }}>
        <div className="App">
          <NavBar/>
          { user
            ? <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/practice" element={<Practice/>}/>
                  <Route path="/" element={<Navigate replace to="/dashboard" />} />
                </Routes>
              </Box>
            : <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Routes>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/" element={<Navigate replace to="/login" />} />
                </Routes>
              </Box>
          }
        </div>
      </context.Provider>
    </div>
  );
}

export default App;
