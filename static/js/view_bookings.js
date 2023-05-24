document.addEventListener("DOMContentLoaded", function(){
    console.log("in the new folder")
        const cancelForm = document.getElementById("cancel-form")
        const cancelledBookBtns = document.getElementsByClassName("run-False-btn")
        const feedbackBtn = document.getElementById("members-feedback-btn")
        const feedbackModal = document.getElementById("members-feedback-modal")
        let yesButtons = document.getElementsByClassName("confirm-cancel")
        let cancelField = document.getElementById("cancel")
        let feedField = document.getElementById("members-feedback-div")
        const bookCount = document.getElementById("bookings-count").innerHTML
        const myBookings = document.getElementById("my-bookings")
        const membersArea = document.getElementById("members-area")
        const adsArea = document.getElementById("ads")

        //myBookings.style.height =  `${70*bookCount}px`
       // membersArea.style.height = `${70*bookCount+200+70*Math.max(4-bookCount)}px`

        for (let button of yesButtons){
            let sessionId = button.id.substring(0,6)
            button.addEventListener("click", () => {
                cancelField.value = sessionId
                cancelForm.submit()
            })
        }

        for (let button of cancelledBookBtns){
            button.value = "Class Cancelled"
        }

        if (feedField.innerHTML != ""){
            feedbackModal.classList.remove("fade")
            feedbackBtn.click()
            feedbackModal.classList.add("fade")
        }




})
