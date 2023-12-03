import { Router } from "express";
const apiRouter = Router();
import {
  getEmployees,
  postEmployee,
  putEmployee,
  deleteEmployee,
  getEmployee,
} from "../../controllers/employeesController.js";

apiRouter
  .route("/")
  .get(getEmployees)
  .post(postEmployee)
  .put(putEmployee)
  .delete(deleteEmployee);

apiRouter
  .route("/:id")
  .get(getEmployee)
  .put(putEmployee)
  .delete(deleteEmployee);

export default apiRouter;
