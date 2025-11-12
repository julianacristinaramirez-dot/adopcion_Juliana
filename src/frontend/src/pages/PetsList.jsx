import { useState } from 'react';
import { Link } from 'react-router-dom';

function PetsList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('Todo');
    const [selectedSize, setSelectedSize] = useState('Todo');
    const [selectedAge, setSelectedAge] = useState('Todo');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Cargar favoritos desde localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            const favoritesData = JSON.parse(savedFavorites);
            setFavorites(favoritesData.map(pet => pet.id));
        }
    }, []);

    // Array de mascotas - Aquí puedes agregar más o conectar con tu API
    const pets = [
        {
            id: 1,
            name: 'Loki',
            image: '/imagenes/loki.jpg', // Ajusta la ruta según tu estructura
            shelter: 'Refugio San Francisco, Barcelona',
            species: 'PERRO',
            breed: 'Pastor Alemán',
            age: '4 años',
            size: 'Grande',
            gender: 'Macho',
            description: 'Max es un perro leal y protector, ideal para familias activas.'
        },
        {
            id: 2,
            name: 'Mimi',
            image: '/imagenes/mimi.jpg',
            shelter: 'Refugio Felino, Valencia',
            species: 'GATO',
            breed: 'Siamés',
            age: '1 año',
            size: 'Pequeño',
            gender: 'Hembra',
            description: 'Mimi es una gata cariñosa que disfruta de un hogar tranquilo.'
        },
        {
            id: 3,
            name: 'Drako',
            image: '/imagenes/drako.jpg',
            shelter: 'Refugio Esperanza, Madrid',
            species: 'PERRO',
            breed: 'Golden Retriever',
            age: '2 años',
            size: 'Grande',
            gender: 'Macho',
            description: 'Drako es un perro muy cariñoso, obediente y juguetón que adora los niños.'
        },
        {
            id: 4,
            name: 'Luna',
            image: '/imagenes/luna.jpg', // Añade esta imagen
            shelter: 'Refugio Amoroso, Sevilla',
            species: 'PERRO',
            breed: 'Beagle',
            age: '3 años',
            size: 'Mediano',
            gender: 'Hembra',
            description: 'Luna es una perrita alegre y enérgica, perfecta para paseos largos.'
        },
        {
            id: 5,
            name: 'Bigotes',
            image: '/imagenes/bigotes.jpg', // Añade esta imagen
            shelter: 'Refugio Gatuno, Málaga',
            species: 'GATO',
            breed: 'Persa',
            age: '5 años',
            size: 'Pequeño',
            gender: 'Macho',
            description: 'Bigotes es un gato tranquilo que disfruta de largas siestas al sol.'
        },
        {
            id: 6,
            name: 'Rocky',
            image: '/imagenes/rocky.jpg', // Añade esta imagen
            shelter: 'Refugio Canino, Bilbao',
            species: 'PERRO',
            breed: 'Husky Siberiano',
            age: '2 años',
            size: 'Grande',
            gender: 'Macho',
            description: 'Rocky es un perro activo y aventurero, ideal para familias deportistas.'
        }
    ];

    const toggleFavorite = (petId) => {
        setFavorites(prev => 
            prev.includes(petId) 
                ? prev.filter(id => id !== petId)
                : [...prev, petId]
        );
    };

    // Filtrar mascotas
    const filteredPets = pets.filter(pet => {
        const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecies = selectedSpecies === 'Todo' || pet.species === selectedSpecies;
        const matchesSize = selectedSize === 'Todo' || pet.size === selectedSize;
        const matchesAge = selectedAge === 'Todo' || pet.age.includes(selectedAge);
        
        return matchesSearch && matchesSpecies && matchesSize && matchesAge;
    });

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
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Favoritos
                            </button>
                            <button className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md">
                                Encuentra tu Match
                            </button>
                            <button className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-md">
                                Perfil
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Título */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Mascotas disponibles para Adopción
                    </h1>
                    <p className="text-lg text-gray-700">
                        Encuentra tu compañero perfecto entre nuestros adorables perritos y gatitos que buscan un hogar lleno de amor.
                    </p>
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="bg-white/80 rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Búsqueda */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buscar:
                            </label>
                            <input
                                type="text"
                                placeholder="Nombre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {/* Filtro Especie */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Especie:
                            </label>
                            <select
                                value={selectedSpecies}
                                onChange={(e) => setSelectedSpecies(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option>Todo</option>
                                <option>PERRO</option>
                                <option>GATO</option>
                            </select>
                        </div>

                        {/* Filtro Tamaño */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tamaño:
                            </label>
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option>Todo</option>
                                <option>Pequeño</option>
                                <option>Mediano</option>
                                <option>Grande</option>
                            </select>
                        </div>

                        {/* Filtro Edad */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Edad:
                            </label>
                            <select
                                value={selectedAge}
                                onChange={(e) => setSelectedAge(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option>Todo</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid de mascotas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPets.map(pet => (
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
                                {/* Botón de favorito */}
                                <button
                                    onClick={() => toggleFavorite(pet.id)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                >
                                    <svg 
                                        className={`w-6 h-6 ${favorites.includes(pet.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                        fill={favorites.includes(pet.id) ? 'currentColor' : 'none'}
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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

                                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                    {pet.description}
                                </p>

                                <button className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                    Ver más detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje si no hay resultados */}
                {filteredPets.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">
                            No se encontraron mascotas con los filtros seleccionados.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PetsList;