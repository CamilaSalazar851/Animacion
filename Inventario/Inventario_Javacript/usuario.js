const API_URL = "https://stock-flow-354d0-default-rtdb.firebaseio.com";
const formUsuario = document.getElementById("usuario-from");

let listaUsuarios = [];
let IdUsuarioUpdate = null;

document.addEventListener("DOMContentLoaded", () => {
  let login = sessionStorage.getItem("login");

  

  cargarUsuario();
});

formUsuario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre");
  const usuario = document.getElementById("usuario");
  const rolUsuario = document.getElementById("rolUsuario");

  let nuevoUsuario = {
    nombre: nombre.value,
    nombreUsuario: usuario.value,
    rolUsuario: rolUsuario.value,
  };

  if(IdUsuarioUpdate == null){
    await guardarBD(nuevoUsuario);
  }else{
    await actualizarBD(nuevoUsuario);
  }
  

  limpiarForm();

  await cargarUsuario();
  IdUsuarioUpdate = null;
});

async function cargarUsuario() {
  const tabla = document.getElementById("tablaUsuarios");

  let usuarios = await descargarBD();

  if (usuarios == null) {
    tabla.innerHTML = "";
    return;
  }

  let html = "";

  for (let i = 0; i < usuarios.length; i++) {
    html += `

        <tr>

            <td>${i + 1}</td>

            <td>${usuarios[i].nombre}</td>

            <td>${usuarios[i].nombreUsuario}</td>

            <td>${usuarios[i].rolUsuario}</td>

            <td>

                <button class="btn-editar" onclick="editar('${usuarios[i].nombreUsuario}')">
                    Editar
                </button>

                <button class="btn-eliminar" onclick="eliminarBD('${usuarios[i].nombreUsuario}')">
                    Eliminar
                </button>

            </td>

        </tr>

        `;
  }

  tabla.innerHTML = html;
}

async function guardarBD(user){
 await fetch(`${API_URL}/user/${user.nombreUsuario}.json`,{
      method: "PUT",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
  })

}

async function actualizarBD(user){
  const response = await fetch(`${API_URL}/user/${user.nombreUsuario}.json`,{
      method: "PUT",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
  })

  await fetch(`${API_URL}/user/${IdUsuarioUpdate}.json`,{
    method: "DELETE",
    headers:{
        "Content-Type":"application/json"
    }
})


}

async function descargarBD(){
  
  const response = await fetch(`${API_URL}/user.json`,{
      method: "GET",
     
  })

  const data =  await response.json();

  return Object.entries(data).map(([key, value]) => ({ id: key, ...value }));

}

async function eliminarBD(nombreUsuario){
  const response = await fetch(`${API_URL}/user/${nombreUsuario}.json`,{
      method: "DELETE",
      headers:{
          "Content-Type":"application/json"
      }
  })
  await cargarUsuario();
}



async function editar(nombreUsuario) {
  let usuarios = await descargarBD();
  console.log( usuarios)
  
  for(let i =0;i<usuarios.length;i++){
    if(usuarios[i].nombreUsuario == nombreUsuario){
      document.getElementById("nombre").value = usuarios[i].nombre;

      document.getElementById("usuario").value = usuarios[i].nombreUsuario;

      document.getElementById("rolUsuario").value = usuarios[i].rolUsuario;

      IdUsuarioUpdate = usuarios[i].id;
    }
    
  }
  
}

function limpiarForm() {
  document.getElementById("nombre").value = "";

  document.getElementById("usuario").value = "";

  document.getElementById("rolUsuario").selectedIndex = 0;
}
