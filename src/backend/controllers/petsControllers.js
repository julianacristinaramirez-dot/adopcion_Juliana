import { PetsService } from "../services/petsService.js";

export const petsControllers = {
  async getPets(req, res) {
    try {
      const pets = await PetsService.getPets(req.query);

      res.status(200).json({
        success: true,
        data: pets,
      });
    } catch (error) {
      console.error("🔥 Error en getPets:", error); // 👈 muestra el error real en consola
      res.status(500).json({
        success: false,
        message: error.message,
        // puedes comentar la siguiente línea si no quieres ver el stack completo
        stack: error.stack, 
      });
    }
  },

  async createPet(req, res) {
    try {
      const petData = req.body;

      const { name, species, age, shelterId } = petData;
      if (!name || !species || !age || !shelterId) {
        return res.status(400).json({
          success: false,
          message:
            "Los campos name, species, age y shelterId son obligatorios.",
        });
      }

      const newPet = await PetsService.createPet(petData);

      res.status(201).json({
        success: true,
        data: newPet,
        message: "Mascota creada correctamente",
      });
    } catch (error) {
      console.error("🔥 Error en createPet:", error); // 👈 muestra errores al crear mascotas
      res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack,
      });
    }
  },
};
