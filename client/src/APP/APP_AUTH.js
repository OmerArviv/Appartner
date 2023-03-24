import Cookies from 'js-cookie';

export const getUserToken = () => {
    return Cookies.get('app_us_tk');
}

export const setTokenAfterSignIn = (token) =>{
    Cookies.set('app_us_tk',token);
}