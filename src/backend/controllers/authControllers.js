import { authServices } from "../services/authServices.js";
import { generateToken } from "../utils/auth.js";

export const authControllers = {
  async register(req, res) {
    try {
      const { email, name, password } = req.body;
      const result = await authServices.registerUser({ email, name, password });
      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async googleCallBack(req, res) {
    try {
      const user = req.user;
      const token = generateToken(user.id, user.email);
      res.redirect(`http://localhost:5173/login-success?token=${token}`);
    } catch (error) {
      res.redirect(`http://localhost:5173/login-error?message=${error.message}`);
    }
  }
};
