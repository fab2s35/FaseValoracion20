//Array de metodos (C R U D)
const clientsController = {};
import clientsModel from "../models/clients.js";

// SELECT
clientsController.getClients = async (req, res) => {
    try{
      const clients = await clientsModel.find();
      res.status(200).json(clients)
    } catch(error) {
      console.log("error" + error)
      res.status(500).json({ message: "Internal server error"})
    }   
  };


//Select by ID
clientsController.getClientsById = async (req, res) => {
    const clients = await clientsModel.findById(req.params.id)
    if(!clients){
        return res.status(404).json({ message: "client wasn't found"})
    }
}

// INSERT
clientsController.createClients = async (req, res) => {
    try {
        //Solicitar los datos
        const { name, email, password, phone, age } = req.body;

        if (age < 18 ) {
            return res.status(400).json({ message: "Debe ser mayor a 18 años"})
        }

        //Guardamos en la base de datos
        const newclient = new clientsModel({ name, email, password, phone, age })
        await newclient.save()

        res.status(200).json({message: "client saved"})
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error"})
        
    }
};

// DELETE
clientsController.deleteClients = async (req, res) => {
    try {
        const deletedclients = await clientsModel.findByIdAndDelete(req.params.id);
        if (!deletedclients) {
            return res.status(404).json({ message: "client wasn't found" });
        }
        res.status(200).json({ message: "client deleted" });
        
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error"})
        
    }

};

// UPDATE
clientsController.updateClient = async (req, res) => {
    try {
        const { name, email, password, phone, age  } = req.body;
        await clientsModel.findByIdAndUpdate(
          req.params.id,
          {
              name, 
              email, 
              password, 
              phone, 
              age
          },
          { new: true }
        );
        res.json(200).json({ message: "client updated" });
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error"})
        
    }
};       

export default clientsController;