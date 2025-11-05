import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import session from "express-session"; // ✅ nombre correcto
import userRoutes from './routes/userRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import authRouters from './routes/authRouters.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({ extended: true }));

// ✅ Corrección aquí:
app.use(
  session({
    secret: process.env.SESSION_SECRET, // ✅ Usa una variable simple
    resave: false,
    saveUninitialized: false, // corregido: antes estaba mal escrito
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({
    message: 'API corriendo correctamente 🚀',
  });
});

// ✅ Rutas
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRouters);

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT} 🚀`);
});
