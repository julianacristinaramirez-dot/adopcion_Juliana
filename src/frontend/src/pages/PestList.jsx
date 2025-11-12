import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PetsList() {
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("Todo");
  const [selectedSize, setSelectedSize] = useState("Todo");
  const [selectedAge, setSelectedAge] = useState("Todo");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/pets');

        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de mascotas');
        }

        const responseData = await response.json();

        // Verificamos que la petición fue exitosa y que la propiedad 'data' existe
        if (responseData && responseData.success && Array.isArray(responseData.data)) {
          setAllPets(responseData.data);
          setFilteredPets(responseData.data);
          setError(null);
        } else {
          throw new Error('La respuesta de la API no tiene el formato esperado o no fue exitosa.');
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []); 

  useEffect(() => {
    let petsToFilter = [...allPets];

    if (searchTerm) {
      petsToFilter = petsToFilter.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecies !== "Todo") {
      petsToFilter = petsToFilter.filter(
        (pet) => pet.species === selectedSpecies
      );
    }

    if (selectedSize !== "Todo") {
      petsToFilter = petsToFilter.filter((pet) => pet.size === selectedSize);
    }

    if (selectedAge !== "Todo") {
      petsToFilter = petsToFilter.filter(
        (pet) => pet.age === parseInt(selectedAge, 10)
      );
    }

    setFilteredPets(petsToFilter);
  }, [searchTerm, selectedSpecies, selectedSize, selectedAge, allPets]);

  const toggleFavorite = (pet) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(pet.id)
        ? prevFavorites.filter((id) => id !== pet.id)
        : [...prevFavorites, pet.id]
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-xl text-gray-600">
        Cargando mascotas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-xl text-red-500">
        Error: {error}
      </div>
    );
  }

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
              <span className="text-2xl font-bold text-gray-800">
                Huellitas JR
              </span>
            </Link>

            {/* Botones de navegación */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md">
                <Link to="/favorites" className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Favoritos
                </Link>
              </button>
              <button className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md">
                <Link to="/match-quiz">Encuentra tu Match</Link>
              </button>
              <Link to="/profile">
                <button className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-md">
                  Perfil
                </button>
              </Link>
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
            Encuentra tu compañero perfecto entre nuestros adorables perritos y
            gatitos que buscan un hogar lleno de amor.
          </p>
        </div>

        {/* Barra de búsqueda y filtros (tu JSX original) */}
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
                <option value="Todo">Todo</option>
                <option value="PERRO">Perro</option>
                <option value="GATO">Gato</option>
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
                <option value="Todo">Todo</option>
                <option value="PEQUEÑO">Pequeño</option>
                <option value="MEDIANO">Mediano</option>
                <option value="GRANDE">Grande</option>
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
                <option value="Todo">Todo</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
                  <option key={age} value={age}>
                    {age} {age > 1 ? "años" : "año"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid de mascotas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64 bg-gray-200">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300/a8e6cf/000000?text=${pet.name}`;
                  }}
                />
                <button
                  onClick={() => toggleFavorite(pet)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  {/* ... SVG de favorito ... */}
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {pet.name}
                  </h3>
                  <span className="capitalize px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full">
                    {pet.species.toLowerCase()}
                  </span>
                </div>
                <div className="flex items-start gap-2 mb-3 text-sm text-gray-700">
                  <span>{pet.shelter.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Raza:</span>
                    <p className="text-gray-800">{pet.breed}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Edad:</span>
                    <p className="text-gray-800">
                      {pet.age} {pet.age > 1 ? "años" : "año"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Tamaño:</span>
                    <p className="capitalize text-gray-800">
                      {pet.size.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Género:</span>
                    <p className="capitalize text-gray-800">
                      {pet.gender.toLowerCase()}
                    </p>
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
        {!loading && filteredPets.length === 0 && (
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
