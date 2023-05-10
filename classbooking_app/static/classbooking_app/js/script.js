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
    const cancelledSessBtns = document.getElementsByClassName("run-False-btn")

    for (let button of cancelledSessBtns){
        button.value = "Class Cancelled"
    }

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
        if (box.value != "Class Cancelled"){
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

    if(window.location.href === baseURL.concat('/view_bookings.html')){
        const cancelButtons = document.getElementsByClassName("cancel-button")
        const cancelForm = document.getElementById("cancel-form")
        const cancelledBookBtns = document.getElementsByClassName("run-False-btn")

        let cancelField = document.getElementById("cancel")
        for (let button of cancelButtons){
            button.addEventListener("click", () => {
                cancelField.value = button.id.substring(0,6)
                cancelForm.submit()
            })
        }
        for (let button of cancelledBookBtns){
            button.value = "Class Cancelled"
        }
    }


})
