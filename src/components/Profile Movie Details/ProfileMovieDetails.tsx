
import { Link, redirect, useParams } from 'react-router-dom';
import { useUserContext } from '../../utils/useUserContext';
import { deleteMovie } from '../../services/users.service';

export const ProfileMovieDetails = () => {
    const { movieId } = useParams();
    const { currentUser } = useUserContext();
    console.log(movieId)
    // console.log(currentUser)

    const movieDetail = currentUser ? currentUser?.movies.find((movie) => {
        return movie.name === movieId
    }) : undefined;

    console.log(movieDetail)

    const handleDeleteMovie = async () => {
        if (!movieDetail) {
            return redirect("/");
        }

        await deleteMovie(movieDetail.id); // Esperar a que la eliminación se complete
        redirect("/user");
        location.reload();
    };

    return (
        <section className="details-container">
            <img className="col movie-img" src={movieDetail?.poster_image} alt={movieDetail?.name} />
            <div className="col movie-details">
                <p>
                    <strong>Title: </strong>
                    {movieDetail?.name}
                </p><br />
                {movieDetail?.genres ? (
                    <ul>
                        {movieDetail.genres.map((genre: any, index: number) => (
                            <li key={index}>
                                <p>
                                    <strong>Genre: </strong>
                                    {genre.genre.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : null}
                <p>
                    <strong>Score: </strong>
                    {movieDetail?.score}
                </p><br />
                <button className="button-style-user">Edit movie</button>
                <Link to={'/user'}>
                    <button onClick={handleDeleteMovie} className="button-style-user">Delete movie</button>
                </Link>

            </div>
        </section>
    )
};

