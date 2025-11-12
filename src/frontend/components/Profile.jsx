import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-teal-300 to-cyan-300 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-black rounded-t-full flex items-center justify-center">
                                    <span className="text-white text-xl">♥</span>
                                </div>
                                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-black mx-auto"></div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">Huellitas JR</span>
                        </Link>

                        <button className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-md">
                            Adoptar
                        </button>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header con avatar */}
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl shadow-2xl p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">¡BIENVENIDO DE VUELTA!</h1>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-md">
                            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-lg text-gray-700 text-center">
                        Aquí puedes gestionar tus adopciones
                    </p>

                    <button
                        onClick={handleLogout}
                        className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transition-all transform hover:scale-105 shadow-md mx-auto"
                    >
                        Cerrar Sesión
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>

                {/* Tarjetas de gestión */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mis Favoritos */}
                    <Link to="/favorites">
                        <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                                Mis Favoritos
                            </h3>
                            <p className="text-gray-600 text-center">
                                Seguimiento de tus elegidos como favoritos
                            </p>
                        </div>
                    </Link>

                    {/* Mis Adopciones */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                            Mis Adopciones
                        </h3>
                        <p className="text-gray-600 text-center">
                            Seguimiento de solicitudes de adopciones
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-white rounded-t-full flex items-center justify-center">
                                <span className="text-black text-2xl">♥</span>
                            </div>
                            <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[12px] border-t-white mx-auto"></div>
                        </div>
                        <span className="text-2xl font-bold text-white">Huellitas JR</span>
                    </div>
                    <p className="text-gray-300 font-medium">
                        Conectando corazones, creando familias. © 2025 Huellitas JR
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;