funcion Login (){
    const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-8 bg-white rounded shadow text-center"> 
                <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
                <p className="mb-4 text-orange-500">Usa tu cuenta de Google</p>
                <a className="p-2 rounded bg-blue-500 text-white hover:bg-purple-600" href={GOOGLE_AUTH_URL}>
                    Iniciar sesión con Google
                </a>

            </div>
        </div> 
    )};