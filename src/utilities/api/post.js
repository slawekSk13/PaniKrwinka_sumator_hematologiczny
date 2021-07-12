import {API_URL} from "./constants";

const postResults = resultsToSave => {
    fetch(`${API_URL}/results`, {
        method: 'POST',
        body: JSON.stringify(resultsToSave),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(errors => console.warn(errors));
}

export {postResults}