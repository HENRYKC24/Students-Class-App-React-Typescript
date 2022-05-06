import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchStudent } from './redux/actionCreators';
import { State } from './redux/actionTypes';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const { reducer: {records} } = state;
  console.log('records', records);
  
  useEffect(() => {
    console.log(fetchStudent(dispatch));
  }, [dispatch]);
  return (
    <div className="App">
      App
    </div>
  );
}

export default App;
