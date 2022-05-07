import { Dispatch } from "redux";
import Airtable, { FieldSet } from "airtable";
import { setCourses, setEachClassStudents, setName } from "../actionCreators";
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
    console.log("First Records", records)
    const fields = records.map((record) => record.fields);
    if (!fields[0]) return;
    const Name: any = fields[0].Name;
    const classes: any = fields[0].Classes;
    console.log(classes, 'classes to be passed to getClasses')
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
    console.log("Second Records", records)
    const fields = records.map((record) => record.fields);
    const classNames: any = fields.map((field) => field.Name);
    const studentsPerClass: any = fields.map((field) => {
      console.log('****', field.Students, field.Name);
      return {a: field.Students, b: field.Name};
    });
    dispatch(setCourses(classNames));
    studentsPerClass.forEach(async (studentList: {a: string[], b: string}) => {
      // const className = studentList.pop();
      console.log(studentList, '$$$$$$$$$$$');
      const {a, b} = studentList;
      
      let toUse = await getStudentsNamesPerClass(a, b);
      // toUse = [...toUse];
      console.log('toUse^^^^^^^^^^^^^^', toUse)

      if (toUse.length === studentsPerClass.length) {
        // tempClassMates = toUse;
        console.log("ToUse", toUse);
        // const toPass = [...toUse, ]
        dispatch(setEachClassStudents(toUse));
      }
      
    });
  }
  getOneStudent();
  navigate('/Home');
};
