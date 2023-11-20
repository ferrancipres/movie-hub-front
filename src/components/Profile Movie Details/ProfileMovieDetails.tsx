
import { Link, redirect, useParams } from 'react-router-dom';
import { useUserContext } from '../../utils/useUserContext';
import { deleteMovie } from '../../services/users.service';
import { useState } from 'react';
import { EditMovieModal } from '../Edit MovieModal/EditMovieModal';
import { useAuth0 } from '@auth0/auth0-react';

export const ProfileMovieDetails = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { movieId } = useParams();
    const { currentUser } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const movieDetail = currentUser ? currentUser?.movies.find((movie) => {
        return movie.name === movieId
    }) : undefined;

    const handleDeleteMovie = async () => {
        if (!movieDetail) {
            return redirect("/");
        }

        await deleteMovie(movieDetail.id, getAccessTokenSilently); // Esperar a que la eliminación se complete
        redirect("/user");
        location.reload();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

                {/* <button className="button-style-user">Edit movie</button> */}

                <div className="btn-container">
                    <button onClick={handleOpenModal} className="button-style-user">Edit Movie</button>
                    <EditMovieModal isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>

                <Link to={'/user'}>
                    <button onClick={handleDeleteMovie} className="button-style-user">Delete movie</button>
                </Link>

            </div>
        </section>
    )
};

