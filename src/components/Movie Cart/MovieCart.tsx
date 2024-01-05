import { Link } from "react-router-dom";
import './movieCart.css'

// Tenemos que tipar las props que vienen de MovieContent
// Y la props es "movie" y dentro de movie tenemos que tiparla de nuevo con todo el contenido que tiene "movie"
export type movieProps = {
    movie: MovieContentProps;
}

export type MovieContentProps = {
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

// Utilizamos React.FC para tipar cuando queremos pasarle un childre como prop a alguno de nuestros componentes
export const MovieCart: React.FC<movieProps> = ({ movie: { id, title, poster_path } }) => {
    // Creamos la constante imageUrl porque necesita añadirle una variable a la url de la imagen que viene de la API
    // En este caso también añadimos en "link"
    const imageUrl = `https://image.tmdb.org/t/p/w300${poster_path}`;
    return (
        <li className="list-movies">
            <Link to={`/movie/${id}`}>
                <img className="movie-image" src={imageUrl} alt={title} />
                <div>{title}</div>
            </Link>
        </li>
    )
}