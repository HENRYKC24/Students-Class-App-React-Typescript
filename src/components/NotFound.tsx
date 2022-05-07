import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state: any = location.state;

  const login = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <p className="not-found">{`"${state.name}"`} not found!</p>
      <div>
        <button onClick={login} className="logout">
          Go To Login Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
