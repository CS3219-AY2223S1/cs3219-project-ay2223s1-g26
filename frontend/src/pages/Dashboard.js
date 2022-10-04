<<<<<<< HEAD
import React, { useContext } from "react";
import DifficultySelect from "../components/DifficultySelect";
import { userContext } from '../userContext';
=======
import React, { useContext, useEffect, useState } from "react";
import { context } from '../context';
import Donut from '../charts/Donut'
>>>>>>> origin/feat/auth

function Dashboard() {
  const { user, setIsLoading, $axios } = useContext(context)
  const [donutData, setDonutData] = useState([0, 0, 0])
  console.log(user)
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
      {/* <Typography>Welcome {user ? user.displayName : 'User'}!</Typography> */}
      <DifficultySelect/>
      <h1>Welcome {user ? user.displayName : 'User'}!</h1>
      { donutData && <Donut data={donutData}/> }
    </div>
  );
}
export default Dashboard;