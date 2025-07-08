//Array de metodos (C R U D)
const appointmentsController = {};
import appointmentsModel from "../models/appointment.js";

// SELECT
appointmentsController.getAppointments = async (req, res) => {
    try{
      const appointments = await appointmentsModel.find().populate("idClient");
      res.status(200).json(appointments)
    } catch(error) {
      console.log("error" + error)
      res.status(500).json({ message: "Internal server error"})
    }   
  };


//Select by ID
appointmentsController.getAppointmentsByID = async (req, res) => {
    const appointments = await appointmentsModel.findById(req.params.id)
    if(!appointments){
        return res.status(404).json({ message: "the appointments weren't found"})
    }
}

// INSERT
appointmentsController.createappointment = async (req, res) => {
    try {
        //Solicitar los datos
        const { idClient, vehicle, service, status } = req.body;
        //Guardamos en la base de datos
        const newappointment = new appointmentsModel({ idClient, vehicle, service, status })
        await newappointment.save()

        res.status(200).json({message: "appointment saved"})
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error"})
        
    }
};

// DELETE
appointmentsController.delteappointment = async (req, res) => {
    try {
        const deltedappointments = await appointmentsModel.findByIdAndDelete(req.params.id);
        if (!deltedappointments) {
            return res.status(404).json({ message: "the appointment wasn't found" });
        }
        res.status(200).json({ message: "appointments deleted" });
        
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error"})
        
    }

};

// UPDATE
appointmentsController.updateAppointment = async (req, res) => {
    try {
        const { idClient, vehicle, service, status  } = req.body;
        await appointmentsModel.findByIdAndUpdate(
          req.params.id,
          {
            idClient, 
            vehicle, 
            service, 
            status
          },
          { new: true }
        );
        res.json(200).json({ message: "appointment updated" });
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error"})
        
    }
};       

export default appointmentsController;