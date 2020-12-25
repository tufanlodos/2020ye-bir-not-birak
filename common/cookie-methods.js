import sjcl from "./sjcl";
import jsCookie from 'js-cookie';

const setUserCookie = () => {
    const user = getUserFromCookie();
    if (user) {
        return;
    } else {
        const user = {username:"kullanici1",email:"kullanici1@kullanici.com",role:"Authenticated"};
        const encryptedUser = sjcl.encrypt(process.env.NEXT_PUBLIC_USER_INFO_OBJECT_ALGORITHM, JSON.stringify(user));
        const encryptedUserInfoKey = sjcl.encrypt(process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME_ALGORITHM,process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME);
        jsCookie.set(encryptedUserInfoKey,encryptedUser);
    }
}

const getUserFromCookie = () => {
    let result;
    const allCookies = jsCookie.get();
    if (allCookies) {
        for (let i = 0; i < Object.keys(allCookies).length; i++) {
            const encryptedCookieKey = Object.keys(allCookies)[i];
            const decryptedCookieKeyName = sjcl.decrypt(process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME_ALGORITHM,encryptedCookieKey);
            if (decryptedCookieKeyName === process.env.NEXT_PUBLIC_USER_INFO_COOKIE_KEY_NAME) {
                result = sjcl.decrypt(process.env.NEXT_PUBLIC_USER_INFO_OBJECT_ALGORITHM,allCookies[encryptedCookieKey]);
                break;
            }
        }
    }
    return result;
}

export { getUserFromCookie,setUserCookie }