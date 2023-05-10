export async function getData(url, callback) {
    return await fetch(url)
    .then((reponse) => reponse.json())
    .then(data => {
        if(callback){
            callback(data)
        } 
        return data
    });    
}

// -------------------------------------------------------------------------

