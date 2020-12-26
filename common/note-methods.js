const getNotes = async (token) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "notes",
        {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            
            method: "GET"
        }
    )
    const result = await response.json();
    return result;
}

const createNote = async () => {

}

export {getNotes,createNote}