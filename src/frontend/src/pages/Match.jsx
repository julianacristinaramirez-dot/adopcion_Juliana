import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MatchQuiz() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    // Preguntas del test
    const questions = [
        {
            id: 1,
            question: "¿Cuál es tu situación de vivienda?",
            options: [
                { value: "apartamento", label: "Apartamento sin jardín" },
                { value: "casa_jardin", label: "Casa con jardín" },
                { value: "casa_patio", label: "Casa con patio" },
                { value: "finca", label: "Finca o casa rural" }
            ]
        },
        {
            id: 2,
            question: "¿Cuánto tiempo puedes dedicar al ejercicio diario?",
            options: [
                { value: "menos_30", label: "Menos de 30 minutos" },
                { value: "30_60", label: "30 - 60 minutos" },
                { value: "1_2_horas", label: "1 - 2 horas" },
                { value: "mas_2", label: "Más de 2 horas" }
            ]
        },
        {
            id: 3,
            question: "¿Tienes experiencia previa con mascotas?",
            options: [
                { value: "ninguna", label: "Ninguna experiencia" },
                { value: "algo", label: "Algo de experiencia" },
                { value: "bastante", label: "Bastante experiencia" },
                { value: "mucha", label: "Mucha experiencia" }
            ]
        },
        {
            id: 4,
            question: "¿Qué tipo de mascota prefieres?",
            options: [
                { value: "perro", label: "Perro" },
                { value: "gato", label: "Gato" },
                { value: "ambos", label: "Me gustan ambos" }
            ]
        },
        {
            id: 5,
            question: "¿Tienes niños en casa?",
            options: [
                { value: "no", label: "No tengo niños" },
                { value: "pequenos", label: "Niños pequeños (1-5 años)" },
                { value: "mayores", label: "Niños mayores (6+ años)" },
                { value: "adolescentes", label: "Adolescentes" }
            ]
        }
    ];

    const handleOptionSelect = (value) => {
        setSelectedOption(value);
    };

    const handleNext = () => {
        if (selectedOption) {
            setAnswers({
                ...answers,
                [questions[currentQuestion].id]: selectedOption
            });
            setSelectedOption(null);
            
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedOption(answers[questions[currentQuestion - 1].id] || null);
        }
    };

    const handleViewResults = () => {
        if (selectedOption) {
            const finalAnswers = {
                ...answers,
                [questions[currentQuestion].id]: selectedOption
            };
            // Guardar las respuestas en localStorage o pasarlas como state
            localStorage.setItem('matchAnswers', JSON.stringify(finalAnswers));
            navigate('/match-results');
        }
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentQ = questions[currentQuestion];

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

                        <Link
                            to="/pets-list"
                            className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md"
                        >
                            Ver todas las mascotas
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="max-w-2xl mx-auto px-4 py-12">
                {/* Título con icono de match */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h1 className="text-3xl font-bold text-white">Encuentra tu Match</h1>
                    </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-teal-300 font-semibold">
                            Barra de proceso {currentQuestion + 1}
                        </span>
                        <span className="text-sm text-gray-400">
                            Pregunta {currentQuestion + 1} de {questions.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Tarjeta de pregunta */}
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl shadow-2xl p-8 mb-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-teal-900 mb-2 text-center">
                            Test de compatibilidad
                        </h2>
                        <p className="text-gray-700 text-center text-sm">
                            Responde estas preguntas para encontrar tu mascota ideal
                        </p>
                    </div>

                    {/* Título de la pregunta */}
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                        Match pregunta {currentQuestion + 1}
                    </h3>

                    {/* Pregunta */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <p className="text-lg font-semibold text-gray-800 mb-4">
                            {currentQ.question}
                        </p>

                        {/* Opciones */}
                        <div className="space-y-3">
                            {currentQ.options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                        selectedOption === option.value
                                            ? 'border-teal-500 bg-teal-50'
                                            : 'border-gray-300 bg-white hover:border-teal-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQ.id}`}
                                        value={option.value}
                                        checked={selectedOption === option.value}
                                        onChange={() => handleOptionSelect(option.value)}
                                        className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                                    />
                                    <span className="ml-3 text-gray-700 font-medium">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Botones de navegación */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            currentQuestion === 0
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-700 text-white hover:bg-gray-600 transform hover:scale-105'
                        }`}
                    >
                        Anterior
                    </button>

                    {currentQuestion < questions.length - 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!selectedOption}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                !selectedOption
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 shadow-lg'
                            }`}
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            onClick={handleViewResults}
                            disabled={!selectedOption}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                !selectedOption
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 shadow-lg'
                            }`}
                        >
                            Ver resultados
                        </button>
                    )}
                </div>

                {/* Indicador de progreso con puntos */}
                <div className="flex justify-center gap-2 mt-8">
                    {questions.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentQuestion
                                    ? 'bg-teal-400 w-8'
                                    : index < currentQuestion
                                    ? 'bg-teal-600'
                                    : 'bg-gray-600'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MatchQuiz;