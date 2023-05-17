document.addEventListener("DOMContentLoaded", function(){
    const filters = document.getElementsByClassName("filter")
    const sessionForm = document.getElementById("session-form")
    const addSession = document.getElementById("add-session")
    const sessionCont = document.getElementById("session-cont")
    let containerLength = sessionCont.children.length
    const locationList = document.getElementById("location-list").children
    const activityList = document.getElementById("activity-list").children
    const filterIcons = document.getElementsByClassName("filter-icon")
    const locationFilterIcon = document.getElementById("location-filter-icon")
    const locationFilter = document.getElementById("location-filter")
    const updateBtns = document.getElementsByClassName("update-btn")
    const deleteBtns = document.getElementsByClassName("delete-btn")
    const updateField = document.getElementById("update-field")
    const updFeedField = document.getElementById("update-feedback-field")
    const deleteField = document.getElementById("delete-field")
    const feedbackModal = document.getElementById("feedback-modal")
    const feedbackModalBtn = document.getElementById("feedback-modal-btn")
    const feedbackModalTitle = document.getElementById("feedback-modal-title")

    if (updFeedField.value === "y"){
        feedbackModal.classList.remove("fade")
        feedbackModalTitle.innerHTML = "Thanks for confirming, your changes have been saved."
        feedbackModalBtn.click()
        feedbackModal.classList.add("fade")
        updFeedField.value = ""
    }

    for (let icon of filterIcons){
        icon.addEventListener("click", () => {
            filterId = icon.id.substring(0,10)
            let filter = document.getElementById(filterId)
            if (filterId === "dat-filter"){
                filter.value = ""
            } else {
                filter.value= "All"
            }
            sessionForm.submit()
        })
    }

    for (let filter of filters){
        filter.addEventListener("change", () => {
            sessionForm.submit()
        })
    }

    addSession.addEventListener("click", () => {
        let newRow = document.createElement("div")
        newRow.classList.add("row")
        newRow.innerHTML=`
        <div class="col-lg-2">
        <select id="${containerLength}-activity"></select>
        </div>
        <div class="col-lg-1">
        <input type="date" id="${containerLength}-date" name="${containerLength}-date">
        </div>
        <div class="col-lg-1">
        <input type="time" id="${containerLength}-time" name="${containerLength}-time">
        </div>
        <div class="col-lg-2">
        <select id="${containerLength}-location"></select>       
        </div>
        <div class="col-lg-1">
        <input type="number" id="${containerLength}-spaces" name="${containerLength}-spaces" min="0" max="25" step="1">
        </div>
        <div class="col-lg-1">
        <input type="checkbox" id="${containerLength}-running" name="${containerLength}-running" checked>
        </div>
        <div class="col-lg-2">
        <button type="button" id="${containerLength}-update" name="${containerLength}-remove">Save Session</button>
        </div>
        <div class="col-lg-2">
        <button type="button" id="${containerLength}-remove" name="${containerLength}-remove">Delete Session</button>
        </div>
        `
        sessionCont.appendChild(newRow)

        activitySelect = document.getElementById(`${containerLength}-activity`)
        for (let act of activityList){
            let newOption = document.createElement("option")
            newOption.value = act.innerHTML
            newOption.innerHTML = act.innerHTML
            activitySelect.appendChild(newOption)
        }

        locationSelect = document.getElementById(`${containerLength}-location`)
        for (let loc of locationList){
            let newOption = document.createElement("option")
            newOption.value = loc.innerHTML
            newOption.innerHTML = loc.innerHTML
            locationSelect.appendChild(newOption)
        }        

        containerLength = sessionCont.children.length

    })

    for (let btn of updateBtns){
        btn.addEventListener("click", () => {
            sessionId = btn.id.substring(0,6)
            updateField.value = sessionId
            updFeedField.value = "y"
            sessionForm.submit()
        })
    }


})