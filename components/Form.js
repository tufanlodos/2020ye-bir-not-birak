import React from "react";
import styles from '../styles/Home.module.css';

const Form = () => {
    return <div className={styles.card}>
        <h3>Kimden</h3>
        <input className={styles.cardInput} type="text" placeholder="Boş bırakılırsa varsayılan bir isim atanır" />
        <br />
        <br />
        <h3>Not</h3>
        <textarea className={`${styles.cardInput} ${styles.resizeNone}`} rows="3" placeholder="Dilediğin uzunlukta olabilir" />
        <div className={styles.cardSubmitButtonContainer}>
            <button className={styles.cardSubmitButton}>Gönder</button>
        </div>
    </div>
}

export default Form