export default (loginData) => {
    return fetch(`http://localhost:5000/user/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    }).then(response => {
        return response.json().then(res => res)
    }).then(res => {
        console.log(res);
        return res;
    }).catch(err => {
        console.log(err);
        return err;
    });
}