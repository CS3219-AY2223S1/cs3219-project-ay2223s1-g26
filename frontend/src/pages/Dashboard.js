import React, { useContext, useEffect } from "react";
import { context } from '../context';
import Donut from '../charts/Donut'

function Dashboard() {
  const { user, setIsLoading, $axios } = useContext(context)
  useEffect(() => {
    getDashboardInfo()
  }, [user])

  async function getDashboardInfo() {
    // console.log(user)
    if (!user) {
      return
    }
    // setIsLoading(true)
    try {
      const response = await $axios.post(`${$axios.defaults.baseURL}/getUser`)
      if (!response) {
        return
      }
      const data = response.data
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1>Welcome {user ? user.displayName : 'User'}!</h1>
      <Donut/>
    </div>
  );
}
export default Dashboard;