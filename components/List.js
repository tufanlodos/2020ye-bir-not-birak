import React from "react";
import styles from '../styles/Home.module.css';

const List = () => {
    return <>
        {Array(10).fill("x").map((item, index) => {
            return <div key={`${item}_${index}`} className={styles.card}>
                <h3>2020zede{item}{index}</h3>
                <p>Batsın bu dünya bitsin bu rüya aldatıp da gülene yazıklar olssuuun.</p>
            </div>
        })}
    </>
}

export default List