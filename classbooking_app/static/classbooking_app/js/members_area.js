document.addEventListener("DOMContentLoaded", function(){
    const cancelForm = document.getElementById("cancel-form")
    const feedbackBtn = document.getElementById("members-feedback-btn")
    const feedbackModal = document.getElementById("members-feedback-modal")
    const yesButtons = document.getElementsByClassName("confirm-cancel")
    const cancelField = document.getElementById("cancel")
    const feedField = document.getElementById("members-feedback-div")
    
    // Loop through each yes button on confirmation modals
    for (let button of yesButtons){
        // Get session id associated with button
        let sessionId = button.id.substring(0,6)
        // If confirmation button is clicked, process cancellation
        button.addEventListener("click", () => {
        // Feed session id into form input
        cancelField.value = sessionId
        // Submit form to cancel session
        cancelForm.submit()
        })
    }
    
    // When page loads, check if feedback message has been sent
    if (feedField.innerHTML != ""){
        // Display feedback modal
        feedbackModal.classList.remove("fade")
        feedbackBtn.click()
        feedbackModal.classList.add("fade")
    }
})
