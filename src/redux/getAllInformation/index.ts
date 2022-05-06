import { Dispatch } from "redux";
import Airtable from "airtable";
import { setCourses, setEachClassStudents, setName } from "../actionCreators";
import { NavigateFunction } from "react-router-dom";

export const getAllInformation = async (name: string, dispatch: Dispatch, navigate: NavigateFunction) => {
  const base = new Airtable({ apiKey: process.env.REACT_APP_API_KEY }).base(
    "app8ZbcPx7dkpOnP0"
  );

  const studentsTable = base('Students');
  const classesTable = base('Classes');
  const tempClassMates: [] = [];


  const getOneStudent = async () => {
    const records = await studentsTable.select({
      filterByFormula: `OR({Name} ='${name}')`,
    }).firstPage();

    const fields = records.map((record) => record.fields);
    if (!fields[0]) return;
    const Name: any = fields[0].Name;
    const classes: any = fields[0].Classes;
    dispatch(setName(Name));
    getClasses(classes);
  }

  const getStudentsNamesPerClass = async (studentsIDsPerClass: string[]) => {
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
    console.log(classNames, '<<<>>>>')
    classNames.push(classNames);
    return classNames;
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
    const classNames: any = fields.map((field) => field.Name);
    const studentsPerClass: any = fields.map((field) => field.Students);
    // const allClasses: any = [];
    dispatch(setCourses(classNames));
    studentsPerClass.forEach(async (studentList: string[]) => {
      await getStudentsNamesPerClass(studentList);
      // allClasses.push(classList);
    });
    console.log(tempClassMates, 'mates')
    dispatch(setEachClassStudents(tempClassMates));
    // console.log("all classes", allClasses)
  }
  getOneStudent();
  navigate('/Home');
};
