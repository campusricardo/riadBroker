const url = 'http://localhost:7777/api/login';

const authUser = async () => {

    const data = {
        username: username.value,
        password: password.value
    }

    const fet = await fetch(url,{
        method: "POST",
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
    });
    const dataUser = await fet.json();
    const {token} = dataUser;
    localStorage.setItem("token", token);
    window.location.href = './dashboard.html';
}