// En esta seccion de servicios se realizan las peticiones a la API
// En este caso en particular se realizan peticiones acerca CRUD de peliculas
// En este caso no voy a modificar ningun 'any' por miedo a cagarme encima

export const createNewMovie = async (userId: number, data: any, getToken: any) => {

    const token = await getToken();
    const { VITE_API_URL: url } = import.meta.env
    try {
        const response = await fetch(`${url}/movie/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                score: data.score,
                genres: [{ name: data.genres }],
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


export const updateMovie = async (movieId: number, data: any, getToken: any) => {
   
    const token = await getToken();
    const { VITE_API_URL: url } = import.meta.env
    try {

        const response = await fetch(`${url}/movie/${movieId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                score: data.score,
                genres: [{ name: data.genres }],
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

export const deleteMovie = async (movieId: number, getToken: any) => {
    const { VITE_API_URL: url } = import.meta.env
    const token = await getToken();

    const response = await fetch(`${url}/movie/${movieId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const dataFetched = await response.json();
    return dataFetched;
}