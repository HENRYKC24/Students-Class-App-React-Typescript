import React from "react";
import { useSelector } from "react-redux";
import "../App.css";
import { State } from "../redux/actionTypes";

const Home: React.FC = () => {
  const state = useSelector((state: State) => state);
  const { reducer } = state;

  console.log("records", reducer);
  
  return <div>Home</div>;
};

export default Home;
