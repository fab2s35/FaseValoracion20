import express from "express";
import appointmentsController from "../controllers/appointmentsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(appointmentsController.getAppointments)
  .post(appointmentsController.createappointment);

router
  .route("/:id")
  .put(appointmentsController.updateAppointment)
  .delete(appointmentsController.delteappointment)
  .get(appointmentsController.getAppointmentsByID);

export default router;
