import { loginService } from "../services/authServices.js";

export const loginuserControllers = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await loginService.login(email, password);
            if (user) {
                res.status(200).json({ message: "Login successful", user });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error logging in", error });
        }
    }
};