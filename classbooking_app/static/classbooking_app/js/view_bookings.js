document.addEventListener("DOMContentLoaded", function(){
        const cancelButtons = document.getElementsByClassName("cancel-button")
        const cancelForm = document.getElementById("cancel-form")
        const cancelledBookBtns = document.getElementsByClassName("run-False-btn")
        const confirmModal = document.getElementById("confirm-modal")
        const confirmModalBtn = document.getElementById("confirm-modal-btn")
        let yesButtons = document.getElementsByClassName("confirm-cancel")
        let cancelField = document.getElementById("cancel")

        if (cancelField.value != ""){
            confirmModal.classList.remove("fade")
            confirmModalBtn.click()
            confirmModal.classList.add("fade")
            cancelField.value = ""
        }

        //const delay = ms => new Promise(res => setTimeout(res, ms));

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


})
