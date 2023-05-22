document.addEventListener("DOMContentLoaded", function(){
        const cancelButtons = document.getElementsByClassName("cancel-button")
        const cancelForm = document.getElementById("cancel-form")
        const cancelledBookBtns = document.getElementsByClassName("run-False-btn")
        const confirmModal = document.getElementById("confirm-modal")
        const confirmModalBtn = document.getElementById("confirm-modal-btn")
        const feedbackBtn = document.getElementById("members-feedback-btn")
        const feedbackModal = document.getElementById("members-feedback-modal")
        let yesButtons = document.getElementsByClassName("confirm-cancel")
        let cancelField = document.getElementById("cancel")
        let feedField = document.getElementById("members-feedback-div")

        for (let button of yesButtons){
            let sessionId = button.id.substring(0,6)
            let modalId = "modal-".concat(sessionId)
            let modal = document.getElementById(modalId)
            let modalHeaderId = "modal-header-".concat(sessionId)
            let modalHeader = document.getElementById(modalHeaderId)
            let noButton = document.getElementById(sessionId.concat("-no"))
            button.addEventListener("click", async function(){
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
