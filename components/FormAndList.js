import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import styles from '../styles/Home.module.css';
import * as CookieMethods from "../common/cookie-methods";
import * as AuthMethods from "../common/auth-methods";
import * as NoteMethods from "../common/note-methods";

const RESET_FORM_STATUS = {
    pending:0,
    initial:1,
    success:2
}

const FormAndList = () => {
    const [loading,setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [user,setUser] = useState(null);
    const [resetForm,setResetForm] = useState(RESET_FORM_STATUS.initial);
    const [notes,setNotes] = useState([]);
    const [noteCount,setNoteCount] = useState(null);

    const checkUserAndGetToken = async () => {
        const user = CookieMethods.getUserFromCookie();
        console.log("user buuu",user);
        if (user) {
            const loginResult = await AuthMethods.login(user.email,user.password);
            console.log(loginResult)
            if (loginResult && loginResult.jwt) {
                setToken(loginResult.jwt);
                setUser(loginResult.user);
                fetchAndSetNotes(loginResult.jwt);
                setLoading(false);
            }
        }
        // CookieMethods.setUserCookie();
        // console.log();
    }

    const addNote = async (formData) => {
        try {
            const postData = {...formData};

            if(postData.display_name === ""){
                postData.display_name = "2020zede" + (notes.length + 1);
            }
            
            postData.created_by = {...user};
            const res = await NoteMethods.addNote(token,postData);
            console.log(res);
            if (res && res.created_at) {
                setResetForm(RESET_FORM_STATUS.pending);
                setResetForm(RESET_FORM_STATUS.success);
                fetchAndSetNotes(token);
            }
            console.log(res);
        } catch (error) {
            
        }
    }

    const fetchAndSetNotes = async (_token) => {
        try {
            const noteCount = await NoteMethods.getNoteCount(_token);
            if (noteCount && Number.isFinite(noteCount)) {
                setNoteCount(noteCount);
            }
            const notes = await NoteMethods.getNotes(_token);
            console.log("NEE GELEE",notes)
            if (notes && Array.isArray(notes)) {
                setNotes(notes);
                setLoading(false);
            }
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        checkUserAndGetToken();
    },[])

    return <div className={styles.grid}>
        {loading ? <p>Yüklenmekte...</p> : <>
            <Form addNote={(formData)=>addNote(formData)} resetForm={resetForm}/>

            {noteCount ? <h3 style={{color:"#0070f3"}}>Notlar ({noteCount})</h3> : null}

            <List notes={notes}/>
        </>}
    </div>
}

export default FormAndList