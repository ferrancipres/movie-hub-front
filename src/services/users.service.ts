
export const getAllUsers = async () => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const allUsers = await response.json()
        return allUsers
    } catch (error) {
        console.error('Error fetching get all users:', error)
        return null
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
