import { Link } from 'react-router-dom';

function LoginError() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-cyan-200 to-teal-300 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="relative">
                        <div className="w-16 h-16 bg-black rounded-t-full flex items-center justify-center">
                            <span className="text-white text-3xl">♥</span>
                        </div>
                        <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[16px] border-t-black mx-auto"></div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800">Huellitas JR</h1>
                </div>

                {/* Error Box */}
                <div className="bg-white/95 rounded-2xl shadow-2xl p-8 text-center">
                    {/* Icon de error */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <svg 
                                className="w-12 h-12 text-red-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Error de Autenticación
                    </h2>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Hubo un problema al intentar iniciar sesión con Google. 
                        Por favor, inténtalo de nuevo.
                    </p>

                    {/* Botón para volver al login */}
                    <Link
                        to="/login"
                        className="inline-block w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Volver al inicio de sesión
                    </Link>

                    {/* Link alternativo */}
                    <div className="mt-6">
                        <Link
                            to="/"
                            className="text-sm text-teal-600 hover:text-teal-700 hover:underline transition-colors"
                        >
                            Ir a la página principal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginError;