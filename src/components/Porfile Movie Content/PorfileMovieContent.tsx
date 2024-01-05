import { Link } from 'react-router-dom';
import './porfileMovieContent.css'

export type movieUserProps = {
    movieUser: PorfileMovieContentProps;
}

export type PorfileMovieContentProps = {
    genres: string[],
    id: number,
    name: string,
    poster_image: string,
    score: string,
    userId?: number
}

// Cuidado he realizado un cambio en el return genres, que puede salir bien o puede salir muy mal.
// Dejamos pendiente "any" porque no tengo manera de mirar que tipo de dato es genres
// También hemos realizar cambios y quiero ver si funcionan o no.

export const PorfileMovieContent: React.FC<movieUserProps> = ({ movieUser }) => {
    const { name, poster_image, score, genres } = movieUser;
    return (
        <ul className='list-movies'>
            <Link to={`/user/movie/${name}`}>
                <img className="movie-image" src={poster_image} alt={name} />
                <p>Title: {name}</p>
                <p>Score:{score}</p>
                <div>{genres.map((genre: any) => genre.name).join(', ')}

                    {/* <li key={genre.genre.id}>
                        <p>Genre: {genre.genre.name}</p>
                    </li> */}
                </div>
            </Link>
        </ul>
    )
};