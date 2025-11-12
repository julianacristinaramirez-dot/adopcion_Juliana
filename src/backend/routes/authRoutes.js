import passport from "passport";
import express from "express";
import { authControllers } from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authMiddlewares.js"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

console.log("authControllers:", authControllers);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: julianaramirezmoreano@gmail.com
 *               name:
 *                 type: string
 *                 example: Juliana Ramirez
 *               password:
 *                 type: string
 *                 example: gatito29
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", authControllers.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Iniciar sesión del usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: julianaramirezmoreano@gmail.com
 *              password:
 *                type: string
 *                example: gatito29
 *    responses:
 *      200:
 *        description: Inicio de sesión exitoso
 *      401:
 *        description: Credenciales inválidas
 *      500:
 *        description: Error interno del servidor
 */
router.post("/login", authControllers.login);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Redirige al inicio de sesión con Google
 *     tags: [Auth]
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Callback de autenticación con Google
 *     tags: [Auth]
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login-error",
  }),
  authControllers.googleCallBack
);

/**
 * ✅ Ruta protegida: obtener datos del usuario autenticado
 * Requiere token JWT en los headers: Authorization: Bearer <token>
 */
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, avatar: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Usuario autenticado correctamente",
      user,
    });
  } catch (error) {
    console.error("Error en /me:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
    });
  }
});

export default router;
