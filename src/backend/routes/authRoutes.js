import passport from "passport";
import express from 'express';
import { authControllers } from '../controllers/authControllers.js';
console.log("authControllers:", authControllers);

const router = express.Router();

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
 *     summary: Register a new user
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
router.post('/register', authControllers.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Iniciar sesion del usuario
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
 *                example: 2924
 *    responses:
 *      200:
 *        description: Inicio de sesion exitoso
 *      401:
 *        description: Credenciales invalidas
 *      500:
 *        description: Error interno del servidor
 */
router.post("/login", authControllers.login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], 
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login-error",
  }),
  authControllers.googleCallBack
);

export default router;
