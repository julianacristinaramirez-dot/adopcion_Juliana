import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-teal-300 to-cyan-300 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-black rounded-t-full flex items-center justify-center">
                                    <span className="text-white text-xl">♥</span>
                                </div>
                                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-black mx-auto"></div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">Huellitas JR</span>
                        </div>

                        {/* Botones de navegación */}
                        <div className="flex gap-4">
                            {token ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-md"
                                >
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Encuentra tu compañero perfecto
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-700 italic font-light leading-relaxed max-w-4xl mx-auto">
                        Conectamos refugios con familias amorosas para encontrar el hogar perfecto
                        para cada perrito que necesita una segunda oportunidad
                    </p>
                </div>

                {/* Botones principales */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
                    <button className="px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                        Ver mascotas
                    </button>
                    <button className="px-8 py-4 bg-white text-gray-800 text-lg font-semibold rounded-lg border-2 border-gray-800 hover:bg-gray-100 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                        Encuentra tu match
                    </button>
                </div>

                {/* Sección de características */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        ¿Porque elegiste Huellitas JR?
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Proceso Seguro */}
                        <div className="bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl p-8 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">PROCESO SEGURO</h3>
                            <p className="text-gray-800 text-sm leading-relaxed">
                                Verificamos todos los refugios y facilitamos un proceso de adopción transparente y seguro
                            </p>
                        </div>

                        {/* Card 2: Sistema de Match */}
                        <div className="bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl p-8 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">SISTEMA DE MATCH</h3>
                            <p className="text-gray-800 text-sm leading-relaxed">
                                Nuestro test de compatibilidad te ayuda a encontrar la mascota perfecta según tu estilo de vida
                            </p>
                        </div>

                        {/* Card 3: Favoritos */}
                        <div className="bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl p-8 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">FAVORITOS</h3>
                            <p className="text-gray-800 text-sm leading-relaxed">
                                Guarda tus mascotas favoritas y mantén un seguimiento de las que más te interesan
                            </p>
                        </div>

                        {/* Card 4: Donaciones */}
                        <div className="bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl p-8 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">DONACIONES</h3>
                            <p className="text-gray-800 text-sm leading-relaxed">
                                Apoya a los refugios con donaciones para el cuidado y bienestar de las mascotas
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-teal-300 to-cyan-300 py-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-black rounded-t-full flex items-center justify-center">
                                    <span className="text-white text-xl">♥</span>
                                </div>
                                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-black mx-auto"></div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">Huellitas JR</span>
                        </div>
                        <p className="text-gray-800 text-center font-medium">
                            Conectando corazones, creando familias. © 2025 Huellitas JR
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;