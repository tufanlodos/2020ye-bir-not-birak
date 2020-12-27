const getNotes = async (token, listItemStartIndex) => {
    console.log("KAÇ İSTESİN",listItemStartIndex);
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + `notes?_start=${listItemStartIndex}&_limit=7&_sort=created_at:DESC`,
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

const getNoteCount = async (token) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "notes/count",
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

const addNote = async (token,postData) => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "notes",
        {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            
            method: "POST",
            body:JSON.stringify(postData)
        }
    )
    const result = await response.json();
    return result;
}

export {getNotes,getNoteCount,addNote}