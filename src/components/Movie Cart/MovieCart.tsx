import { FC } from "react"
import { Link } from "react-router-dom";
import './movieCart.css'

type movieProps = {
    movie: MovieContentProps;
}

type MovieContentProps = {
    adult: boolean;
    backdrop_path: string;
    title: string;
    genre_ids: number[];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const MovieCart: FC<movieProps> = ({ movie }) => {
    const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    return (
        <li className="list-movies">
            <Link to={'/movie/' + movie.id}>
                <img className="movie-image" src={imageUrl} alt={movie.title} />
                <div>{movie.title}</div>
            </Link>
        </li>
    )
}