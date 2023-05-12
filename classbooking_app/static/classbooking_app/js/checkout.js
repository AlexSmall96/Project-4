document.addEventListener("DOMContentLoaded", function(){
    // Declare const variables
    const form = document.getElementById("checkout-form")
    const remove = document.getElementById("remove")
    const removeBoxes = document.getElementsByClassName("remove-from-cart")
    const formReady = document.getElementById("form-ready")
    for (let box of removeBoxes){
        box.addEventListener("click", () => {
            remove.value = box.id.substring(0,6)
            formReady.value = ""
            form.submit()
        })
    }

    
})