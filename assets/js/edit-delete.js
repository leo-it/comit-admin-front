import {
    searchFilters
} from './search.js'
import {
    getMovies
} from "./requestPeliculas.js"
import {
    postAdmin
} from "./fetchAdmin.js"


searchFilters(".card-filter", ".tarj");

const URI_DB = "http://localhost:8000/api"
//getMovies(URI_DB + "/movie", dibujarAdmin)
getMovies(URI_DB + "/movie", dibujarAdmin)
postAdmin()


//dibuja los trailers cargados y el modal
export function dibujarAdmin(movies) {
    let peliHtml = document.getElementById('editTrailer');
    peliHtml.innerHTML = "";
    for (let movie of movies.reverse()) {
        peliHtml.innerHTML +=
            `
            <div type="" style="border:1px white "  class="  tarj" data-bs-toggle="modal" data-bs-target="#modalPeli${movie._id}" >
            <div class="col  ">
             <div class="card lg-3 tarjeta ">
         <img src="${movie.img}" class="card-img-top" alt="...">
         <div class="card-body">
           <p class="text-dark" style="font-size: 15px">${movie.title}</p>
           <p  class="card-text"style="display: none" id="genero">Genero: ${movie.gender} </p>
          </div> 

       </div>
   </div>
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="${movie._id}-btn-editar" data-bs-target="#modal-${movie._id}">Editar
   </button>

   <button type="button" class="btn btn-danger botonDelete" id="${movie._id}-btn-eliminar">Eliminar</button>

   </div>
  
       </div>
       </div>



     
      <!-- Button trigger modal -->

      
      <!-- Modal -->
      <div class="modal fade" id="modal-${movie._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${movie.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                       
                <div class="container ">
                <h3 class="  pt-3 text-center ">Editar Trailer</h3>
                <form action="" class="logged-in row col-lg-12 align-items-center formularioPost">
                <div class="container-fluid mt-5 " id="htmlEdit">
                        <div class="mb-3 col-lg-12">
                    <label for="exampleFormControlInput1" class="form-label tre ">titulo</label>
                    <input type="text" name="title" class="form-control " id="${movie._id}-title-edit" value="${movie.title}" required>
                </div>
                <div class="mb-3 col-lg-12">
                    <label for="exampleFormControlInput1" class="form-label tre ">genero</label>
                    <input type="text" name="gender" class="form-control " id="${movie._id}-gender-edit" value="${movie.gender}" placeholder="" required>
                </div>
                <div class="mb-3 col-lg-12">
                <label for="exampleFormControlInput1" class="form-label tre ">Año</label>
                <input type="number" name="year" class="form-control " id="${movie._id}-year-edit" value="${movie.year}" placeholder="" required>
            </div>
                <div class="mb-3 col-lg-12">
                    <label for="exampleFormControlInput1" class="form-label tre ">descripcion</label>

                    <textarea class="form-control" name="description" id="${movie._id}-description-edit" value="" rows="3" placeholder="" required>${movie.description}</textarea>
                </div>
                <div class="mb-3 col-lg-12">
                    <label for="exampleFormControlInput1" class="form-label tre ">url img</label>
                    <input type="text" name="img" class="form-control " value="${movie.img}" id="${movie._id}-img-edit" placeholder="" required>
                </div>
                <div class="mb-3 col-lg-12">
                    <label for="exampleFormControlInput1" class="form-label tre ">url video</label>
                    <input type="text" name="url" class="form-control " value="${movie.url}" id="${movie._id}-url-edit" placeholder="" required>
                

                </form>


            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" id="${movie._id}-guardar">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>



             `
    }
    //-------delete--------------
    movies.forEach(movie => {
        //console.log(movie._id);
        const boton = document.getElementById(movie._id + "-btn-eliminar");
        //console.log(boton);
        boton.addEventListener("click", function () {
            console.log(movie);
            fetch('http://localhost:8000/api/delete-movie/' + movie._id, {
                    method: 'DELETE',
                })
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))
                .then(res => {
                    Swal.fire({
                            title: "Se elimino correctamente",
                            icon: "success",
                            position: 'top'
                        })
                        .then(res => document.location.reload())
                })
        })
    })

    //---------update-----------------

    movies.forEach(movie => {
        const urlEdit = "http://localhost:8000/api/update-movie/"
        const title = document.getElementById(movie._id + "-title-edit")
        const gender = document.getElementById(movie._id + "-gender-edit")
        const year = document.getElementById(movie._id + "-year-edit")
        const description = document.getElementById(movie._id + "-description-edit")
        const img = document.getElementById(movie._id + "-img-edit")
        const url = document.getElementById(movie._id + "-url-edit")
        //console.log(movie._id);
        const boton = document.getElementById(movie._id + "-guardar");
        //console.log(boton);
        boton.addEventListener("click", function () { //captura el evento submit
            console.log(movie);

            console.log(movie._id);


            const newPut = {
                title: title.value,
                gender: gender.value,
                year: year.value,

                description: description.value,
                img: img.value,
                url: url.value
            }

            fetch(urlEdit + movie._id, {
                method: "PUT",
                body: JSON.stringify(newPut),
                headers: {
                    "content-type": "application/json"
                }
            })
        })
    })

}