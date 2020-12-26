import React, {useEffect, useState} from "react";
import styles from '../styles/Home.module.css';

const INITIAL_FORM_DATA = {
    display_name:"",
    content:""
}

const Form = (props) => {
    const [formData,setFormData] = useState(INITIAL_FORM_DATA);

    useEffect(()=>{
        if (props.resetForm) {
            setFormData(INITIAL_FORM_DATA)
        }
    },[props.resetForm])

    return <div className={styles.card}>
        <h3>Kimden</h3>
        <input 
            className={styles.cardInput} 
            type="text" 
            placeholder="Boş bırakılırsa varsayılan bir isim atanır" 
            onChange={(e)=>{setFormData({...formData, display_name:e.target.value})}}
            value={formData.display_name}
        />
        <br />
        <br />
        <h3>Not</h3>
        <textarea 
            className={`${styles.cardInput} ${styles.resizeNone}`} 
            rows="3" 
            placeholder="Dilediğin uzunlukta olabilir"
            onChange={(e)=>{setFormData({...formData, content:e.target.value})}}
            value={formData.content} 
        />
        <div className={styles.cardSubmitButtonContainer}>
            <button 
                className={styles.cardSubmitButton}
                onClick={() => props.addNote(formData)}
            >Gönder</button>
        </div>
    </div>
}

export default Form