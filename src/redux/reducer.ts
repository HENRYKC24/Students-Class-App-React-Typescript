import { Types, ActionType } from "./actionTypes";

// Define initial
export const initialState: Object = {
  name: '',
  courses: [],
  eachClassStudents: []
};

// Define reducer
export const reducer = (state = initialState, action: ActionType) => {
  const { payload, type } = action;
  const { SET_STUDENT, SET_COURSE, SET_NAME } = Types;

  switch (type) {
    case SET_STUDENT:
      return {
        ...state,
        eachClassStudents: payload,
      };

    case SET_COURSE:
      return {
        ...state,
        courses: payload,
      };

    case SET_NAME:
      return {
        ...state,
        name: payload,
      };

    default:
      return state;
  }
}
