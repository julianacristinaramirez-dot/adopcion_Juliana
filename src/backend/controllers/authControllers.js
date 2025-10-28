import { loginService } from "../services/authServices.js";

export const loginControllers = {
    //Registro
    async register(req, res) {
        try {
            const {email, name, password} = req.body;
            const result = authServices.registerUser({email, name, password});
            
            res.status(201).json({
                success: true,
                data: result,
                message: "Usuario registrado correctamente"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};