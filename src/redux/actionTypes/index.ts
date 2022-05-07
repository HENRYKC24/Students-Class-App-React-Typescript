export enum Types {
  SET_STUDENT,
  SET_NAME,
  LOGOUT
};

export interface ActionType {
  type: Types.SET_STUDENT | Types.SET_NAME | Types.LOGOUT;
  payload?: Object
}

export interface Field {
  Name: string;
  Classes: string[];
};

export interface Record {
  id: string;
  createdTime: string;
  fields: Field[];
}

export interface Reducer {
  name: string;
  eachClassStudents: StrArr[];
}

export interface State {
  reducer: Reducer;
}

export type StrArr = string[];

export interface Initial {
  name: string;
  eachClassStudents: StrArr[];
}
