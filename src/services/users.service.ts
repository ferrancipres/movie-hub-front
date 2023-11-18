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

export const getUserByEmail = async (getToken: any, userEmail: string) => {
    try {
        const token = await getToken();
        const response = await fetch(`http://localhost:4000/user/email/${userEmail}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
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

export const getAllUsers = async () => {

    // const token = await getToken()

    const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        headers: {

            "Content-Type": "application/json"
        }
    })

    const allUsers = await response.json()
    return allUsers

}