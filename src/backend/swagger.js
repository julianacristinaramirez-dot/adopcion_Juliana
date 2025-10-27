import swaggerJsdoc from "swagger-jsdoc";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
        title: "Mi API -Proyecto PIAD-301",
        version: "1.0.0", 
        description:'DOCUMENTACION DE API REST CON EXPRESS, PRISMA Y POSTGRESQL',
        contact:{
            email:"julianaramirezmoreano@gmail.com"
        }

        },
    servers: [{
        url: "http://localhost:3000",
        description:"Servidor de desarrollo"
        
        }],
  },
  apis: ["./routes/*.js"],
};
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
