import React from "react";
import { useSelector } from "react-redux";
import { Reducer, Initial } from '../redux/actionTypes';
import "../App.css";
// import Details from "../components/Details";
import { State } from "../redux/actionTypes";

const Home: React.FC = () => {
  const state = useSelector((state: State) => state);
  const { reducer } = state;

  console.log("records", reducer);

  const {name, courses, eachClassStudents} = reducer;
  console.log(name, 'name')
  // const name = reducer && reducer.name;
  // const courses = reducer.courses;
  // const eachClassStudents = reducer.eachClassStudents;
  // const name = reducer.name;\
  
  return eachClassStudents[0] ? <div>
  <h1>{name}</h1>
    {eachClassStudents.map((classMembers: string[], index: number) => {
      console.log(classMembers, 'each');
      // const currentClass = eachClassStudents[index];
      console.log(classMembers.indexOf(name), 'index')
      // classMembers.splice(classMembers.indexOf(name), 1);
      // currentClass.splice(currentClass.indexOf(name));
      console.log(classMembers, 'currentClass')
      return (
        <div key={Math.random().toString()}>
          <strong>Name</strong>
          <p>{courses[index]}</p>

          <strong>Students</strong>
          <p>{classMembers}</p>
        </div>
      );
    })}
</div> : <p>Loading...</p>;
};

export default Home;
