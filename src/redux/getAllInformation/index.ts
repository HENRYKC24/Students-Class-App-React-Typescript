import { Dispatch } from "redux";
import Airtable, { FieldSet } from "airtable";
import { setCourses, setEachClassStudents, setName } from "../actionCreators";
import { NavigateFunction } from "react-router-dom";

export const getAllInformation = async (name: string, dispatch: Dispatch, navigate: NavigateFunction) => {
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
    if (classNames.includes(name)) {
      classNames.splice(classNames.indexOf(name), 1);
    }
    tempClassMates = [...tempClassMates, classNames];
    
    console.log(tempClassMates, '<<<>>>>')
    // classNames.push(classNames);
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
    const classNames: any = fields.map((field) => field.Name);
    const studentsPerClass: any = fields.map((field) => field.Students);
    // const allClasses: any = [];
    dispatch(setCourses(classNames));
    studentsPerClass.forEach(async (studentList: string[]) => {
      const toUse = await getStudentsNamesPerClass(studentList);
      // allClasses.push(classList);
      console.log(toUse, 'toUse')
      if (toUse.length === studentsPerClass.length) {

        dispatch(setEachClassStudents(toUse));
      }
      tempClassMates = toUse;
    });
    console.log(tempClassMates, 'mates')
    // console.log("all classes", allClasses)
  }
  getOneStudent();
  console.log(tempClassMates, '((()))))')
  navigate('/Home');
};
