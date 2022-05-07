import { Types } from "../actionTypes";
import { FieldSet } from "airtable";

export const setEachClassStudents = (payload: FieldSet[]) => ({
  type: Types.SET_STUDENT,
  payload,
});

export const logout = () => ({
  type: Types.LOGOUT
});

export const setName = (payload: string) => ({
  type: Types.SET_NAME,
  payload,
});
