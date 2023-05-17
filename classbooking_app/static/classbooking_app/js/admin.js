document.addEventListener("DOMContentLoaded", function(){
    const filters = document.getElementsByClassName("filter")
    const sessionForm = document.getElementById("session-form")

    for (let filter of filters){
        filter.addEventListener("change", () => {
            sessionForm.submit()
        })
    }



})