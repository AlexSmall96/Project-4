document.addEventListener("DOMContentLoaded", function(){
    // Declare const variables
    const currentDate = document.getElementById("select-date")
    const timetableForm = document.getElementById("timetable-form")
    const submitBtn = document.getElementById("submit-timetable-form")
    const checkoutBtn = document.getElementById("checkout-btn")
    const cart = document.getElementById("cart")
    const cancelField = document.getElementById("cancel-timetable")
    const dateChange = document.getElementById("date-change")
    const addBoxes = document.getElementsByClassName("add-to-cart")
    const removeBoxes = document.getElementsByClassName("remove-from-cart")
    const dateHeaders = document.getElementsByClassName("date-header")
    const timetableModalTitle = document.getElementById("timetable-modal-title")
    const timetableModal = document.getElementById("timetable-modal")
    const confirmModal = document.getElementById("confirm-modal")
    const confirmModalTitle = document.getElementById("confirm-modal-title")
    const confirmModalBtn = document.getElementById("confirm-modal-btn")
    const confirmBtn = document.getElementById("confirm-btn")
    const confirmed = document.getElementById("confirmed")
    const existBookings = document.getElementById("existing-bookings").children
    const checkoutList = document.getElementById("checkout-list")
    const confirmCheckList = document.getElementById("confirm-checkout-list")
    const checkoutDismiss = document.getElementById("checkout-dismiss")

    let existBookingsArr = []
    for (let booking of existBookings){
        existBookingsArr.push(booking.innerHTML)
    }

    for (let box of addBoxes){
        if (box.value != "Class Cancelled"){
            if (existBookingsArr.includes(box.id)){
                box.value = "Booked in. Cancel?"
            } else {
                box.value = "Add to Cart"
            }
        }
    }
    
    for (let box of addBoxes){
        box.addEventListener("click", () => {
            if (box.value === "Add to Cart"){
                let location = box.parentNode.previousSibling.previousSibling
                let activity = location.previousSibling.previousSibling.previousSibling.previousSibling
                let time = activity.previousSibling.previousSibling.previousSibling.previousSibling
                let date = document.getElementById(box.id.concat("-date-header"))

                let newRow = document.createElement("div")
                newRow.classList.add("row")
                newRow.id = box.id.concat("-checkout")
                newRow.innerHTML = `
                <div class="col">${activity.children[0].innerHTML}</div>
                <div class="col">${date.innerHTML}</div>
                <div class="col">${time.innerHTML}</div>
                <div class="col">${location.innerHTML}</div>
                <div class="col">
                <input class="remove-from-cart" type="button" id="${box.id}-remove" value="Remove from Cart">
                </div>
                ` 
                checkoutList.appendChild(newRow)
                oldCart=cart.value
                cart.value = oldCart.concat(" ").concat(box.id)
                box.value = "Remove from Cart"
            } else if (box.value === "Remove from Cart"){
                let removeRow = document.getElementById(box.id.concat("-checkout"))
                removeRow.remove()
                let cartIds = cart.value.split(" ")
                let index=cartIds.indexOf(box.id)
                cartIds.splice(index,1)
                cart.value = cartIds.join(" ")
                box.value = "Add to Cart"
            } else if (box.value === "Booked in. Cancel?"){
                let cancelModalBtn = document.getElementById("cancel-modal-btn-".concat(box.id))
                cancelModalBtn.click()
                let yesButton = document.getElementById(box.id.concat("-yes"))
                yesButton.addEventListener("click", () => {
                    cancelField.value = box.id
                    confirmed.value = ""
                    timetableForm.submit()
                })
            }
            let count=0
            for (let box of addBoxes){
                if (box.value === "Remove from Cart"){
                    count++
                    break
                }
            }
            if (count > 0){
                checkoutBtn.classList.remove("btn-secondary")
                checkoutBtn.classList.add("btn-primary")
            } else {
                checkoutBtn.classList.remove("btn-primary")
                checkoutBtn.classList.add("btn-secondary")
            }
        })
    }

    
    
    checkoutBtn.addEventListener("click", () => {
        let removeBoxes = document.getElementsByClassName("remove-from-cart")
        for (let box of removeBoxes){
            box.addEventListener("click", () => {
                sessionId = box.id.substring(0,6)
                origBtn = document.getElementById(sessionId)
                origBtn.click()
                if (checkoutList.children.length === 1){
                    checkoutDismiss.click()
                }
            })
        }
    })

    //const delay = ms => new Promise(res => setTimeout(res, ms));
    confirmBtn.addEventListener("click", function(){
        confirmed.value = "y"
        cancelField.value=""
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
