import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import * as React from 'react';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import {Box} from "@mui/material";

function App() {
  const [user, setUser] = React.useState(0);

  return (
    <div className="App">
      <NavBar/>
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Box>
    </div>
  );
}

export default App;
