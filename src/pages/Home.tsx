import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../App.css";
import { State, StrArr } from "../redux/actionTypes";

const Home: React.FC = () => {
  const state = useSelector((state: State) => state);
  const popRef: React.MutableRefObject<{
    count: number;
    values: string[];
  }> = useRef({ count: 1, values: [""] });
  const { reducer } = state;
  const { name, eachClassStudents } = reducer;

  return eachClassStudents[0] ? (
    <div>
      <h1>{name}</h1>
      {eachClassStudents.map((classMembers: string[], index: number) => {
        console.log(classMembers, "8889999");
        // let one: string | undefined = "";
        if (popRef.current.count < eachClassStudents.length + 1) {
          const i: any = classMembers.pop();
          popRef.current.values.push(i);
          // console.log("One", one);
          popRef.current.count += 1;
        }
        // console.log("One outside if statement", one);
        return (
          <div key={Math.random().toString()}>
            <strong>Name</strong>
            <p>{popRef.current.values[index + 1]}</p>
            <strong>Students</strong>
            <p>{classMembers.toString()}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Home;
