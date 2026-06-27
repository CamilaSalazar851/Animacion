const form = document.querySelector("#form-login");
let listUsers = []
form.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    const nombre = document.querySelector("#nombre");
    const password = document.querySelector("#password");

    let users = descargarUsuarios();

    for(let i =0;i<users.length;i++){

        if(nombre.value == users[i].nombre && password.value ==users[i].password){
            window.location.href = "inventario.html";
            sessionStorage.setItem("login","True");
            return;
        }

    }
    alert("Credenciales Incorrectas");
})

function descargarUsuarios(){
    return JSON.parse(localStorage.getItem("users"));
}

