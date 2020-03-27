import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>PIZZA</h1>
      <h2>Build your own pizza and choose your toppings</h2>
      <img
        src="C:\Users\natal\Documents\Assignments\Sprint-Challenge-Lambda-Eats-starter\imagePizza\Pizza-2.jpg"
        alt="pizzapic"
      />
      <h3>Click here to build your pizza! 👇</h3>
      <Link className="flexin" to={"/pizza"}>
        <div className="order-here">PIZZA TIME!</div>
      </Link>
    </div>
  );
};

export default Home;
