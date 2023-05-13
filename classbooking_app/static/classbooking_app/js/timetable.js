document.addEventListener("DOMContentLoaded", function(){
    // Declare const variables
    const currentDate = document.getElementById("select-date")
    const timetableForm = document.getElementById("timetable-form")
    const submitBtn = document.getElementById("submit-timetable-form")
    const checkoutBtn = document.getElementById("checkout-btn")
    const cart = document.getElementById("cart")
    const remove = document.getElementById("remove")
    const dateChange = document.getElementById("date-change")
    const addBoxes = document.getElementsByClassName("add-to-cart")
    const cancelledSessBtns = document.getElementsByClassName("run-False-btn")
    const dateHeaders = document.getElementsByClassName("date-header")
    
    let dateArr = []
    for (let header of dateHeaders){
        dateArr.push(header.id)
    }
    
    document.getElementById(dateArr[0]).classList.remove("invisible")
    for (let i=1;i<dateArr.length;i++){
        if (dateArr[i].substring(1,6) != dateArr[i-1].substring(1,6)){
            document.getElementById(dateArr[i]).classList.remove("invisible")
        }

    }

    for (let button of cancelledSessBtns){
        button.value = "Class Cancelled"
    }

    let confBookings = document.getElementById("confirmed-bookings").children
    let confBookingsArr = []
    for (let booking of confBookings){
        confBookingsArr.push(booking.innerHTML)
    }
    console.log(confBookingsArr)

    let unconfBookings = document.getElementById("unconfirmed-bookings").children
    let unconfBookingsArr = []
    for (let booking of unconfBookings){
        unconfBookingsArr.push(booking.innerHTML)
    }
    console.log(unconfBookingsArr)
    // Add event listener on date input to convert date into serial number
    currentDate.addEventListener("change", () => {
        dateChange.value = "y"
        form.submit()
    })


    for (let box of addBoxes){
        if (box.value != "Class Cancelled"){
            if (unconfBookingsArr.includes(box.id)){
                box.value = "Remove from Cart"
            } else if (confBookingsArr.includes(box.id)){ 
                box.value = "Booked in. Cancel?"
            } else {
                box.value = "Add to Cart"
            }
        }
    }
    
    let checkoutList = document.getElementById("checkout-list")
    for (let box of addBoxes){
        box.addEventListener("click", () => {
            if (box.value === "Add to Cart"){
                let location = box.parentNode.previousSibling.previousSibling
                let activity = location.previousSibling.previousSibling.previousSibling.previousSibling
                let time = activity.previousSibling.previousSibling.previousSibling.previousSibling
                let date = document.getElementById(box.id.concat("-date-header"))

                let newRow = document.createElement("div")
                newRow.classList.add("row")
                newRow.innerHTML = `
                <div class="col">${activity.children[0].innerHTML}</div>
                <div class="col">${date.innerHTML}</div>
                <div class="col">${time.innerHTML}</div>
                <div class="col">${location.innerHTML}</div>
                ` 
                checkoutList.appendChild(newRow)
            } 
        })
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    let timetableModalTitle = document.getElementById("timetable-modal-title")
    let confirmBtn = document.getElementById("confirm-btn")
    confirmBtn.addEventListener("click", async function(){
        timetableModalTitle.innerHTML = "Thanks for confirming, your classes have been booked."
        await delay(2000)
        timetableForm.submit()
    })
    // Add event listener to each add to cart button
    /*
    for (let box of addBoxes){
        if (box.value != "Class Cancelled"){
            if (unconfBookingsArr.includes(box.id)){
                box.value = "Remove from Cart"
            } else if (confBookingsArr.includes(box.id)){ 
                box.value = "Booked in. Cancel?"
            } else {
                box.value = "Add to Cart"
            }
            box.addEventListener("click", () => {
                    if (confBookingsArr.includes(box.id) || unconfBookingsArr.includes(box.id)){
                        remove.value = box.id
                    } else {
                        cart.value = box.id
                    }
                    // Submit form
                    form.submit()
            })
        }
    }
    */

    let formReady = document.getElementById("form-ready")
    checkoutBtn.addEventListener("click", () => {
        formReady.value="y"
        //timetableForm.submit()
    })
})
