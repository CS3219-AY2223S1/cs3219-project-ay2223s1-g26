import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import NavBar from './components/NavBar'
import {Box} from "@mui/material";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
            <Route path="/signup" element={<SignupPage/>}/>
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
