import React, { useState } from "react";
import styles from '../styles/Home.module.css';

const List = (props) => {
    const [loading,setLoading] = useState(true);

    return props.notes ? <>
        {props.notes.map((note, index) => {
            return <div key={`${note.id}`} className={styles.card}>
                <h3>{note.display_name}</h3>
                <p>{note.content}</p>
            </div>
        })}
        {loading ? <p>Yüklenmekte...</p> : null}
    </> : null
}

export default List