export function searchFilters(input, selector) {
    document.addEventListener("keyup", (e) => {
        console.log("holaaa");
        if (e.target.matches(input)) {
            console.log(e.target.value);
            document.querySelectorAll(selector).forEach(el =>
                el.textContent.toLowerCase().includes(e.target.value) ?
                el.classList.remove("filter") :
                el.classList.add("filter")
            );
        }
    })
}
