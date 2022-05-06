import { Types } from '../actionTypes';
import { Dispatch } from 'redux';

export const getStudent = (payload: string) => ({
  type: Types.GET_STUDENT,
  payload
});

export const getClasses = (payload: string) => ({
  type: Types.GET_CLASSES,
  payload
});

export const fetchStudent = async (dispatch: Dispatch) => {
  const url = "https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students";
  const result = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer keysXPlo2Ngwaq5ZZ'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const data = await result.json();
  console.log(data, 'data')
  dispatch(getStudent(data));
};
