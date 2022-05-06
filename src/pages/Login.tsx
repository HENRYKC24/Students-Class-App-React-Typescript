import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import { getAllInformation } from "../redux/getAllInformation";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setName(() => value);
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    getAllInformation(name, dispatch);
  };

  return (
    <div className="App">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          value={name}
          className="input"
          onChange={(e) => onChange(e)}
        />
        <input type="submit" className="submit" value="login"/>
      </form>
    </div>
  );
};
export default Login;
