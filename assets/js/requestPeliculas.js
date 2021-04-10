export function getMovies(url, callback) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let pelis = JSON.parse(this.responseText).movie;
            callback(pelis)
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function eliminar(id) {

}