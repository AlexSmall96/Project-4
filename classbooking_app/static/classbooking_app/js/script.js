document.addEventListener("DOMContentLoaded", function(){
    baseURL = 'https://8000-alexsmall96-project4-z4wrtww3ucz.ws-eu95.gitpod.io'
    if(window.location.href === baseURL.concat('/make_booking.html')){
    // Get date chosen from form
    let currentDate = document.getElementById("select-date")
    let formCompleted = document.getElementById("form-complete")
    let form = document.getElementById("date-form")
    // Add event listener on date form to convert date into serial number
    currentDate.addEventListener("change", function(){
        let date = new Date(this.value);
        let serialDate = Math.floor(date.getTime()/(1000*60*60*24))+25569;
        // Convert serial number into string and add class number (1 for boxfit)
        let serialStr = serialDate.toString();
        let session_id = Number("1".concat(serialStr));
        form.submit()
    })
    // Add event listener to each checkbox
    let addBoxes = document.getElementsByClassName("add-to-cart")
    let cart = document.getElementById("cart")
    for (let box of addBoxes){
        box.addEventListener("change", function(){
            oldCart = cart.value
            if (this.checked){
                // Display session id in cart
                cart.value = oldCart.concat(box.id).concat(" ")
            }
        })
    }
    let checkoutButton = document.getElementById("checkout-button")
    checkoutButton.addEventListener("click", function(){
        form.submit()
        console.log("submitted")
    })
    }
})
