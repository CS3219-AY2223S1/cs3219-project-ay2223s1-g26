import {
    AppBar,
    Toolbar,
    IconButton,
    ButtonGroup,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

//Can implement a stepper here
function DifficultySelectPage() {
    
    return (
        <div>
            <AppBar position = "static">
                <Toolbar variant = "dense">
                    <IconButton edge="start" color = "inherit" aria-label="menu" sx = {{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant = "h6" color = "inherit" component = "div">
                        PeerPrep
                    </Typography>
                </Toolbar>
            </AppBar>
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

export default DifficultySelectPage;