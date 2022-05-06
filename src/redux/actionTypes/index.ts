export enum Types {
  SET_STUDENT,
  SET_COURSE,
  SET_NAME
};

export interface ActionType {
  type: Types.SET_COURSE | Types.SET_STUDENT | Types.SET_NAME;
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
  records: Record[];
}

export interface State {
  reducer: Reducer;
}
