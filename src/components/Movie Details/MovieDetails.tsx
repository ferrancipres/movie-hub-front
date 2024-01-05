// useParams es un hook que nos permite acceder a los parámetros de la URL
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import './movieDetails.css';
import { Spinner } from '..';

// De donde sacas la información para tipar Movie? Entiendo que la información que se le pasa como props a MovieDetails viene de MovieContent
export interface Movie {
    poster_path: string;
    title: string;
    overview: string;
    // Necesito entender porque name.
    genres: { name: string }[];
    vote_average: number;
    original_language: string;
}

export const MovieDetails = () => {
    // A raiz del hook useParams() renombras el parametro  de la URL  a movieId
    const { movieId } = useParams();
    // Es necesario tipar movie en la declaración de un estado ??
    // Es interesante que al tener información de prop que viene de otro componente, es necesario tiparlo en el hook 
    // Tenemos que tener un estado porque tenemos que hacer un fetch para sacar la información de la API con los detalles de la movie
    const [movie, setMovie] = useState<Movie>();
    // Es necesario un estado para controlar el status de loading
    const [isLoading, setIsLoading] = useState(true);
    // muy interesante la metodologia de try & catch como un gestionador de errores
    try {
        useEffect(() => {
            const fetchMovie = async () => {
                setIsLoading(true)
                // creamos la constante con el parametro de la URL dinámico
                const tmdb_URL = `https://api.themoviedb.org/3/movie/${movieId}`;
                const response = await fetch(tmdb_URL, {
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2FhMjExZDZiYzZhNDliZjc2ZTQwMmQyMjBjY2Q5OCIsInN1YiI6IjY1NGM5NWM0ZDQ2NTM3MDBmZTM0NGExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0B18r9aPqwWZbDBCX-Yb7KaFTvrsee4NITpaMf2XUg",
                        "Content-Type": "application/json; charset=utf-8",
                    },
                });
                const data = await response.json();
                    setIsLoading(false)
                    setMovie(data);
            };
            fetchMovie();
        }, [movieId]);
        // Especificamos entre corchetes el parametro de la URL para que se ejecute el useEffect cuando cambie el parametro de la URL

    } catch (error) {
        console.error('Error:', error);
    }

    if (isLoading) {
        return <Spinner />
    }

    if (!movie) {
        return null;
    }

    const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

    return (
        <section className="details-container">
            <img className="col movie-img" src={imageUrl} alt={movie.title} />
            <div className="col movie-details">
                <p><strong>Title: </strong>
                    {movie.title}
                </p><br />
                <p>
                    <strong>Description: </strong>
                    {movie.overview}
                </p><br />
                <p>
                    <strong>Genres: </strong>
                    {movie.genres.map((genre) => genre.name).join(', ')}
                </p><br />
                <p>
                    <strong>Score: </strong>
                    {movie.vote_average}
                </p><br />
                <p>
                    <strong>Language: </strong>
                    {movie.original_language}
                </p><br />
            </div>
        </section>
    );
};
