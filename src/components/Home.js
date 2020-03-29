import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>PIZZA</h1>
      <h2>Build your own pizza!</h2>
      <Link className="flexin" to={"/pizza"}>
        <button> Click here!</button>
      </Link>
    </div>
  );
};

export default Home;
