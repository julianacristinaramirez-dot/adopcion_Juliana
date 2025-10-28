import { prismaClient } from '../prisma/client';
import { hashPassword, comparePassword ,generateToken } from '../utils/auth.js';

const prisma = new prismaClient();

export const authServices = {
    // Registrar usuario
    async registerUser(data) {
        try {
            const { email, name, password } = data;
            const hashedPassword = await hashPassword(password);
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                }
            });
            return user;

          // Enviar token     
          const token = generateToken(user.id, user.email);

          // Enviar usuario sin password 
          const { password: _, ...userWithoutPassword } = user;
          return{
              user: userWithoutPassword,
               token 
        };  

        } catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }
    }
};
