import { Dispatch } from "redux";
import Airtable, { FieldSet } from "airtable";
import { setEachClassStudents, setName } from "../actionCreators";
import { NavigateFunction } from "react-router-dom";

export const getAllInformation = async (
  name: string,
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  const base = new Airtable({ apiKey: process.env.REACT_APP_API_KEY }).base(
    "app8ZbcPx7dkpOnP0"
  );

  const studentsTable = base('Students');
  const classesTable = base('Classes');
  let tempClassMates: FieldSet[] = [];


  const getOneStudent = async () => {
    const records = await studentsTable.select({
      filterByFormula: `OR({Name} ='${name}')`,
    }).firstPage();
    const fields = records.map((record) => record.fields);
    if (!fields[0]) {
      navigate('/not-found', {state:{name}});
      return;
    }
    const Name: any = fields[0].Name;
    const classes: any = fields[0].Classes;
    dispatch(setName(Name));
    getClasses(classes);
  }

  const getStudentsNamesPerClass = async (studentsIDsPerClass: string[], b: string) => {
    let queryString: string = 'OR(';
    for (let i = 0; i < studentsIDsPerClass.length; i += 1) {
      queryString += `RECORD_ID() ="${studentsIDsPerClass[i]}"`;
      if (i < studentsIDsPerClass.length - 1) {
        queryString += ',';
      }
      if (i === studentsIDsPerClass.length - 1) {
        queryString += ')';
      }
    }

    const records = await studentsTable.select({
      filterByFormula: queryString,
    }).firstPage();
    const fields = records.map((record) => record.fields);
    const classNames: any = fields.map((field) => field.Name);
    classNames.push(b);
    tempClassMates = [...tempClassMates, classNames];

    return tempClassMates;
  }

  const getClasses = async (classes: string[]) => {
    let queryString: string = 'OR(';
    for (let i = 0; i < classes.length; i += 1) {
      queryString += `RECORD_ID() ="${classes[i]}"`;
      if (i < classes.length - 1) {
        queryString += ',';
      }
      if (i === classes.length - 1) {
        queryString += ')';
      }
    }

    const records = await classesTable.select({
      filterByFormula: queryString,
    }).firstPage();
    const fields = records.map((record) => record.fields);

    const studentsPerClass: any = fields.map((field) => {
      return {a: field.Students, b: field.Name};
    });
    
    studentsPerClass.forEach(async (studentList: {a: string[], b: string}) => {
      const {a, b} = studentList;
      let toUse = await getStudentsNamesPerClass(a, b);
      if (toUse.length === studentsPerClass.length) {
        dispatch(setEachClassStudents(toUse));
      }
    });
  }
  getOneStudent();
  navigate('/Home');
};
