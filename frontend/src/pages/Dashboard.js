import React, { useContext, useEffect } from "react";
import { context } from '../context';

function Dashboard() {
  const { user, setIsLoading, $axios } = useContext(context)
  useEffect(() => {
    getDashboardInfo()
  }, [user])

  async function getDashboardInfo() {
    console.log(user)
    if (!user) {
      return
    }
    // setIsLoading(true)
    try {
      const response = await $axios.post(`${$axios.defaults.baseURL}/getUser`)
      const data = response.data
      if (!response) {
        // setMessage('An error occurred')
        return
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Welcome {user ? user.displayName : 'User'}!</h1>
    </div>
  );
}
export default Dashboard;