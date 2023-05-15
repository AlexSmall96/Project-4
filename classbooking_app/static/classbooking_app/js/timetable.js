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
    const cancelledSessBtns = document.getElementsByClassName("run-False-btn")
    const dateHeaders = document.getElementsByClassName("date-header")
    const timetableModalTitle = document.getElementById("timetable-modal-title")
    const timetableModal = document.getElementById("timetable-modal")
    const confirmBtn = document.getElementById("confirm-btn")
    const confirmed = document.getElementById("confirmed")
    const existBookings = document.getElementById("existing-bookings").children
    const checkoutList = document.getElementById("checkout-list")
    const checkoutDismiss = document.getElementById("checkout-dismiss")

    if (cancelField.value != ""){
        sessionId = cancelField.value
        let cancelModal = document.getElementById("cancel-modal-".concat(sessionId))
        let cancelModalBtn = document.getElementById("cancel-modal-btn-".concat(sessionId))
        let cancelModalHead = document.getElementById("cancel-modal-header-".concat(sessionId))
        cancelModal.classList.remove("fade")
        cancelModalBtn.click()
        cancelModal.classList.add("fade")
        cancelField.value = ""
    }

    if (confirmed.value === "y"){
        timetableModal.classList.remove("fade")
        checkoutBtn.click()
        timetableModal.classList.add("fade")
        let cartIds = cart.value.split(" ")
        for (let sessionId of cartIds){
            if (sessionId != ""){
                box = document.getElementById(sessionId)
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
                ` 
                checkoutList.appendChild(newRow)
                timetableModalTitle.innerHTML = "Thanks for confirming, your classes have been booked."
                confirmBtn.innerHTML = "View all your Bookings"
            }
        }
        confirmed.value = ""
    }
    
    let dateArr = []
    for (let header of dateHeaders){
        dateArr.push(header.id)
    }
    
    // show date headings on timetable
    document.getElementById(dateArr[0]).classList.remove("invisible")
    for (let i=1;i<dateArr.length;i++){
        if (dateArr[i].substring(1,6) != dateArr[i-1].substring(1,6)){
            document.getElementById(dateArr[i]).classList.remove("invisible")
        }

    }

    for (let button of cancelledSessBtns){
        button.value = "Class Cancelled"
    }

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
                console.log(box.id)
                let yesButton = document.getElementById(box.id.concat("-yes"))
                yesButton.addEventListener("click", () => {
                    cancelField.value = box.id
                    timetableForm.submit()
                })
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
