import { useAuth0 } from "@auth0/auth0-react"
import { UserType } from "../../context/UserContext";
import { useUserContext } from "../../utils/useUserContext";
import { useEffect } from "react";
import { createUser, getUserByEmail } from "../../services/users.service";

export const Profile = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const { setCurrentLoggedUser } = useUserContext();

    useEffect(() => {
        (async function fetchUserData() {
            try {
                if (user?.email) {
                    const userData = await getUserByEmail(getAccessTokenSilently, user?.email);
                    const userFetched = userData[1] as UserType;

                    if (userData[1] != null) {
                        setCurrentLoggedUser(userFetched);
                    } else {
                        const newUser = {
                            name: user.name,
                            email: user.email,
                            password: user.email
                        };
                        const userCreated = await createUser(newUser);
                        setCurrentLoggedUser(userCreated);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        })();
    }, [user])

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