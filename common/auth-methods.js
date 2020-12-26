const login = async (identifier, password) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "auth/local",
        {
            headers: {
                'Content-Type': 'application/json'
            },
            
            method: "POST",
            body: JSON.stringify({identifier,password})
        }
    )
    const result = await response.json();
    return result;
}

export { login }