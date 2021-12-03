const setCookie = (cookieName, cookieValue, expires) => {
    document.cookie = `${cookieName}=${cookieValue};Max-Age=${expires};path=/`;
}

const getCookie = cookieName => {
    let cookieToReturn;
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieString = decodedCookie.split(';');
    cookieString.forEach(cookie => {
        while(cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if(cookie.indexOf(name) === 0) {
            cookieToReturn = cookie.substring(name.length, cookie.length);
        }
    });
    return cookieToReturn;
}

const deleteCookie = cookieName => {
    setCookie(cookieName, '', 1)
}

export {setCookie, getCookie, deleteCookie}