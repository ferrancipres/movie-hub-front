
// No entiendo para que sirve redirect
import { Link, redirect, useParams } from 'react-router-dom';

// Pendiente de revisar useUserContext. ¿Cómo sabes que existe?
import { useUserContext } from '../../utils/useUserContext';

// No entiendo deteleMovie porque no existe en el servicio de movies
import { deleteMovie } from '../../services/movies.service';

// No entiendo porque existe EditMovieModal. ¿No es lo mismo que Modal?
import { EditMovieModal } from '../Edit MovieModal/EditMovieModal';

import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

// Componente de react que recibe props y devuelve un componente. 
// En este caso no recibe ninguna prop porque viene un URL params

export const ProfileMovieDetails = () => {
    const { movieId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // A través de useAuth0 podemos acceder a las funciones de auth0, como puede ser getAccessTokenSilently que nos permite que si el usuario esta loggeado, nos devuelve el token
    const { getAccessTokenSilently } = useAuth0();
    // useUserContext es un contexto que no sé para sirve. ¿Cómo sabes que existe?
    // En este caso nos da la información del currentUser tanto si existe como si es nuevo.
    const { currentUser } = useUserContext();

    // Como tenemos que aplicar lógica obviamente tenemos que utilizar if / else or ternario
    // En primer lugar nos preguntar si el currentUser existe, en caso contrario es undefined
    // Debería redigirirnos a la home si el currentUser no existe??
    // En el caso de que el usuario exista realiza una función "find"
    const movieDetail = currentUser ? 
        currentUser?.movies.find((movie) => {
        return movie.name === movieId
        }) 
    : undefined;

    // Funcion que nos permite borrar una película a través de una llamada al backend y por eso en este caso debe ser async
    // Además también añade la posibilidad de que sino existe movie Detail nos redirija a la home
    const handleDeleteMovie = async () => {
        if (!movieDetail) {
            return redirect("/");
        }

        await deleteMovie(movieDetail.id, getAccessTokenSilently);
        redirect("/user");
        location.reload();
    };

    // Función que nos permite abrir el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Función que nos permite cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Importante he seguido en mi línea de realizar cambios en todo lo que viene respecto al genero.
    // Cuidado.

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
  {/*                       {movieDetail.genres.map((genre: any, index: number) => (
                            <li key={index}>
                                <p>
                                    <strong>Genre: </strong>
                                    {genre.genre.name}
                                </p>
                            </li>
                        ))} */}
                        {movieDetail.genres.map((genre: any) => 
                            <li key={genre.id}>
                                <p>
                                    <strong>Genre: </strong>
                                    {genre.name.join(', ')}
                                </p>
                            </li>
                        )}
                    </ul>
                ) : null}
                <p>
                    <strong>Score: </strong>
                    {movieDetail?.score}
                </p><br />

                {/* <button className="button-style-user">Edit movie</button> */}

                <div className="btn-container">
                    <button onClick={handleOpenModal} className="add-movie-btn">Edit Movie</button>
                    <EditMovieModal isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>

                <Link to={'/user'}>
                    <button onClick={handleDeleteMovie} className="add-movie-btn">Delete movie</button>
                </Link>

            </div>
        </section>
    )
};