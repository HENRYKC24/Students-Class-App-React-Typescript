import { Types, ActionType } from "./actionTypes";

export const initialState: Object = {};

// Define reducer
export const reducer = (state = initialState, action: ActionType) => {
  const { payload, type } = action;
  const { GET_STUDENT, GET_CLASSES } = Types;

  switch (type) {
    case GET_STUDENT:
      return payload;

    case GET_CLASSES:
      return payload;

    default:
      return state;
  }
}
