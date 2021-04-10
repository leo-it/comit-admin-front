export function peli(url) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let movies = JSON.parse(this.responseText).movie;
            console.log("funcion api peli funcionando");
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
peli("http://localhost:8000/api/movie");