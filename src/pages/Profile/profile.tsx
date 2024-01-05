// importamos useAuth0 para poder usarlo en el componente, junto con las funciones que nos da. En este caso (isAuthenticated, isLoading, user)
import { useAuth0 } from "@auth0/auth0-react"
// useUserContext es un contexto que no sé para sirve. ¿Cómo sabes que existe?
import { useUserContext } from "../../utils/useUserContext";

import { useEffect, useState } from "react";
// No sé que son, entiendo que son servicios de llamadas al backend
import { createUser, getAllUsers } from "../../services/users.service";
// No entiendo que es AddMovieModal, porque teoricamente ya existe un componente modal. ¿Cambia algo?
import { AddMovieModal } from "../../components/Add Modal Movie/AddModalMovie";
import './profile.css'
//Entiendo que es el componente que recibe las props de la película subida.
import { PorfileMovieContent } from "../../components/Porfile Movie Content/PorfileMovieContent";
import { Spinner } from "../../components";

export type movieUserProps = {
    genres: string[],
    id: number,
    name: string,
    poster_image: string,
    score: string,
    userId?: number
}

export type foundUserProps = {
    name: string;
    email: string;
    password: string;
}

// En principio no es necesario tipar el profile porque no recibe props
export const Profile = () => {
    //Desestructarizamos el auth0 para poder usarlo las funciones del componente
    const { user, isAuthenticated, isLoading } = useAuth0();
    // useUserContext es un contexto que alberga si el usuario loggeado es el mismo que el current user ??? 
    const { setCurrentLoggedUser, currentUser } = useUserContext();
    // useState que te permite gestionar el estado del modal para abrir o cerrar, en este caso nos permitirá abrir formulario para subir una película
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Función que nos permite abrir el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Función que nos permite cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Función que nos permite buscar el usuario loggeado y si no existe lo crea
    // Para identificar al usuario loggeado, lo hacemos a través del email en una llamada al back para traer todos los usuarios no?
    // Interesante para crearlo debería hacer una llamada al backend
    // Interesante reflexión siempre que tenemos una función tenemos que pensar en todas las posibilidad y eso siempre implica if / else or ternario
    // ¿Por qué es una funciopn asíncrona?
    const findLoggedUser = async () => {
        // Si es usuario existe, buscamos todos los usuarios y lo comparamos con el email del usuario loggeado
        if (user) {
            // getAllUsers es una llamada al backend para traer todos los usuarios
            const allUsers = await getAllUsers();
            // const foundUser es una constante que almacena el usuario loggeado, siempre y cuando tenga una coincidencia con el email. En caso contrario lo crea.
            const foundUser = await allUsers.find((foundUser: foundUserProps) => foundUser.email === user.email)

            // Si no existe el usuario loggeado, lo creamos.
            if (!foundUser) {
                // En el caso de crearlo, será necesario pasarle la información del usuario loggeado y para eso lo hacemos a través de la constante newUser
                const newUser = {
                    name: user.name,
                    email: user.email,
                    password: user.email
                };
                // createUser es una llamada al backend para crear un usuario
                const userCreated = await createUser(newUser)
                // setCurrentLoggedUser es una función que nos permite guardar el usuario loggeado en el contexto
                setCurrentLoggedUser(userCreated)
            } if (foundUser) {
                // setCurrentLoggedUser es una función que nos permite guardar el usuario loggeado en el contexto, en el caso de que exista
                setCurrentLoggedUser(foundUser)
            } 
        }
    }

    // useEffect es un hook que nos permite en este caso ejecutar la función findLoggedUser cuando cambie el estado de isAuthenticated
    useEffect(() => {
        findLoggedUser();
    }, [isAuthenticated])

    // Si isLoading es true, que nos muestre un texto de loading
    if (isLoading) {
        return <div><Spinner /></div>
    }

    // Basicamente lo que vamos a sacar por pantalla es: 
    // 1. Un saludo al usuario loggeado
    // 2. Un botón para abrir el modal y cerrar
    // 3. Una lista de películas subidas por el current usuario loggeado que se enviarán a un componente de React para sacarlo por pantalla
    return (
        <section>
            <article>
                <h4 className="profile-header">Welcome back, {user?.name}</h4>
            </article>
            <div className="btn-container">
                <button onClick={handleOpenModal} className="add-movie-btn">Add Movie</button>
                <AddMovieModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
            <ul className="movies-grid">
                {currentUser?.movies.map((movieUser: movieUserProps ) => (
                    <PorfileMovieContent key={movieUser.id} movieUser={movieUser} />
                ))}
            </ul>
        </section>
    )
};