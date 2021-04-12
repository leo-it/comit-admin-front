import {postAdmin} from './fetchAdmin.js'

let inputTitulo = document.getElementById("title-admin");
const tituloCard = document.getElementById('titulo-card')
let inputImg = document.getElementById("img-admin");
let imagen = document.getElementById('imgCard')
postAdmin()

//renderiza lo que escribo en la card
inputTitulo.addEventListener('keyup', (e) => {
    let valorInput = e.target.value
    inputTitulo = valorInput
        //elimina el ultimo espaciiado
        .trim();
    tituloCard.textContent = valorInput
})


inputImg.addEventListener('keyup', (e) => {
    let valorInput2 = e.target.value
    inputTitulo = valorInput2
        //elimina el ultimo espaciiado
        .trim();
    //imgCard.textContent = valorInput2
    //const imagen = document.createElement('img')

    imagen.src = valorInput2
})


/* boton cancelar */
const btnCancel = document.getElementById("botonAdminCancel")
btnCancel.addEventListener("click", () => {
    window.location.reload()
})