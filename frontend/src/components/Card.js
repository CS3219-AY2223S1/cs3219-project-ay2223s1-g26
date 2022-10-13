import React from "react";
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default  function Card(props) {
  const data = props.data
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
              ? data.map(tool => {
                return (
                  <ListItem disablePadding>
                    <ListItemButton href="/">
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Question 1" />
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