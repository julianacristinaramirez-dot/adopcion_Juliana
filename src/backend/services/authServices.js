import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';

const prisma = new PrismaClient();

export const authServices = {
  // Registrar usuario
  async registerUser(data) {
    try {
      const { email, name, password } = data;

      // 1️⃣ Encriptar contraseña
      const hashedPassword = await hashPassword(password);

      // 2️⃣ Crear usuario en la base de datos
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      // 3️⃣ Generar token
      const token = generateToken(user.id, user.email);

      // 4️⃣ Enviar usuario sin contraseña
      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        token,
      };

    } catch (error) {
      throw new Error('Error registering user: ' + error.message);
    }
  },
};
