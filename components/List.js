import React, { useEffect, useState, useRef } from "react";
import styles from '../styles/Home.module.css';

const List = (props) => {
    const [page, setPage] = useState(1);
    const [showAllOf, setShowAllOf] = useState({})
    const loader = useRef(null);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 0.8
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }

    }, []);

    useEffect(() => {
        props.getMore();
    }, [page]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }

    const toggleShowAllOrHide = (id) => {
        const _showAllOf = {...showAllOf};
        if (_showAllOf[id]) {
            delete _showAllOf[id];
        } else {
            _showAllOf[id] = true;
        }
        setShowAllOf(_showAllOf)
    }

    return props.notesData.data && props.notesData.data.length > 0 ? <div>
        {
            props.notesData.data.map((note, index) => {
                const hasOverflow = (note.display_name.length > 50) || (note.content.length > 300);
                return <div key={`${note.id}`} className={`${styles.card} ${styles.noteItem} ${styles.positionRelative}`}>
                    {hasOverflow ? <button className={`${styles.btnInitial} ${styles.positionAbsolute} ${styles.showHideOverflowButton}`} onClick={()=>toggleShowAllOrHide(note.id)}>{showAllOf[note.id] ? "Daha Az Gör" : "Tümünü Gör"}</button> : null}

                    {
                        (!hasOverflow || (hasOverflow && !showAllOf[note.id])) ? <>
                            <h3>
                                {note.display_name.length > 50 ? note.display_name.substr(0, 50) + "..." : note.display_name}
                            </h3>
                            <p>{note.content.length > 300 ? note.content.substr(0, 300) + "..." : note.content}</p>
                        </> : <>
                            <h3>{note.display_name}</h3>
                            <p>{note.content}</p>
                        </>
                    }
                    
                </div>
            })
        }
        {props.notesData.data.length !== props.notesData.totalCount ? <div ref={loader}>
            <p className={styles.textCenter}>Devamı yükleniyor...</p>
        </div> : props.notesData.data.length > 5 ? <p className={styles.textCenter}>
            Bütün yılı bitirmiş gibi duruyorsun. Başka not kalmadı.
        </p> : null}
    </div> : null
}

export default List