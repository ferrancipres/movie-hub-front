
// contenido de películas del usuario
import { FC, useEffect, useState } from "react"
import movie from '../../db/movie.json'
import { MovieCart } from "../Movie Cart/MovieCart"
import './movieContent.css'
import { Spinner } from "../Spinner/spinner"
import { useLocation } from "react-router-dom"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export const MovieContent: FC = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const query = useQuery();
    const search = query.get("search");
    console.log(search)

    useEffect(() => {
        setIsLoading(true);
        const searchUrl = search
            ? `https://api.themoviedb.org/3/search/movie?query=${search}`
            : "https://api.themoviedb.org/3/discover/movie";

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
    }, [search]);

    if (isLoading) {
        <Spinner />
    }

    if (!movies) {
        return null;
    }

    return (
        <ul className="movies-grid">
            {movie.map((movie: any) => (
                <MovieCart key={movie.id} movie={movie} />
            ))}
        </ul>
    )
}