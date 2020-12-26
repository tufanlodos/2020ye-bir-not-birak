import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import styles from '../styles/Home.module.css';
import * as CookieMethods from "../common/cookie-methods";
import * as AuthMethods from "../common/auth-methods";

const FormAndList = () => {
    const [loading,setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const checkUserAndGetToken = async () => {
        const user = CookieMethods.getUserFromCookie();
        console.log("user buuu",user);
        if (user) {
            const loginResult = await AuthMethods.login(user.email,user.password);
            console.log(loginResult)
            if (loginResult && loginResult.jwt) {
                setToken(loginResult.jwt);
                setLoading(false);
            }
        }
        // CookieMethods.setUserCookie();
        // console.log();
    }

    useEffect(()=>{
        checkUserAndGetToken();
    },[])

    return <div className={styles.grid}>
        {loading ? <p>Yüklenmekte...</p> : <>
            <Form token={token}/>
            <List token={token}/>
        </>}
    </div>
}

export default FormAndList