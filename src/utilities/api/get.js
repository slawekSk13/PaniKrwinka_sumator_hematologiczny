import {API_URL} from "./constants";

//@param {function} succesCallback - func that saves incoming data

const getResults = successCallback => {
    fetch(`${API_URL}/results`)
        .then(response => response.json())
        .then(data => {
            typeof successCallback === 'function' && successCallback(data);})
        .catch(errors => console.warn(errors));
}

export {getResults}