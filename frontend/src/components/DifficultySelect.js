import {
    ButtonGroup,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import { useEffect, useState, useCallback, useContext } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { userContext } from '../userContext';

const Difficulty = {
    Easy: "easy",
    Medium: "medium",
    Hard: "hard"
}

var msSocket;
var timer; 

//Can implement a stepper here
function DifficultySelect() { 
    const [difficulty, setDifficulty] = useState();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isMatched, setIsMatched] = useState(false);
    const [partnerUuid, setPartnerUuid] = useState();
    const [roomUuid, setRoomUuid] = useState();

    const user = useContext(userContext);
    console.log(user ? user.uid : null);

    useEffect(() => {{
        msSocket = io('http://localhost:3000');

        msSocket.on("connected", () => {
            console.log("connected to match service!");
            msSocket.emit("register", "testUuid");
        })

        msSocket.on("matchFound", (uuidField, partnerUuid, roomUuid) => {
            clearTimeout(timer);
            setIsMatched(true);
            setPartnerUuid(partnerUuid)
            setRoomUuid(roomUuid)
            msSocket.emit("deregister");
        })

        msSocket.on("deregister_success", () => {
            console.log("deregister_success")
            setIsConnecting(false);
            if (isMatched) {
                routeToPractice();
            }
        })
    
        msSocket.on("deregister_failed", () => {
            msSocket.emit("deregister");
        })
    }});

    //Difficulty hook
    useEffect(() => {
        console.log(difficulty);
        setIsConnecting(true);
        msSocket.emit("getMatch", user ? user.uid : null, difficulty);
    }, [difficulty])

    //Connecting hook
    useEffect(() => {
        console.log("isConnecting: " + isConnecting);
        if (isConnecting) {
            timer = setTimeout(() => {
                setIsConnecting(false);
            }, 30000)
            //Disable the buttons
            //Start loading spinner
        } else {
            //Stop loading spinner
            //Enable the buttons
        }
    },[isConnecting])

    const handleDifficultyButton = useCallback((diff) => {
        setDifficulty(diff);
    }, []);

    let navigate = useNavigate();
    const routeToPractice = () => {
        var path = '/practice';
        navigate(path, {replace: true, state: { uuid: user ? user.uid : null, partnerUuid: partnerUuid, roomUuid: roomUuid, difficulty: difficulty }});
    } 

    return (
        <div>
            <Grid 
            container spacing = {12}
            direction = "column"
            justifyContent = "center"
            alignItems = "center"
            style = {{minHeight:'100vh'}}>
                <Typography variant = "h5" color = "inherit" component = "div" mb={2}>
                    Select the desired question difficulty level:
                </Typography>
                <ButtonGroup 
                variant = "text" 
                aria-label="text button group"
                display="flex">
                    <Button onClick = {() => {
                        handleDifficultyButton(Difficulty.Easy)}}>Easy</Button>
                    <Button onClick = {() => {
                        handleDifficultyButton(Difficulty.Medium)}}>Medium</Button>
                    <Button onClick = {() => {
                        handleDifficultyButton(Difficulty.Hard)}}>Hard</Button>
                </ButtonGroup>
            </Grid>
        </div>)
}

export default DifficultySelect;