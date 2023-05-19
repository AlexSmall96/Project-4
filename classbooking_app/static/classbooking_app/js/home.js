document.addEventListener("DOMContentLoaded", function(){
const readMore = document.getElementsByClassName("read-more")
for (let link of readMore){
    link.addEventListener("click", () => {
        link.classList.add("invisible")

    })
}
})