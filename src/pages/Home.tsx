import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { State } from "../redux/actionTypes";
import { logout } from "../redux/actionCreators";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: State) => state);
  const popRef: React.MutableRefObject<{
    count: number;
    values: string[];
  }> = useRef({ count: 1, values: [""] });
  const { reducer } = state;
  const { name, eachClassStudents } = reducer;

  const signOut = () => {
    navigate("/");
    dispatch(logout());
  };

  return eachClassStudents[0] ? (
    <div className="container">
      <div className="logout">
        <button onClick={() => signOut()}>Logout</button>
      </div>
      <h2 className="students-name">{name}'s Classes</h2>
      <div className="cards-container">
        {eachClassStudents.map((classMembers: string[], index: number) => {
          if (popRef.current.count < eachClassStudents.length + 1) {
            const i: any = classMembers.pop();
            popRef.current.values.push(i);
            popRef.current.count += 1;
          }
          return (
            <div className="card" key={Math.random().toString()}>
              <strong className="class-name">Name</strong>
              <p className="class">{popRef.current.values[index + 1]}</p>
              <strong className="student">Students</strong>
              <p className="stundents-classmates">{classMembers.join(", ")}</p>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <p className="loading">Loading...</p>
  );
};

export default Home;
