import { verifyToken } from "../utils/auth.js";

export const authenticate = (req, res, next) => {
    try {
        //verificar si tiene token
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Token no proporcionado" 
            });
        
        }
        //verificar si el token es valido
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ 
                success: false, 
                message: "Token invalido" 
            });
        }

        req.user = decoded;
        next();
        

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};