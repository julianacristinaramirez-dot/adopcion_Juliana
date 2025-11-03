import passport from 'passport';
import {prismaClient} from '@prisma/client';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

const prisma = prismaClient();

passport.use(
  new GoogleStrategy({
    clienteID: process.CLIENT_ID,
    clientSecret: process.CLIENT_SECRET,
    callbackURL: "api/auth/google/callback"
    },
    async (profile, done) => {
        try {
            const email = profile.emails[0].value;
            const googleId = profile.id;
            // verificar que el usuario no exista en la base de datos
            let user = await prisma.user.findUnique({
                where: {googleId},
            });
            // Buscamos al usuario por su email en caso de que ya se haya registrado con el metodo tradicional
            if (!user) {
                user = await prisma.user.findUnique({
                    where: {email},
                });
                //si encontramos al usuario lo actualizamos su google
                if(user){
                user = await prisma.user.update({
                    where: {email},
                    data: {googleId: googleId,
                    avatar: profile.photos[0].value,
                    }
                });
                //si no existe ninguna formamos al usuario
            }} else {
                user = await prisma.user.create({
                    data: {
                        email : email,
                        name: profile.displayName,
                        googleId,
                        avatar: profile.photos[0].value,
                    }
                });
            }
            return done(null, user);
        }catch (error) {
            return done(error, null);
        }
    }
  )
);
//funciones para que passport maneje la sesion 
passport.serializeUser((user,done) =>{
    done(null, user.id);
});

passport.deserializeUser(async(id,done) =>{
    try{
        const user = await prisma.user.findUnique({where: id});
        done(null, user);
    
    }catch(error){
        done(error,null);
    }
});
    