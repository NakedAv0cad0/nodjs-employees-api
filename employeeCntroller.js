import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// grab JSON flie and save function
const jsdata = fs.readFileSync(
  path.join(__dirname, "..", "model", "employees.json")
);
let data = JSON.parse(jsdata);
const saveData = (data) => {
  fs.writeFileSync(path.join(__dirname, "..", "model", "employees.json"), data);
};

// Methods

export const getEmployees = (req, res) => {
  res.json(data.employees);
};

export const postEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  // check for first and last name
  if (!newEmployee.firstname || !newEmployee.lastname)
    res.json({ message: "FirstName and LastName are require" });

  data.employees.push(newEmployee);
  res.json({message: "Employee Added"});
  saveData(JSON.stringify(data));
};

export const putEmployee = (req, res) => {
  let changed = false;
  // check for first and last name
  if (!req.body.firstname || !req.body.lastname) 
    res.json({ message: "FirstName and LastName are require" });

  data.employees.forEach((employee) => {
    // check if there a valid id
    if (req.body.id !== employee.id && req.params.id != employee.id) return;
    changed = true;

    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
  });
  // check if an employee has been changed
  if (!changed)
    res.json({
      message: `Not Found`,
    });

  res.json({message: "Employee Edited"});
  saveData(JSON.stringify(data));
};

export const deleteEmployee = (req, res) => {
  let deleted = false;
  let newId = 1;

  data.employees = data.employees.filter((e, i) => {
    if (req.body.id !== i + 1 && req.params.id != i + 1) {
      e.id = newId++;
      return e;
    }
    deleted = true;
  });
  // check if an employee has been deleted
  if (!deleted)
    res.json({
      message: `Not Found`,
    });

  res.json(data);
  saveData(JSON.stringify(data));
};

export const getEmployee = (req, res) => {
  res.json(data.employees.filter((e) => e.id == req.params.id));
};
