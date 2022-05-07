import { Types, ActionType } from "./actionTypes";

// Define initial
export const initialState: Object = {
  name: '',
  eachClassStudents: []
};

// Define reducer
export const reducer = (state = initialState, action: ActionType) => {
  const { payload, type } = action;
  const { SET_STUDENT, SET_NAME, LOGOUT } = Types;

  switch (type) {
    case SET_STUDENT:
      return {
        ...state,
        eachClassStudents: payload,
      };

    case LOGOUT:
      return initialState;

    case SET_NAME:
      return {
        ...state,
        name: payload,
      };

    default:
      return state;
  }
}
