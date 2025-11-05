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

export default router;
