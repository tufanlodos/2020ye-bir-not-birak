import React, {useEffect, useState} from "react";
import styles from '../styles/Home.module.css';

const INITIAL_FORM_DATA = {
    display_name:"",
    content:""
}

const Form = (props) => {
    const [formData,setFormData] = useState(INITIAL_FORM_DATA);
    const [errorMessage,setErrorMessage] = useState(null); 
    const [successMessage,setSuccessMessage] = useState(null); 

    useEffect(()=>{
        if (props.resetForm) {
            setFormData(INITIAL_FORM_DATA);
            setErrorMessage(null);
            setSuccessMessage(null);
            if (props.resetForm === 2) {
                setSuccessMessage("Notun emin ellerde, teşekkürler!");
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 2000);
            }
        }
    },[props.resetForm])

    const checkFirst = () => {
        const postData = {...formData};

        if (postData.content === "") {
            setErrorMessage("Not girmen zorunlu!");
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
            return;
        }
        props.addNote(formData)
    }

    return <div className={`${styles.card} ${styles.form}`}>
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
                onClick={checkFirst}
            >Gönder</button>
        </div>
        <br />
        {errorMessage ? <p className={`${styles.alertBox} ${styles.error}`}>{errorMessage}</p> : null}
        {successMessage ? <p className={`${styles.alertBox} ${styles.success}`}>{successMessage}</p> : null}
    </div>
}

export default Form