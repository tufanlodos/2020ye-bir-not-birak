import React, {useState} from "react";
import styles from '../styles/Home.module.css';
import * as NoteMethods from "../common/note-methods";

const INITIAL_FORM_DATA = {
    display_name:"",
    content:""
}

const Form = (props) => {
    const [formData,setFormData] = useState(INITIAL_FORM_DATA);

    const addNote = async () => {
        try {
            const postData = {...formData};
            if (postData.content === "") {
                alert("Not girmen zorunlu!");
                return;
            } else if(postData.display_name === ""){
                postData.display_name = "2020zede" + Date.now()
            }
            const res = await NoteMethods.addNote(props.token,postData);
            if (res && res.created_at) {
                alert("Ekledin!");
                setFormData(INITIAL_FORM_DATA);
            }
            console.log(res);
        } catch (error) {
            
        }
    }

    return props.token ? <div className={styles.card}>
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
                onClick={addNote}
            >Gönder</button>
        </div>
    </div> : null
}

export default Form