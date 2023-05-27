document.addEventListener("DOMContentLoaded", function(){
    // Declare const variables
    const timetableForm = document.getElementById("timetable-form");
    const checkoutBtn = document.getElementById("checkout-btn");
    const cart = document.getElementById("cart");
    const cancelField = document.getElementById("cancel-timetable");
    const addBoxes = document.getElementsByClassName("add-to-cart");
    const confirmBtn = document.getElementById("confirm-btn");
    const confirmed = document.getElementById("confirmed");
    const existBookings = document.getElementById("existing-bookings").children;
    const checkoutList = document.getElementById("checkout-list");
    const checkoutDismiss = document.getElementById("checkout-dismiss");
    const feedbackFlag = document.getElementById("feedback-div");
    const feedModalBtn = document.getElementById("feed-modal-btn");
    const feedModal = document.getElementById("timetable-feedback-modal");

    // Check if feedback message has been sent
    if (feedbackFlag.innerHTML != ""){
        feedModal.classList.remove("fade");
        // Show feedback modal
        feedModalBtn.click();
        feedModal.classList.add("fade");
    }

    // Create array of users existing bookings
    let existBookingsArr = [];
    for (let booking of existBookings){
        existBookingsArr.push(booking.innerHTML);
    }
    
    // For each input button determine the text that appears
    for (let box of addBoxes){
        if (box.value != "Class Cancelled"){
            if (existBookingsArr.includes(box.id)){
                // If user is already booked in set text to cancel
                box.value = "Booked in. Cancel?";
            } else {
                // Default text if user is not booked in
                box.value = "Add to Cart";
            }
        }
    }
    
    // Collate list of users selected classes for confirmation modal
    for (let box of addBoxes){
        box.addEventListener("click", () => {
            if (box.value === "Add to Cart"){
                // Get session data
                let location = box.parentNode.previousSibling.previousSibling;
                let activity = location.previousSibling.previousSibling.previousSibling.previousSibling;
                let time = activity.previousSibling.previousSibling.previousSibling.previousSibling;
                let date = document.getElementById(box.id.concat("-date-header"));
                // Create new row to add to confirmation modal
                let newRow = document.createElement("div");
                newRow.classList.add("row");
                newRow.classList.add("checkout-row");
                newRow.id = box.id.concat("-checkout");
                // Add session data to new row
                newRow.innerHTML = `
                <div class="col-3">${activity.children[0].innerHTML}</div>
                <div class="col-3">${date.innerHTML}</div>
                <div class="col-3">${time.innerHTML}</div>
                <div class="col-3">${location.innerHTML}</div>
                <div class="col-12">
                <input class="remove-from-cart" type="button" id="${box.id}-remove" value="Remove from Cart">
                </div>
                ` ;
                // Add new row to confirmation modal
                checkoutList.appendChild(newRow);
                // Feed session id into form input to communicate with python
                let oldCart=cart.value;
                cart.value = oldCart.concat(" ").concat(box.id);
                // Change button text
                box.value = "Remove from Cart";
            } else if (box.value === "Remove from Cart"){
                // Let user click to remove session from cart
                let removeRow = document.getElementById(box.id.concat("-checkout"));
                removeRow.remove();
                // Remove id from from input list
                let cartIds = cart.value.split(" ");
                let index=cartIds.indexOf(box.id);
                cartIds.splice(index,1);
                cart.value = cartIds.join(" ");
                // Set button text back to default
                box.value = "Add to Cart";
            } else if (box.value === "Booked in. Cancel?"){
                // Let user cancel booking via timetable
                let cancelModalBtn = document.getElementById("cancel-modal-btn-".concat(box.id));
                cancelModalBtn.click();
                let yesButton = document.getElementById(box.id.concat("-yes"));
                yesButton.addEventListener("click", () => {
                    // Feed id into form input to communicate with python
                    cancelField.value = box.id;
                    confirmed.value = "";
                    // Submit the form to create users bookings
                    timetableForm.submit();
                });
            }
            // Count number of sessions in cart
            let count=0;
            for (let box of addBoxes){
                if (box.value === "Remove from Cart"){
                    count++;
                    break;
                }
            }
            // If count > 0 then allow user to click checkout button
            if (count > 0){
                checkoutBtn.disabled = false;
                checkoutBtn.classList.remove("btn-secondary");
                checkoutBtn.classList.add("btn-primary");
            } else {
                checkoutBtn.disabled = true;
                checkoutBtn.classList.remove("btn-primary");
                checkoutBtn.classList.add("btn-secondary");
            }
        });
    }

    
    // Allow user to remove class from checkout modal
    checkoutBtn.addEventListener("click", () => {
        let removeBoxes = document.getElementsByClassName("remove-from-cart");
        for (let box of removeBoxes){
            box.addEventListener("click", () => {
                // Get session id user would like to remove
                let sessionId = box.id.substring(0,6);
                // find the original button assocaited with session
                let origBtn = document.getElementById(sessionId);
                // Remove users booking from cart via the orginal button
                origBtn.click();
                if (checkoutList.children.length === 1){
                    // Dismiss the modal
                    checkoutDismiss.click();
                }
            });
        }
    });
    
    // Submit the form once user has confirmed via the checkout modal
    confirmBtn.addEventListener("click", function(){
        confirmed.value = "y";
        cancelField.value="";
        timetableForm.submit();
    });
});
