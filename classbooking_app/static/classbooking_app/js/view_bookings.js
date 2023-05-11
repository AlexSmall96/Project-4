document.addEventListener("DOMContentLoaded", function(){
        const cancelButtons = document.getElementsByClassName("cancel-button")
        const cancelForm = document.getElementById("cancel-form")
        const cancelledBookBtns = document.getElementsByClassName("run-False-btn")
       
        let yesButtons = document.getElementsByClassName("confirm-cancel")
        let cancelField = document.getElementById("cancel")

        const delay = ms => new Promise(res => setTimeout(res, ms));

        for (let button of yesButtons){
            let sessionId = button.id.substring(0,6)
            let modalId = "modal-".concat(sessionId)
            let modal = document.getElementById(modalId)
            let modalHeaderId = "modal-header-".concat(sessionId)
            let modalHeader = document.getElementById(modalHeaderId)
            let noButton = document.getElementById(sessionId.concat("-no"))
            button.addEventListener("click", async function(){
                button.style.display="none"
                modalHeader.innerHTML = "Thanks for confirming, your booking has been cancelled."
                noButton.innerHTML = "Return to Bookings."
                await delay(2000)
                cancelField.value = button.id.substring(0,6)
                cancelForm.submit()
                noButton.addEventListener("click", () => {
                })

            })

        }

        for (let button of cancelledBookBtns){
            button.value = "Class Cancelled"
        }


})
