import { FC, useEffect, useState } from "react"
import { MovieCart } from "../Movie Cart/MovieCart"
import './movieContent.css'
import { Spinner } from "..";

export const MovieContent: FC = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const searchUrl = "https://api.themoviedb.org/3/discover/movie";

        fetch(searchUrl, {
            method: 'GET',
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2FhMjExZDZiYzZhNDliZjc2ZTQwMmQyMjBjY2Q5OCIsInN1YiI6IjY1NGM5NWM0ZDQ2NTM3MDBmZTM0NGExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0B18r9aPqwWZbDBCX-Yb7KaFTvrsee4NITpaMf2XUg",
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(result => result.json())
            .then((data) => {
                setMovies(data.results);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        <Spinner />
    }

    if (!movies) {
        return null;
    }

    return (
        <ul className="movies-grid">
            {movies.map((movie: any) => (
                <MovieCart key={movie.id} movie={movie} />
            ))}
        </ul>
    )
};