import React from "react";
import styles from '../styles/Home.module.css';
import Form from "./Form";
import List from "./List";

const FormAndList = () => {
    return <div className={styles.grid}>
        <Form/>
        <List/>
    </div>
}

export default FormAndList