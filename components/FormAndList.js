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
    const [error, setError] = useState(null);

    const [token, setToken] = useState(null);
    const [user,setUser] = useState(null);

    const [resetForm,setResetForm] = useState(RESET_FORM_STATUS.initial);
    const [showList,setShowList] = useState(false);
    const [fetchedNotes,setFetchedNotes] = useState({data:[],totalCount:null});
    const [listItemStartIndex,setListItemStartIndex] = useState(0);

    const checkUserAndGetToken = async () => {
        const cookie = CookieMethods.getUserFromCookie();
        try {
            let loginResult;
            if (cookie) {
                loginResult = await AuthMethods.login(cookie.user.email,cookie.user.password);
            } else {
                loginResult = await CookieMethods.setUserCookie();
            }

            if (loginResult && loginResult.jwt) {
                setToken(loginResult.jwt);
                setUser(loginResult.user);
                fetchAndSetNotes(loginResult.jwt, false);
            }
        } catch (error) {
            setError(error);
        }
    }

    const addNote = async (formData) => {
        try {
            const postData = {...formData};

            if(postData.display_name === ""){
                postData.display_name = "2020zede" + (fetchedNotes.totalCount + 1);
            }
            
            postData.created_by = {...user};
            const res = await NoteMethods.addNote(token,postData);
            if (res && res.created_at) {
                setResetForm(RESET_FORM_STATUS.pending);
                setResetForm(RESET_FORM_STATUS.success);
                fetchAndSetNotes(token, false);
            }
        } catch (error) {
            setError(error);
        }
    }

    const fetchAndSetNotes = async (_token, isMore) => {
        try {
            const noteCount = await NoteMethods.getNoteCount(_token);
            if (noteCount && Number.isFinite(noteCount)) {
                let _listItemStartIndex;
                if (isMore) {
                    _listItemStartIndex = listItemStartIndex + Number(process.env.NEXT_PUBLIC_PAGINATION_PER_PAGE);
                } else {
                    setShowList(false);
                    _listItemStartIndex = 0;
                    setFetchedNotes({data:[],totalCount:noteCount});
                }

                setListItemStartIndex(_listItemStartIndex);

                const notes = await NoteMethods.getNotes(_token, _listItemStartIndex);
                
                if (notes && Array.isArray(notes)) {
                    if (isMore) {
                        setFetchedNotes({data:[...fetchedNotes.data,...notes],totalCount:noteCount})                    
                    } else {
                        setFetchedNotes({data:notes,totalCount:noteCount});
                        setShowList(true);
                    }
                }                
            }
            setLoading(false);
        } catch (error) {
            setError(error);
        }
    }


    useEffect(()=>{
        checkUserAndGetToken();
    },[])

    return <div className={styles.grid}>
        {error ? <p>Başaramadık abi.</p> : loading ? <p>Geliyor gelmekte olan... (Maalesef 30 sn. kadar sürebilir)</p> : <>
            <Form addNote={(formData) => addNote(formData)} resetForm={resetForm} />

            <>
                {fetchedNotes.totalCount ?
                    <div className={styles.fdRowCenter}>
                        <h3 className={`${styles.colorPrimary} ${styles.textCenter}`}>
                            Notlar ({fetchedNotes.totalCount})
                    </h3>
                        <button
                            className={`${styles.btnInitial} ${styles.pt5}`}
                            onClick={() => fetchAndSetNotes(token, false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z" /></svg>
                        </button>
                    </div> : null}

                {showList ? <List
                    notesData={fetchedNotes}
                    getMore={() => fetchAndSetNotes(token, true)}
                /> : fetchedNotes.data.length > 0 ? <p>Çok az kaldı...</p> : <p>Bir şeyler gelebilir, gelmeyebilir de.</p>}
            </>
        </>}
    </div>
}

export default FormAndList
