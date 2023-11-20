import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './movieDetails.css';
import { Spinner } from '..';

interface Movie {
    poster_path: string;
    title: string;
    overview: string;
    genres: { name: string }[];
    vote_average: number;
    original_language: string;
}

export const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie>();
    const [isLoading, setIsLoading] = useState(true);

    try {
        useEffect(() => {
            setIsLoading(true)
            const tmdb_URL = `https://api.themoviedb.org/3/movie/${movieId}`;
            fetch(tmdb_URL, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2FhMjExZDZiYzZhNDliZjc2ZTQwMmQyMjBjY2Q5OCIsInN1YiI6IjY1NGM5NWM0ZDQ2NTM3MDBmZTM0NGExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0B18r9aPqwWZbDBCX-Yb7KaFTvrsee4NITpaMf2XUg",
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then((result) => result.json())
                .then((data) => {
                    setIsLoading(false)
                    setMovie(data);
                });
        }, [movieId]);

    } catch (error) {
        console.error('Error:', error);
    }

    if (isLoading) {
        return <Spinner />
    }

    if (!movie) {
        return null;
    }

    const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    return (
        <section className="details-container">
            <img className="col movie-img" src={imageUrl} alt={movie.title} />
            <div className="col movie-details">
                <p>
                    <strong>Title: </strong>
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
