import { useAuth0 } from "@auth0/auth0-react"
import { useUserContext } from "../../utils/useUserContext";
import { useEffect } from "react";
import { createUser, getAllUsers } from "../../services/users.service";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { setCurrentLoggedUser } = useUserContext();

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
            <h4>I'm profile motherfucker!</h4>
        </>
    )
}

{/* <main>
                <section>
                    <MovieContent />
                </section>
            </main> */}