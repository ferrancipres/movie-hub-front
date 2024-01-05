import { useEffect, useState } from "react"
import { MovieContentProps } from "../Movie Cart/MovieCart";
import { MovieCart } from "../Movie Cart/MovieCart"
import { Spinner } from "..";
import './movieContent.css'

export const MovieContent = () => {
    // Controlar estado de movies, empieza con un array vacio
    const [movies, setMovies] = useState([]);
    // Controlar estado de loading, empieza en false
    const [isLoading, setIsLoading] = useState(false);

    // useEffect lo primero que realizar es una carga de datos y poner status loading en true
    // Estructura try & catch para gestionar errores
    // llamada fetch async await con response y data + callback
    try {
        useEffect(() => {
            const fetchMovies = async () => {
                setIsLoading(true);
                const searchUrl = "https://api.themoviedb.org/3/discover/movie";
            const response = await fetch(searchUrl, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2FhMjExZDZiYzZhNDliZjc2ZTQwMmQyMjBjY2Q5OCIsInN1YiI6IjY1NGM5NWM0ZDQ2NTM3MDBmZTM0NGExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0B18r9aPqwWZbDBCX-Yb7KaFTvrsee4NITpaMf2XUg",
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
             const data = await response.json();
                setMovies(data.results);
                setIsLoading(false);
        };
        fetchMovies();
        }, []);
    }
    catch (error) {
        console.error('Error:', error);
    }
    
    // Cuando isLoading sea true, que nos muestre el componente Spinner
    if (isLoading) {
        <Spinner />
    }

    // Si cuando realice la llamada no hay pelis que muestre null o quizás un texto o una imagen ??
    if (!movies) {
        return null;
    }

    // Aquí lo que tenemos que sacar por pantalla
    // el tipado "MovieContentProps" es para que se tipe bien todo el contenido dentro de la array de objetos que viene del fetch
    // despues ya utilizaremos el contenido que nos parezca interesante
    return (
        <ul className="movies-grid">
            {movies.map((movie: MovieContentProps) => (
                //Aquí lo metemos todo en un componente llamado MovieCart que le indicamos el "key" y le pasamos la prop "movie" (datos de la API)
                <MovieCart key={movie.id} movie={movie} />
            ))}
        </ul>
    )
}