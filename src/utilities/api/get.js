import {API_URL} from "./constants";

//@param {function} succesCallback - func that saves incoming data

const getFromAPI = (successCallback, path) => {
    fetch(`${API_URL}/${path}.json`)
        .then(response => response.json())
        .then(data => {
            typeof successCallback === 'function' && successCallback(data, path);})
        .catch(errors => console.warn(errors));
}

export {getFromAPI}