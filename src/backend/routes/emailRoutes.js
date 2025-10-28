import express from "express";
import { registerUser } from "../userControllers/emailuserControllers.js";

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuario y enviar correo
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: juliana@example.com
 *               name:
 *                 type: string
 *                 example: juliana
 *     responses:
 *       200:
 *         description: Email enviado correctamente
 *       500:
 *         description: Error del servicio al enviar email
 */

router.post("/register", registerUser)

export default router;