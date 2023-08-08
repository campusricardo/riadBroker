
const url = "http://localhost:7777/api/user";

const postUser = async() => {
    try {
        const data = {
            username: username.value,
            email:  email.value,
            password: password.value
        }

        const fet = await fetch(url,{
            method: "POST",
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        });
        const dataUser = await fet.json();
        console.log(dataUser);
        window.location.href = './login.html'

    } catch (error) {
        console.log(error,"Cannot register an user please try again");
    }
}
