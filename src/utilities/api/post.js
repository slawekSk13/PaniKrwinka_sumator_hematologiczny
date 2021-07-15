import {API_URL} from "./constants";

const postToAPI = (dataToSave, path) => {
    fetch(`${API_URL}/${path}.json`, {
        method: 'POST',
        body: JSON.stringify(dataToSave),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(errors => console.warn(errors));
}

export {postToAPI}