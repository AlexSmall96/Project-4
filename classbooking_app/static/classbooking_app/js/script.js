document.addEventListener("DOMContentLoaded", function(){
    // Change for deployment
    baseURL = 'https://8000-alexsmall96-project4-z4wrtww3ucz.ws-eu96b.gitpod.io'
    if(window.location.href === baseURL.concat('/make_booking.html')){
    // Get date chosen from form
    let currentDate = document.getElementById("select-date")
    let formCompleted = document.getElementById("form-complete")
    let form = document.getElementById("date-form")
    let cart = document.getElementById("cart")
    let cartData = {}
    let addBoxes = document.getElementsByClassName("add-to-cart")
    //for (let id of cartIds){
        //tickbox = document.getElementById(id)
        //console.log(id, tickbox)
    //}
    // Add event listener on date input to convert date into serial number
    currentDate.addEventListener("change", function(){
        let date = new Date(this.value);
        //let serialDate = Math.floor(date.getTime()/(1000*60*60*24))+25569;
        // Convert serial number into string and add class number (1 for boxfit)
        //let serialStr = serialDate.toString();
        //let session_id = Number("1".concat(serialStr));
        form.submit()
    })
    // Add event listener to each checkbox
    
    let checkoutList = document.getElementById("checkout-list")
    for (let box of addBoxes){
        box.addEventListener("change", function(){
            oldCart = cart.value
            if (this.checked){
                // Display session id in cart
                cart.value = oldCart.concat(box.id).concat(" ")
                let location = box.parentNode.previousSibling.previousSibling
                let activity = location.previousSibling.previousSibling.previousSibling.previousSibling
                let time = location.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling
                cartData[box.id] = [location.innerHTML, currentDate.value, activity.innerHTML, time.innerHTML]
                console.log(cartData)
            }
        })
    }
    let checkoutButton = document.getElementById("checkout-button")
    let timetable = document.getElementById("timetable")
    let confirmBookings = document.getElementById("confirm-bookings")
    let finalisedBox = document.getElementById("finalised")

    checkoutButton.addEventListener("click", () => {
        
        let cartIds = cart.value.split(" ")
        cartIds.pop()
        for (let i of cartIds){
            console.log(cartData[i])
             let newRow = document.createElement("div")
             newRow.classList.add("row")
             newRow.innerHTML = `
             <div class="col">${cartData[i][0]}</div>
             <div class="col">${cartData[i][1]}</div>
             <div class="col">${cartData[i][2]}</div>
             <div class="col">${cartData[i][3]}</div>                
             `
             checkoutList.appendChild(newRow)
        }
        timetable.style.display="none"
        confirmBookings.style.display = "block"
        finalisedBox.value = "y"

    })
    }
})
