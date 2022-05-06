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
  // const name = reducer.name;
  
  return eachClassStudents[0] ? <div>
  <h1>{name}</h1>
    {courses.map((course: string, index: number) => {
      console.log(eachClassStudents, 'each');
      const currentClass = eachClassStudents[index];
      // currentClass.splice(currentClass.indexOf(name));
      console.log(currentClass, 'currentClass')
      return (
        <div key={Math.random().toString()}>
          <strong>Name</strong>
          <p>{course}</p>

          <strong>Students</strong>
          <strong>{eachClassStudents[index].toString()}</strong>
        </div>
      );
    })}
</div> : <p>Loading...</p>;
};

export default Home;
