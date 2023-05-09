document.addEventListener("DOMContentLoaded", function(){
    // Change for deployment
    baseURL = 'https://8000-alexsmall96-project4-z4wrtww3ucz.ws-eu96b.gitpod.io'
    if(window.location.href === baseURL.concat('/make_booking.html')){
    
    // Declare const variables
    const currentDate = document.getElementById("select-date")
    const formCompleted = document.getElementById("form-complete")
    const form = document.getElementById("date-form")
    const cart = document.getElementById("cart")
    const remove = document.getElementById("remove")
    const addBoxes = document.getElementsByClassName("add-to-cart")
    const removeBoxes = document.getElementsByClassName("remove-from-cart")
    const checkoutButton = document.getElementById("checkout-button")
    const timetable = document.getElementById("timetable")
    const confirmBookings = document.getElementById("confirm-bookings")
    const finalisedBox = document.getElementById("finalised")
    const checkoutLoaded = document.getElementById("checkout-loaded")

    let userBookings = document.getElementById("users-bookings").children
    let userBookingsArr = []

    for (let booking of userBookings){
        userBookingsArr.push(booking.innerHTML)
    }

    if (checkoutLoaded.value === "y"){
        timetable.style.display="none"
        confirmBookings.style.display = "block"       
    } 

    let checkoutList = document.getElementById("checkout-list").children
    let selectedBookings = []
        for (let row of checkoutList){
            selectedBookings.push(row.id.substring(0,6))
        }
    
    // Add event listener on date input to convert date into serial number
    currentDate.addEventListener("change", () => {
        form.submit()
    })

    // Add event listener to each add to cart button
    for (let box of addBoxes){
        if (selectedBookings.includes(box.id)){
            box.value = "Remove from Cart"
        } else if (userBookingsArr.includes(box.id)){ 
            box.value = "Booked in. Cancel?"
        } else {
            box.value = "Add to Cart"
        }
        box.addEventListener("click", () => {
            if (selectedBookings.includes(box.id) || userBookingsArr.includes(box.id)){
                remove.value = box.id
            } else {
                cart.value = box.id
            }
            // Submit form
            form.submit()
        })
    }

    for (let box of removeBoxes){
        box.addEventListener("click", () => {
            remove.value = box.id.substring(0,6)
            finalisedBox.value = ""
            checkoutLoaded.value = "y"
            form.submit()
        })
    }

    // Add event listener to checkout button
    checkoutButton.addEventListener("click", () => {
        // Hide timetable
        timetable.style.display="none"
        confirmBookings.style.display = "block"
        finalisedBox.value = "y"
        checkoutLoaded.value = "y"
    })
    }
})
