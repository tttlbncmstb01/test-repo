export function getBearerToken() {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let json = JSON.stringify({"username":"tttlbncmstb","password":"tttlbncmstb"});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: json,
            redirect: 'follow'
        };
        fetch("https://moigioi.hoieothon.com/wp-json/api-bearer-auth/v1/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    })
}