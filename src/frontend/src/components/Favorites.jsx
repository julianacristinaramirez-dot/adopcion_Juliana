import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtener usuario
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Obtener favoritos del localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const removeFavorite = (petId) => {
        const updatedFavorites = favorites.filter(pet => pet.id !== petId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-teal-300 to-cyan-300 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-black rounded-t-full flex items-center justify-center">
                                    <span className="text-white text-xl">♥</span>
                                </div>
                                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-black mx-auto"></div>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">Huellitas JR</span>
                        </Link>

                        {/* Botones de navegación */}
                        <div className="flex gap-4 items-center">
                            <Link
                                to="/pets"
                                className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md"
                            >
                                Ver todas las mascotas
                            </Link>
                            <Link
                                to="/match-quiz"
                                className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md"
                            >
                                Encuentra tu Match
                            </Link>
                            {user && (
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {user.name}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Título */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <h1 className="text-5xl font-bold text-gray-900">MIS FAVORITOS</h1>
                    </div>
                    <p className="text-xl text-gray-700 font-medium">
                        Aquí tus mascotas guardadas como favoritos ¡Talvez una de ellas sea tu compañero perfecto!
                    </p>
                </div>

                {/* Grid de favoritos */}
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map(pet => (
                            <div 
                                key={pet.id}
                                className="bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                {/* Imagen de la mascota */}
                                <div className="relative h-64 bg-gray-200">
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300/a8e6cf/000000?text=' + pet.name;
                                        }}
                                    />
                                    {/* Botón de eliminar */}
                                    <button
                                        onClick={() => removeFavorite(pet.id)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all"
                                        title="Eliminar de favoritos"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Información de la mascota */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                                        <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full">
                                            {pet.species}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2 mb-3 text-sm text-gray-700">
                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{pet.shelter}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                        <div>
                                            <span className="font-semibold text-gray-700">Raza:</span>
                                            <p className="text-gray-800">{pet.breed}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-700">Edad:</span>
                                            <p className="text-gray-800">{pet.age}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-700">Tamaño:</span>
                                            <p className="text-gray-800">{pet.size}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-700">Género:</span>
                                            <p className="text-gray-800">{pet.gender}</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        Adoptar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <svg className="w-32 h-32 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">
                            No tienes favoritos aún
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Explora nuestras mascotas y agrega tus favoritas haciendo clic en el corazón
                        </p>
                        <Link
                            to="/pets"
                            className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all shadow-lg"
                        >
                            Ver mascotas disponibles
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;