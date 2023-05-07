document.addEventListener("DOMContentLoaded", function(){
    // Change for deployment
    baseURL = 'https://8000-alexsmall96-project4-z4wrtww3ucz.ws-eu96b.gitpod.io'
    if(window.location.href === baseURL.concat('/make_booking.html')){
    
    // Declare const variables
    const currentDate = document.getElementById("select-date")
    const formCompleted = document.getElementById("form-complete")
    const form = document.getElementById("date-form")
    const cart = document.getElementById("cart")
    const addBoxes = document.getElementsByClassName("add-to-cart")
    const checkoutButton = document.getElementById("checkout-button")
    const timetable = document.getElementById("timetable")
    const confirmBookings = document.getElementById("confirm-bookings")
    const finalisedBox = document.getElementById("finalised")

    // Add event listener on date input to convert date into serial number
    currentDate.addEventListener("change", function(){
        
        //let serialDate = Math.floor(date.getTime()/(1000*60*60*24))+25569;
        // Convert serial number into string and add class number (1 for boxfit)
        //let serialStr = serialDate.toString();
        //let session_id = Number("1".concat(serialStr));
        form.submit()
    })

    // Add event listener to each checkbox
    const checkoutList = document.getElementById("checkout-list")
    for (let box of addBoxes){
        box.addEventListener("change", function(){
            oldCart = cart.value
            if (this.checked){
                // Display session id in cart
                cart.value = oldCart.concat(box.id).concat(" ")
                let location = box.parentNode.previousSibling.previousSibling
                let activity = location.previousSibling.previousSibling.previousSibling.previousSibling
                let time = location.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling
                let newRow = document.createElement("div")
                let date = new Date(currentDate.value);
                newRow.classList.add("row")
                newRow.innerHTML = `
                <div class="col">${activity.firstChild.innerHTML}</div>
                <div class="col">${date.toLocaleDateString("en-US", {month:"long", day:"numeric",year:"numeric"})}</div>
                <div class="col">${time.innerHTML}</div>
                <div class="col">${location.children[1].innerHTML}</div>
                `
                checkoutList.appendChild(newRow)
            }
        })
    }

    // Add event listener to checkout button
    checkoutButton.addEventListener("click", () => {
        timetable.style.display="none"
        confirmBookings.style.display = "block"
        finalisedBox.value = "y"
    })
    }
})
