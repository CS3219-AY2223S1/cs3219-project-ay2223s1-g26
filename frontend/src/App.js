import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import {Box} from "@mui/material";
import DifficultySelectPage from "./components/DifficultySelectPage";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/test" element={<DifficultySelectPage/>}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
