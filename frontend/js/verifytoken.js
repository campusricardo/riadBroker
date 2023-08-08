const urlVerify = 'http://localhost:7777/api/verify';

const verify = async() => {
    try {
        const fet = await fetch(urlVerify,{
            method: "POST",
            headers:{'Content-Type':'application/json',
            'x-api-token-jwt': localStorage.getItem("token")
        }
    
        });

        const result = await fet.json();
        console.log(result['message']);
        if (result['message'] === 'log'){

        } else {
            alert('No estas logueado porfavor inicia sesion');
            window.location.href = './login.html';
        }
    } catch (error) {
        console.log(error);
        alert('No estas logueado porfavor inicia sesion');
        window.location.href = './login.html';

    }
    
}

document.addEventListener("DOMContentLoaded", verify);

const removeToken = () => {
    alert('a');
    localStorage.removeItem("token");

}