import { useAuth0 } from "@auth0/auth0-react"
import { useUserContext } from "../../utils/useUserContext";
import { useEffect, useState } from "react";
import { createUser, getAllUsers } from "../../services/users.service";
import { AddMovieModal } from "../../components/Add Modal Movie/AddModalMovie";
import './profile.css'
import { PorfileMovieContent } from "../../components/Porfile Movie Content/PorfileMovieContent";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { setCurrentLoggedUser, currentUser } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const findLoggedUser = async () => {
        if (user) {
            const allUsers = await getAllUsers();
            const foundUser = await allUsers.find((foundUser: any) => foundUser.email === user.email)

            if (!foundUser) {
                const newUser = {
                    name: user.name,
                    email: user.email,
                    password: user.email
                };
                const userCreated = await createUser(newUser)
                setCurrentLoggedUser(userCreated)
            } else {
                setCurrentLoggedUser(foundUser)
            }
        }
    }

    useEffect(() => {
        findLoggedUser();
    }, [isAuthenticated])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="enlinea">
                <h4 className="titulo">Welcome back, {user?.name}</h4>
                <div className="btn-container-enlinea">
                    <button onClick={handleOpenModal} className="button-style-user">Edit profile</button>
                    <AddMovieModal isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
            </div>
            <div className="btn-container">
                <button onClick={handleOpenModal} className="button-style-user">Add Movie</button>
                <AddMovieModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
            <ul className="movies-grid">
                {currentUser?.movies.map((movieUser: any) => (
                    <PorfileMovieContent key={movieUser.id} movieUser={movieUser} />
                ))}
            </ul>
        </>
    )
};
