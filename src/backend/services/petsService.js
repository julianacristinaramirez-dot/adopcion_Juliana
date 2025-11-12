import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PetsService = {
    async createPet(petData) {
        try {
            const { name, image, species, breed, age, size, gender, description, shelterId } = petData;

            const numericAge = parseInt(age, 10);
            if (isNaN(numericAge)) {
                throw new Error('La edad debe ser un número válido.');
            }
            return await prisma.pets.create({
                data: {
                    name,
                    image,
                    species, 
                    breed,
                    age: numericAge,
                    size,    
                    gender, 
                    description,
                    shelter: {
                        connect: { id: shelterId } // Conecta con un refugio existente por su ID
                    }
                }
            });
        } catch (error) {
            throw new Error(`Error al crear la mascota: ${error.message}`);
        }
    },

    async getPets(filters = {}) {
        try {
            const { name, species, size, age } = filters;
            const where = {};

            if (name) {
                where.name = {
                    contains: name,
                    mode: 'insensitive', 
                };
            }

            if (species && species !== 'Todo') {
                where.species = species; 
            }

            if (size && size !== 'Todo') {
                where.size = size; 
            }

            if (age && age !== 'Todo') {
                where.age = parseInt(age, 10);
            }

            return await prisma.pets.findMany({
                where, 
                include: {
                    shelter: true, 
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } catch (error) {
            throw new Error(`Error al obtener las mascotas: ${error.message}`);
        }
    },
    // async getPetById(id) { ... }
    // async updatePet(id, data) { ... }
    // async deletePet(id) { ... }
};