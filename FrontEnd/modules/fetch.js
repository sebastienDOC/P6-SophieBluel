export async function getData(url, callback) {
    return await fetch(url)
    .then((reponse) => reponse.json())
    .then(data => {
        if(callback){
            callback(data)
        } 
        return data
    })
    .catch(function(error){
        console.error('Error:', error)
    }); 
}

// -----------------------------------------------------

export async function deleteData(url, id) {
    return await fetch(url + id, {
        method: 'DELETE',
    })
    .then((reponse) => reponse.json())
    .then (data => {
        return data
    })
    .catch(function(error){
        console.error('Error:', error)
    }); 
}

// -----------------------------------------------------

export async function addData(url) {
    return await fetch(url, {
        method: 'POST',
    })
    .then((reponse) => reponse.json())
    .then (data => {
        return data
    })
    .catch(function(error){
        console.error('Error:', error)
    }); 
}
