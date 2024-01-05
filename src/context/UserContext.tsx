import { createContext, useState } from "react";

export interface UserType {
    id: number,
    name: string,
    email: string,
    password: string,
    movies: Array<Movie>
}

export type Movie = {
    id: number,
    name: string,
    score: string,
    poster_image: string,
    genres: any
}

// En este caso el contexto es un objeto con dos propiedades currentUser y setCurrentLoggedUser predeterminados por defeceto
// Por mi parte es la primera vez que veo que un contexto solo tiene 2 propiedades y en este caso están tipadas.
// En este caso setCurrentLoggedUser es una función que recibe un objeto "loggedUser" que es de tipo "UserType
export const UserContext = createContext<{ currentUser: UserType | null, setCurrentLoggedUser: (loggedUser: UserType) => void }>

// En este caso el objeto que se pasa a createContext también proporciona un valor predeterminado para el contexto.
    ({ currentUser: null, setCurrentLoggedUser: () => { } });

export const UserContextProvider = ({ ...props }) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    
    const setCurrentLoggedUser = (loggedUser: UserType) => {
        setCurrentUser(loggedUser);
    }

    return (
        <UserContext.Provider value={{ currentUser, setCurrentLoggedUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
