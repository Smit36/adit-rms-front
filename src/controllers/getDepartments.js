export default () => {
    return fetch(`http://localhost:5000/college/data`, {
        method: 'get'
    }).then(res => {
        return res.json().then(result => {
            return result;
        });
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err);
    })
}