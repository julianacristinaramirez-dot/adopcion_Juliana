import { verifyToken } from "../utils/auth.js";

export const authenticate = (req, res, next) => {
    try {
        //verificar si el token es valido
        const authHeader = req.headers.authorization?.split(" ")[1];
        const decoded = verifyToken(authHeader);
        if (!decoded) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};