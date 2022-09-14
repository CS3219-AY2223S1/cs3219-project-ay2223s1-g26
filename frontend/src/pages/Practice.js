import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

function Practice() {

  var location = useLocation();
  console.log(location.state);

  return (
    <div>
      <h1>Practice Placeholder</h1>
    </div>
  );
}
export default Practice;