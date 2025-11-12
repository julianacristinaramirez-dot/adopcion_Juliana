import express from "express";
import { petsControllers } from "../controllers/petsControllers.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Shelter:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del refugio.
 *           example: 1
 *         name:
 *           type: string
 *           description: El nombre del refugio.
 *           example: "Refugio San Francisco"
 *         location:
 *           type: string
 *           description: La ciudad o ubicación del refugio.
 *           example: "Barcelona"
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la mascota.
 *           example: 1
 *         name:
 *           type: string
 *           description: El nombre de la mascota.
 *           example: "Loki"
 *         image:
 *           type: string
 *           description: La URL de la imagen de la mascota.
 *           example: "/imagenes/Loki.jpg"
 *         species:
 *           type: string
 *           description: La especie de la mascota.
 *           enum: [PERRO, GATO, OTRO]
 *           example: "PERRO"
 *         breed:
 *           type: string
 *           description: La raza de la mascota.
 *           example: "Pastor Alemán"
 *         age:
 *           type: integer
 *           description: La edad de la mascota en años.
 *           example: 4
 *         size:
 *           type: string
 *           description: El tamaño de la mascota.
 *           enum: [PEQUEÑO, MEDIANO, GRANDE]
 *           example: "GRANDE"
 *         gender:
 *           type: string
 *           description: El género de la mascota.
 *           enum: [MACHO, HEMBRA]
 *           example: "MACHO"
 *         description:
 *           type: string
 *           description: Una breve descripción de la mascota.
 *           example: "Loki es un perro leal y protector, ideal para familias activas."
 *         shelter:
 *           $ref: '#/components/schemas/Shelter'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La fecha de creación del registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La fecha de la última actualización.
 *     NewPet:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - age
 *         - shelterId
 *       properties:
 *         name:
 *           type: string
 *           example: "Mimi"
 *         image:
 *           type: string
 *           example: "/imagenes/Mimi.jpg"
 *         species:
 *           type: string
 *           enum: [PERRO, GATO, OTRO]
 *           example: "GATO"
 *         breed:
 *           type: string
 *           example: "Siamés"
 *         age:
 *           type: integer
 *           example: 1
 *         size:
 *           type: string
 *           enum: [PEQUEÑO, MEDIANO, GRANDE]
 *           example: "PEQUEÑO"
 *         gender:
 *           type: string
 *           enum: [MACHO, HEMBRA]
 *           example: "HEMBRA"
 *         description:
 *           type: string
 *           example: "Mimi es una gata cariñosa que disfruta de un hogar tranquilo."
 *         shelterId:
 *           type: integer
 *           description: El ID del refugio al que pertenece la mascota.
 *           example: 2
 */

/**
 * @swagger
 * /api/pets:
 *  get:
 *     summary: Obtener todas las mascotas con opción de filtros
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nombre de la mascota (búsqueda parcial).
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *           enum: [PERRO, GATO]
 *         description: Filtrar por especie.
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *           enum: [PEQUEÑO, MEDIANO, GRANDE]
 *         description: Filtrar por tamaño.
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Filtrar por edad exacta.
 *     responses:
 *        200:
 *          description: Lista de mascotas obtenida correctamente.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Pet'
 *        500:
 *          description: Error del servidor.
 */
router.get('/', petsControllers.getPets);

/**
 * @swagger
 * /api/pets:
 *  post:
 *    summary: Crear una nueva mascota
 *    tags: [Pets]
 *    requestBody: 
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/NewPet'
 *    responses:
 *      201:
 *        description: Mascota creada correctamente.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Pet'
 *      400:
 *        description: Datos de entrada inválidos.
 *      500:
 *        description: Error del servidor.
 */
router.post('/', petsControllers.createPet);


export default router;