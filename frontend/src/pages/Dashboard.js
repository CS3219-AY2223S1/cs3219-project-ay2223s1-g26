import React, { useContext, useEffect, useState } from "react";
import { context } from '../context';
import Donut from '../charts/Donut'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import Card from '../components/Card'

export default function Dashboard() {
  const { user, setIsLoading, $axios } = useContext(context)
  const [donutData, setDonutData] = useState([0, 0, 0])
  const [cardData, setCardData] = useState([])
  // console.log(user)
  useEffect(() => {
    if (!user) {
      return;
    }
    setIsLoading(true);
    getDashboardInfo();
    setIsLoading(false);
  }, [user]);
  async function getDashboardInfo() {
    try {
      const response = await $axios.post(`${$axios.defaults.baseURL}/getUser`);
      if (!response) {
        return;
      }
      const data = response.data;
      prepareDonutData(data);
      prepareCardData(data)
    } catch (e) {
      console.error(e);
    }
  }

  function prepareDonutData(userInfo) {
    const obj = userInfo.questionDifficulty;
    const data = [];
    for (const property in obj) {
      data.push(obj[property]);
    }
    setDonutData(data);
  }

  function prepareCardData(userInfo) {
    const obj = userInfo.questionsAttempted;
    const data = [];
    for (const property in obj) {
      data.push(obj[property]);
    }
    setCardData(data)
  }

  return (
    <div>
      {user && <div style={{
          fontSize:50,
          fontWeight:600
        }}>
          Welcome <span style={{color: '#1b76d2'}}>{user.displayName}</span>
        </div>
      }
      <Grid container spacing={1} style={{marginTop: 5}}>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{
            p: { xs: 1, },
            textAlign: 'center',
            height: '400px'
          }}>
            <div style={{
              fontSize:25,
              fontWeight:450,
              margin: 10
            }}>Difficulty</div>
            <Divider style={{
              margin: 5
            }}/>
            { donutData && <Donut data={donutData}/> }
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Card title='Saved code'/>
        </Grid>
        <Grid item xs={4}>
          <Card title='Completed'/>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{marginTop: 25}}>
        <Card title='History' data={cardData}/>
      </Grid>
    </div>
  );
}
