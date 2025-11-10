import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MatchResults() {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtener respuestas del test
        const answersStr = localStorage.getItem('matchAnswers');
        
        if (!answersStr) {
            navigate('/match-quiz');
            return;
        }

        const answers = JSON.parse(answersStr);
        
        // Simular cálculo de compatibilidad
        setTimeout(() => {
            const calculatedMatches = calculateMatches(answers);
            setMatches(calculatedMatches);
            setLoading(false);
        }, 1500);
    }, [navigate]);

    // Función para calcular compatibilidad basada en respuestas
    const calculateMatches = (answers) => {
        const allPets = [
            {
                id: 1,
                name: 'Drako',
                image: '/imagenes/drako.jpg',
                shelter: 'Refugio Esperanza, Madrid',
                species: 'PERRO',
                breed: 'Golden Retriever',
                age: '2 años',
                size: 'Grande',
                gender: 'Macho',
                compatibility: 90,
                traits: ['casa_jardin', 'mas_2', 'mucha', 'perro', 'mayores']
            },
            {
                id: 2,
                name: 'Luna',
                image: '/imagenes/luna.jpg',
                shelter: 'Refugio Amoroso, Sevilla',
                species: 'PERRO',
                breed: 'Beagle',
                age: '3 años',
                size: 'Mediano',
                gender: 'Hembra',
                compatibility: 85,
                traits: ['casa_patio', '1_2_horas', 'bastante', 'perro', 'pequenos']
            },
            {
                id: 3,
                name: 'Mimi',
                image: '/imagenes/mimi.jpg',
                shelter: 'Refugio Felino, Valencia',
                species: 'GATO',
                breed: 'Siamés',
                age: '1 año',
                size: 'Pequeño',
                gender: 'Hembra',
                compatibility: 78,
                traits: ['apartamento', 'menos_30', 'algo', 'gato', 'no']
            },
            {
                id: 4,
                name: 'Rocky',
                image: '/imagenes/rocky.jpg',
                shelter: 'Refugio Canino, Bilbao',
                species: 'PERRO',
                breed: 'Husky Siberiano',
                age: '2 años',
                size: 'Grande',
                gender: 'Macho',
                compatibility: 82,
                traits: ['finca', 'mas_2', 'mucha', 'perro', 'adolescentes']
            }
        ];

        // Calcular compatibilidad real basada en respuestas
        const scoredPets = allPets.map(pet => {
            let score = 0;
            let maxScore = 0;

            Object.entries(answers).forEach(([questionId, answer]) => {
                maxScore += 20;
                if (pet.traits.includes(answer)) {
                    score += 20;
                } else {
                    // Compatibilidad parcial
                    score += 5;
                }
            });

            const compatibility = Math.round((score / maxScore) * 100);
            
            return {
                ...pet,
                compatibility: Math.min(compatibility, 95) // Máximo 95%
            };
        });

        // Ordenar por compatibilidad y tomar top 3
        return scoredPets
            .sort((a, b) => b.compatibility - a.compatibility)
            .slice(0, 3);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 border-8 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-6 mx-auto"></div>
                    <p className="text-2xl font-bold text-gray-800">Calculando tus matches perfectos...</p>
                    <p className="text-gray-600 mt-2">Analizando compatibilidad</p>
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
                            to="/pets"
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
                                        <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full">
                                            {pet.species}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2 mb-4 text-sm text-gray-700">
                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="font-medium">{pet.shelter}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                        <div>
                                            <span className="font-bold text-gray-700">Raza:</span>
                                            <p className="text-gray-800">{pet.breed}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700">Edad:</span>
                                            <p className="text-gray-800">{pet.age}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700">Tamaño:</span>
                                            <p className="text-gray-800">{pet.size}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700">Género:</span>
                                            <p className="text-gray-800">{pet.gender}</p>
                                        </div>
                                    </div>

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
                        to="/pets"
                        className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg text-center"
                    >
                        🐾 Ver todas las mascotas
                    </Link>
                </div>
            </div>

            <style jsx>{`
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
            `}</style>
        </div>
    );
}

export default MatchResults;