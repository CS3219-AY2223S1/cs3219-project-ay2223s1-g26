import React, { useContext } from "react";
import { userContext } from '../userContext';

function Dashboard() {
  const user = useContext(userContext)

  return (
    <div>
      <h1>Welcome {user ? user.displayName : 'User'}!</h1>
    </div>
  );
}
export default Dashboard;