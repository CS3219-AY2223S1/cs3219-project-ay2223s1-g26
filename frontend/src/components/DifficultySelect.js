import {
    ButtonGroup,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Difficulty = {
    Easy: "easy",
    Medium: "medium",
    Hard: "hard"
}

var msSocket;
var difficulty;

//Can implement a stepper here
function DifficultySelect() { 
    const [isConnected, setIsConnected] = useState();
    useEffect(() => {
        msSocket = io('http://localhost:3000');

        msSocket.on("connected", () => {
            console.log("connected to match service!");
            msSocket.emit("register", "insertUuidHere");
            setIsConnected(true);
            console.log(isConnected);
        })

        msSocket.on("matchFound", (uuidField, partnerUuid, roomUuid) => {
            //connect to collaboration service with the above fields
        })

        msSocket.on("deregister_success", () => {
            console.log("deregister_success");
        })
    
        msSocket.on("deregister_failed", () => {
            msSocket.emit("deregister")
        })

    }, []);

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
                    <Button>Easy</Button>
                    <Button>Medium</Button>
                    <Button>Hard</Button>
                </ButtonGroup>
            </Grid>
        </div>)
}

export default DifficultySelect;