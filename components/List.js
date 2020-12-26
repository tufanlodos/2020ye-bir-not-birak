import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import * as NoteMethods from "../common/note-methods";

const List = (props) => {
    const [loading,setLoading] = useState(true);
    const [notes,setNotes] = useState([]);

    const fetchAndSetNotes = async () => {
        try {
            const notes = await NoteMethods.getNotes(props.token);
            console.log("NEE GELEE",notes)
            if (notes && Array.isArray(notes)) {
                setNotes(notes);
                setLoading(false);
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if (props.token) {
            fetchAndSetNotes();
        }
    },[props.token])

    return props.token ? <>
        {notes.map((note, index) => {
            return <div key={`${note.id}`} className={styles.card}>
                <h3>{note.display_name}</h3>
                <p>{note.content}</p>
            </div>
        })}
        {loading ? <p>Yüklenmekte...</p> : null}
    </> : null
}

export default List