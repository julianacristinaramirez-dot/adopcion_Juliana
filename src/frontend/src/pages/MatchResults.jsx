import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MatchResults() {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndCalculateMatches = async () => {
            try {
                // Obtener respuestas del test
                const answersStr = localStorage.getItem('matchAnswers');
                
                if (!answersStr) {
                    navigate('/match-quiz');
                    return;
                }

                const answers = JSON.parse(answersStr);
                
                // Obtener todas las mascotas desde la API
                const response = await fetch('http://localhost:3000/api/pets');
                
                if (!response.ok) {
                    throw new Error('No se pudieron obtener las mascotas');
                }

                const data = await response.json();
                
                if (!data.success || !Array.isArray(data.data)) {
                    throw new Error('Formato de respuesta inválido');
                }

                // Calcular compatibilidad
                const calculatedMatches = calculateMatches(answers, data.data);
                
                // Simular delay para mostrar animación de carga
                setTimeout(() => {
                    setMatches(calculatedMatches);
                    setLoading(false);
                }, 1500);

            } catch (err) {
                console.error('Error al obtener matches:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAndCalculateMatches();
    }, [navigate]);

    // Función mejorada para calcular compatibilidad basada en respuestas
    const calculateMatches = (answers, allPets) => {
        // Mapear las respuestas del test a características de las mascotas
        const userPreferences = {
            vivienda: answers[1], // apartamento, casa_jardin, casa_patio, finca
            ejercicio: answers[2], // menos_30, 30_60, 1_2_horas, mas_2
            experiencia: answers[3], // ninguna, algo, bastante, mucha
            tipo: answers[4], // perro, gato, ambos
            ninos: answers[5] // no, pequenos, mayores, adolescentes
        };

        // Calcular compatibilidad para cada mascota
        const scoredPets = allPets.map(pet => {
            let score = 0;
            let maxScore = 100;

            // 1. Compatibilidad por tipo de mascota (30 puntos)
            if (userPreferences.tipo === 'ambos') {
                score += 30; // Le gustan ambos
            } else if (userPreferences.tipo === 'perro' && pet.species === 'PERRO') {
                score += 30;
            } else if (userPreferences.tipo === 'gato' && pet.species === 'GATO') {
                score += 30;
            } else {
                score += 5; // Penalización si no coincide
            }

            // 2. Compatibilidad por tamaño y vivienda (25 puntos)
            const viviendaScore = getViviendaScore(userPreferences.vivienda, pet.size);
            score += viviendaScore;

            // 3. Compatibilidad por edad y experiencia (20 puntos)
            const experienciaScore = getExperienciaScore(userPreferences.experiencia, pet.age);
            score += experienciaScore;

            // 4. Compatibilidad por ejercicio y especie (15 puntos)
            const ejercicioScore = getEjercicioScore(userPreferences.ejercicio, pet.species, pet.size);
            score += ejercicioScore;

            // 5. Compatibilidad con niños (10 puntos)
            const ninosScore = getNinosScore(userPreferences.ninos, pet.age, pet.species);
            score += ninosScore;

            const compatibility = Math.round((score / maxScore) * 100);
            
            return {
                ...pet,
                compatibility: Math.min(compatibility, 98) // Máximo 98%
            };
        });

        // Ordenar por compatibilidad y tomar top 3
        return scoredPets
            .sort((a, b) => b.compatibility - a.compatibility)
            .slice(0, 3);
    };

    // Funciones auxiliares para calcular scores específicos
    const getViviendaScore = (vivienda, size) => {
        const sizeUpper = size?.toUpperCase();
        
        if (vivienda === 'finca') return 25; // Cualquier tamaño está bien en finca
        if (vivienda === 'casa_jardin') {
            if (sizeUpper === 'GRANDE') return 25;
            if (sizeUpper === 'MEDIANO') return 23;
            return 20;
        }
        if (vivienda === 'casa_patio') {
            if (sizeUpper === 'MEDIANO') return 25;
            if (sizeUpper === 'PEQUEÑO') return 23;
            if (sizeUpper === 'GRANDE') return 15;
        }
        if (vivienda === 'apartamento') {
            if (sizeUpper === 'PEQUEÑO') return 25;
            if (sizeUpper === 'MEDIANO') return 15;
            return 10;
        }
        return 10;
    };

    const getExperienciaScore = (experiencia, age) => {
        if (experiencia === 'mucha') return 20; // Puede manejar cualquier edad
        if (experiencia === 'bastante') {
            return age <= 5 ? 20 : 18;
        }
        if (experiencia === 'algo') {
            return age >= 2 && age <= 7 ? 20 : 15;
        }
        // ninguna experiencia
        return age >= 3 && age <= 6 ? 20 : 12;
    };

    const getEjercicioScore = (ejercicio, species, size) => {
        const sizeUpper = size?.toUpperCase();
        
        if (species === 'GATO') {
            return ejercicio === 'menos_30' || ejercicio === '30_60' ? 15 : 12;
        }
        
        // Para perros
        if (ejercicio === 'mas_2') {
            return sizeUpper === 'GRANDE' ? 15 : 12;
        }
        if (ejercicio === '1_2_horas') {
            return sizeUpper === 'MEDIANO' || sizeUpper === 'GRANDE' ? 15 : 13;
        }
        if (ejercicio === '30_60') {
            return sizeUpper === 'PEQUEÑO' || sizeUpper === 'MEDIANO' ? 15 : 12;
        }
        // menos_30
        return sizeUpper === 'PEQUEÑO' ? 15 : 10;
    };

    const getNinosScore = (ninos, age, species) => {
        if (ninos === 'no') return 10; // Cualquier mascota está bien
        
        // Con niños pequeños, preferir mascotas adultas (3+ años)
        if (ninos === 'pequenos') {
            return age >= 3 ? 10 : 6;
        }
        
        // Con niños mayores, más flexible
        if (ninos === 'mayores') {
            return age >= 2 ? 10 : 8;
        }
        
        // Adolescentes
        return 10;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 border-8 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-6 mx-auto"></div>
                    <p className="text-2xl font-bold text-gray-800">Calculando tus matches perfectos...</p>
                    <p className="text-gray-600 mt-2">Analizando compatibilidad con {matches.length > 0 ? 'todas' : 'las'} mascotas disponibles</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error al cargar matches</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <div className="flex gap-4">
                            <Link
                                to="/match-quiz"
                                className="flex-1 bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-all"
                            >
                                Reintentar test
                            </Link>
                            <Link
                                to="/pets-list"
                                className="flex-1 bg-white border-2 border-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all"
                            >
                                Ver todas
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <p className="text-6xl mb-4">🐾</p>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">No hay mascotas disponibles</h2>
                        <p className="text-gray-600 mb-6">No pudimos encontrar mascotas en este momento. Por favor, intenta más tarde.</p>
                        <Link
                            to="/"
                            className="inline-block bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-all"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100">
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

                        <Link
                            to="/pets-list"
                            className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-800 transform hover:scale-105 transition-all duration-200 shadow-md"
                        >
                            Ver todas las mascotas
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Título principal con animación */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-block mb-4">
                        <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <h1 className="text-4xl font-black">¡Tus Matches Perfectos!</h1>
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
                        Basado en tus respuestas, estas son las mascotas más compatibles contigo:
                    </p>
                </div>

                {/* Grid de matches */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {matches.map((pet, index) => (
                        <div
                            key={pet.id}
                            className="relative transform hover:scale-105 transition-all duration-300 animate-slide-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Badge de posición */}
                            {index === 0 && (
                                <div className="absolute -top-4 -right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl transform rotate-12 animate-bounce">
                                    <span className="text-2xl font-black">👑</span>
                                </div>
                            )}

                            <div className="bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl overflow-hidden shadow-2xl h-full">
                                {/* Imagen con badge de compatibilidad */}
                                <div className="relative h-64 bg-gray-200">
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300/a8e6cf/000000?text=' + pet.name;
                                        }}
                                    />
                                    {/* Badge de compatibilidad */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-br from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full shadow-xl font-black text-xl animate-pulse">
                                        {pet.compatibility}%
                                    </div>
                                </div>

                                {/* Información */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-3xl font-black text-gray-800">{pet.name}</h3>
                                        <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full capitalize">
                                            {pet.species.toLowerCase()}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2 mb-4 text-sm text-gray-700">
                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="font-medium">{pet.shelter?.name || 'Refugio'}, {pet.shelter?.location || 'Ubicación'}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                        <div>
                                            <span className="font-bold text-gray-700">Raza:</span>
                                            <p className="text-gray-800">{pet.breed || 'Mestizo'}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700">Edad:</span>
                                            <p className="text-gray-800">{pet.age} {pet.age === 1 ? 'año' : 'años'}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700">Tamaño:</span>
                                            <p className="text-gray-800 capitalize">{pet.size?.toLowerCase() || 'Mediano'}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700">Género:</span>
                                            <p className="text-gray-800 capitalize">{pet.gender?.toLowerCase() || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {pet.description && (
                                        <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                                            {pet.description}
                                        </p>
                                    )}

                                    <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg">
                                        Adoptar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
                    <Link
                        to="/match-quiz"
                        className="flex-1 bg-white text-gray-800 font-semibold py-4 px-6 rounded-xl hover:bg-gray-100 border-2 border-gray-300 transition-all transform hover:scale-105 shadow-lg text-center"
                    >
                        🔄 Hacer el test de nuevo
                    </Link>
                    <Link
                        to="/pets-list"
                        className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg text-center"
                    >
                        🐾 Ver todas las mascotas
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out;
                }

                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

export default MatchResults;