
import { FC } from 'react';
import './PorfileMovieContent'
import { Link } from 'react-router-dom';
import './porfileMovieContent.css'

type movieUserProps = {
    movieUser: PorfileMovieContentProps;
}
type PorfileMovieContentProps = {
    genres: string[],
    id: number,
    name: string,
    poster_image: string,
    score: string,
    userId: number
}

export const PorfileMovieContent: FC<movieUserProps> = ({ movieUser }) => {
    return (
        <li className='list-movies'>
            <Link to={`/user/movie/${movieUser.name}`}>
                <img className="movie-image" src={movieUser.poster_image} alt={movieUser.name} />
                <p>Title: {movieUser.name}</p>
                <p>Score:{movieUser.score}</p>
                <p>{movieUser.genres.map((genre: any) => (
                    <li key={genre.genre.id}>
                        <p>Genre: {genre.genre.name}</p>
                    </li>
                ))}</p>
            </Link>

        </li>
    )
};