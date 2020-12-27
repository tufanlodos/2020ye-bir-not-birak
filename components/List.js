import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from '../styles/Home.module.css';

const List = (props) => {
    console.log(props.notesData.data.length !== props.noteCount)

    return props.notesData.data && props.notesData.data.length > 0 ? 
        <InfiniteScroll
            dataLength={props.notesData.totalCount}
            next={props.getMore}
            hasMore={props.notesData.data.length !== props.noteCount}
            loader={<p className={styles.textCenter}>Yüklenmekte...</p>}
            endMessage={
                <p className={styles.textCenter}>
                    Bütün yılı bitirmiş gibi duruyorsun. Başka not kalmadı.
                </p>
            }
        >
            {props.notesData.data.map((note, index) => {
                return <div key={`${note.id}`} className={`${styles.card} ${styles.noteItem}`}>
                    <h3>{note.display_name}</h3>
                    <p>{note.content}</p>
                </div>
            })}
        </InfiniteScroll> : null
}

export default List