document.addEventListener("DOMContentLoaded", function(){
        const cancelButtons = document.getElementsByClassName("cancel-button")
        const cancelForm = document.getElementById("cancel-form")
        const cancelledBookBtns = document.getElementsByClassName("run-False-btn")
       
        let yesButtons = document.getElementsByClassName("confirm-cancel")
        let cancelField = document.getElementById("cancel")

        for (let button of yesButtons){
            let modalId = "modal-".concat(button.id.substring(0,6))
            let modal = document.getElementById(modalId)
            let modalHeaderId = "modal-header-".concat(button.id.substring(0,6))
            let noButton = document.getElementById(button.id.substring(0,6).concat("-no"))
            let modalHeader = document.getElementById(modalHeaderId)
            button.addEventListener("click", () => {
                button.style.display="none"
                modalHeader.innerHTML = "Thanks for confirming, your booking has been cancelled."
                noButton.innerHTML = "Return to Bookings."
                noButton.addEventListener("click", () => {
                    cancelField.value = button.id.substring(0,6)
                    cancelForm.submit()
                })

            })

        }

        for (let button of cancelledBookBtns){
            button.value = "Class Cancelled"
        }


})
