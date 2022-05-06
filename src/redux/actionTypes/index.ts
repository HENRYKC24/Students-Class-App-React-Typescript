export enum Types {
  GET_STUDENT,
  GET_CLASSES
};

export interface ActionType {
  type: Types.GET_CLASSES | Types.GET_STUDENT;
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
