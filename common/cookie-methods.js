import sjcl from "./sjcl";
import jsCookie from 'js-cookie';
import {register} from "../common/auth-methods";

const setUserCookie = async () => {
    const user = getUserFromCookie();
    if (user) {
        return;
    }

    const postData = {
        username:Date.now(),
        password:"very_hard",
        email:`${Date.now()}@${Date.now()}.io`
    };

    const registerResult = await register(postData);
    registerResult.user.password = postData.password;

    const encryptedUser = sjcl.encrypt(process.env.NEXT_PUBLIC_USER_INFO_OBJECT_ALGORITHM, JSON.stringify(registerResult));
    const encryptedUserInfoKey = sjcl.encrypt(process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME_ALGORITHM,process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME);
    jsCookie.set(encryptedUserInfoKey,encryptedUser);

    return registerResult;
}

const getUserFromCookie = () => {
    let result;
    const allCookies = jsCookie.get();
    if (allCookies && Object.keys(allCookies).length > 0) {
        for (let i = 0; i < Object.keys(allCookies).length; i++) {
            const encryptedCookieKey = Object.keys(allCookies)[i];
            const decryptedCookieKeyName = sjcl.decrypt(process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME_ALGORITHM,encryptedCookieKey);
            if (decryptedCookieKeyName === process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME) {
                result = sjcl.decrypt(process.env.NEXT_PUBLIC_USER_INFO_OBJECT_ALGORITHM,allCookies[encryptedCookieKey]);
                break;
            }
        }
        return JSON.parse(result);
    }

    return undefined
}

export { getUserFromCookie,setUserCookie }