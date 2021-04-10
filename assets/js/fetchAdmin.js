export function postAdmin() {
    const buttomPost = document.getElementById("botonAdmin");
    const urlDBPost = "http://localhost:8000/api/post-movie"
    const title = document.getElementById("title-admin")
    const description = document.getElementById("description-admin")

    const gender = document.getElementById("gender-admin")
    const year = document.getElementById("year-admin")
    const img = document.getElementById("img-admin")
    const urlAdmin = document.getElementById("url-admin")


    buttomPost.addEventListener('click', () => {
        const newPost = {
            title: title.value,
            gender: gender.value,
            description: description.value,
            img: img.value,
            url: urlAdmin.value,
            year: year.value,


        }

        fetch(urlDBPost, {
            method: "post",
            body: JSON.stringify(newPost),
            headers: {
                "content-type": "application/json"
            }
        })
    })
}