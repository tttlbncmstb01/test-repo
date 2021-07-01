export function uploadMedia(image, token) {
    return new Promise(async (resolve, reject) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        // var zxc = base64_encode('tttlbncmstb:tttlbncmstb');
        // myHeaders.append("Authorization", `Basic ${zxc}`);
        myHeaders.append("Content-Type", "multipart/form-data;");

        const uriParts = image.uri.split('/');
        const fileName = uriParts[uriParts.length - 1];

        const furi = image.uri.split('.');
        const fileType = uriParts[furi.length - 1];
        // console.log(fileName);
        // const rand = Math.round(Math.random() * 12345 * Math.random());

        // const fileName = `image-${image.modificationDate}-${image.size}-${rand}.${fileType}`;

        let formdata = new FormData();
        formdata.append(
            'file',
            {
                uri: image.uri,
                name: fileName,
                type: `image/${fileType}`,
            }
        );
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://moigioi.hoieothon.com/wp-json/wp/v2/media", requestOptions)
            .then(response => response.text())
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};