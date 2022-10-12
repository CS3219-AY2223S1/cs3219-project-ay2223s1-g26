import React, { useContext, useEffect, useState } from "react";
import { context } from '../context';
import Donut from '../charts/Donut'
import Paper from '@mui/material/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@mui/material/Divider';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '100%',
    minHeight: '300px'
    // backgroundColor: '#e8f4f8',
  },
  spacing: {
    marginTop: 25
  },
  chart: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize:50,
    fontWeight:600,
  },
  name: {
    fontSize:50,
    fontWeight:600,
    color: '#1b76d2',
    margin: 5
  },
  subtitle: {
    fontSize:25,
    fontWeight:450,
    margin: 10
  },
  divider: {
    margin: 5
  }
}));

function Dashboard() {
  const { user, setIsLoading, $axios } = useContext(context)
  const [donutData, setDonutData] = useState([0, 0, 0])
  const classes = useStyles();
  // console.log(user)
  useEffect(() => {
    if (!user) {
      return
    }
    setIsLoading(true)
    getDashboardInfo()
    setIsLoading(false)
  }, [user])
  async function getDashboardInfo() {
    try {
      const response = await $axios.post(`${$axios.defaults.baseURL}/getUser`)
      if (!response) {
        return
      }
      const data = response.data
      prepareDonutData(data)
    } catch (e) {
      console.error(e)
    }
  }

  function prepareDonutData(userInfo) {
    const obj = userInfo.questionDifficulty
    const data = []
    for (const property in obj) {
      data.push(obj[property])
    }
    setDonutData(data)
  }

  return (
    <div>
      {user && <>
          <div className={classes.title}>Welcome</div>
          <div className={classes.name}>{user.displayName}</div>
        </>
      }
      <Grid container spacing={1} className={classes.spacing}>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.paper}>
            <div className={classes.subtitle}>Difficulty</div>
            <Divider className={classes.divider}/>
            { donutData && <Donut data={donutData}/> }
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.paper}>
            <div className={classes.subtitle}>Saved</div>
            <Divider className={classes.divider}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.paper}>
            <div className={classes.subtitle}>Completed</div>
            <Divider className={classes.divider}/>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.spacing}>
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.subtitle}>History</div>
          <Divider className={classes.divider}/>
          <Box sx={{ width: '100%' }}>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton href="/">
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Question 1" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/">
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Question 2" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
}
export default Dashboard;