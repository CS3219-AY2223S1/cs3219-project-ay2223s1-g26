import React from "react";
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery80Icon from '@mui/icons-material/Battery80';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

export default  function Card(props) {
  const data = props.data
  const iconMapping = {
    'Easy': <Battery30Icon sx={{ color: 'green' }}/>,
    'Medium': <Battery80Icon sx={{ color: 'orange' }}/>,
    'Hard': <BatteryChargingFullIcon sx={{ color: 'red' }}/>
  }
  return (
    <div>
      <Paper elevation={3} sx={{
        p: { xs: 1, },
        textAlign: 'center',
        height: '400px'
      }}>
        <div style={{
          fontSize:25,
          fontWeight:450,
          margin: 10
        }}>
          {props.title}
        </div>
        <Divider style={{
          margin: 5
        }}/>
        <Box sx={{ width: '100%' }}>
          <nav aria-label="main mailbox folders">
            <List>
            {data
              ? data.map(obj => {
                return (
                  <ListItem disablePadding>
                    <ListItemButton href="/">
                      <ListItemAvatar>
                        <Avatar style={{
                          border: '1px solid lightgray'
                        }} sx={{bgcolor: 'white'}}>
                          {iconMapping[obj.questionDifficulty]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={obj.questionTitle} />
                    </ListItemButton>
                  </ListItem>
                )
              })
              : <div>No data</div>
            }
            </List>
          </nav>
        </Box>
      </Paper>
    </div>
  );
}