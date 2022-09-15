import React, { useContext } from "react";
import DifficultySelect from "../components/DifficultySelect";
import { userContext } from '../userContext';

function Dashboard() {
  const user = useContext(userContext)

  return (
    <div>
      {/* <Typography>Welcome {user ? user.displayName : 'User'}!</Typography> */}
      <DifficultySelect/>
    </div>
  );
}
export default Dashboard;