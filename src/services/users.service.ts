
export const getAllUsers = async () => {
    //MODIFICIACION SABADO
    // const token = await getToken()
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}/user`, {
            method: "GET",
            headers: {
                // "Authorization": `Bearer ${token}`,
                // No hace falta autorización porque no tenemos el middleware
                "Content-Type": "application/json"
            }
        });

        const allUsers = await response.json()
        return allUsers
    } catch (error) {
        console.error('Erro fetching get all users:', error)
        return null
    }
};

export const getUserByEmail = async (userEmail: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        // const token = await getToken();
        //MODIFICIACION SABADO
        const response = await fetch(`${url}/user/${userEmail}`, {
            method: "GET",
            headers: {
                //MODIFICIACION SABADO
                // "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const data = await response.json();
        return [response, data];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return [null, null]
    }
};

export const createUser = async (userObject: {}) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}/user/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userObject)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

export const createNewMovie = async (userId: number, data: any) => {


    // const accessToken = await getToken();
    const { VITE_API_URL: url } = import.meta.env
    try {

        const response = await fetch(`${url}/movie/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                score: data.score,
                genres: data.genres,
                poster_image: data.poster_image
            })
        })
        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error fetching creating new movie:', error);
        return null
    }
}