document.addEventListener("DOMContentLoaded", function(){
        const cancelButtons = document.getElementsByClassName("cancel-button")
        const cancelForm = document.getElementById("cancel-form")
        const cancelledBookBtns = document.getElementsByClassName("run-False-btn")

        let cancelField = document.getElementById("cancel")
        for (let button of cancelButtons){
            button.addEventListener("click", () => {
                cancelField.value = button.id.substring(0,6)
                cancelForm.submit()
            })
        }
        for (let button of cancelledBookBtns){
            button.value = "Class Cancelled"
        }
})
