import React, { useContext } from "react";
import { context } from '../context';

function Dashboard() {
  const { user, setIsLoading } = useContext(context)

  return (
    <div>
      <h1>Welcome {user ? user.displayName : 'User'}!</h1>
    </div>
  );
}
export default Dashboard;