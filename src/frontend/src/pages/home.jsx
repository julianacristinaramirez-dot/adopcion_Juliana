import {useState , useEffect, use} from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Bienvenido a la página de inicio</h1>
            {token && (
                <button onClick={handleLogout} 
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                    Cerrar sesión
            </button>
            )}
            {token ? (
                <div>
                    <p className="text-green-600 text-xl">Haz iniciado sesión exitosamente</p>
                </div>

            ) : (
                <div>
                    <Link to="/login" className="mt-4 inline-block text-blue-500">
                        ir a la página del login
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Home;