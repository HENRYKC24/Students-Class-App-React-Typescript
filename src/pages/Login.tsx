import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../App.css";
import { getAllInformation } from "../redux/getAllInformation";
import { logout } from "../redux/actionCreators";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setName(() => value);
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const nameArray = name.trim().toLowerCase().split(' ');
    const capitalized = nameArray.map((each) => each[0].toUpperCase() + each.slice(1));
    const adulteratedName = capitalized.join(' ');
    getAllInformation(adulteratedName, dispatch, navigate);
  };

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="App">
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-controls">
          <label className="label" htmlFor="input">
            Student's Name
          </label>
          <input
            id="input"
            type="text"
            value={name}
            className="input"
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="submit" value="login" />
      </form>
    </div>
  );
};
export default Login;
