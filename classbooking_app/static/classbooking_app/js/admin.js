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
    const createBtnModal = document.getElementById("create-btn-modal")
    const updateField = document.getElementById("update-field")
    const createField = document.getElementById("create-field")
    const updFeedField = document.getElementById("update-feedback-field")
    const delFeedField = document.getElementById("delete-feedback-field")
    const createFeedField = document.getElementById("create-feedback-field")
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
    
    if (delFeedField.value === "y"){
        feedbackModal.classList.remove("fade")
        feedbackModalTitle.innerHTML = "Thanks for confirming, the session has been deleted."
        feedbackModalBtn.click()
        feedbackModal.classList.add("fade")
        delFeedField.value = ""        
    }

    if (createFeedField.value === "y"){
        feedbackModal.classList.remove("fade")
        feedbackModalTitle.innerHTML = "Thanks for confirming, the session has been created."
        feedbackModalBtn.click()
        feedbackModal.classList.add("fade")
        createFeedField.value = ""        
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
        let maxId = document.getElementById("max-id")
        let sessionId = Number(maxId.innerHTML) + 1
        let newRow = document.createElement("div")
        newRow.classList.add("row")
        newRow.id = `${sessionId}-row`
        newRow.innerHTML=`
        <div class="col-lg-2">
        <select id="${sessionId}-activity" name="${sessionId}-activity"></select>
        </div>
        <div class="col-lg-1">
        <input type="date" id="${sessionId}-date" name="${sessionId}-date">
        </div>
        <div class="col-lg-1">
        <input type="time" id="${sessionId}-time" name="${sessionId}-time">
        </div>
        <div class="col-lg-2">
        <select id="${sessionId}-location" name="${sessionId}-location"></select>       
        </div>
        <div class="col-lg-1">
        <input type="number" id="${sessionId}-spaces" name="${sessionId}-spaces" min="0" max="25" step="1">
        </div>
        <div class="col-lg-1">
        <input type="checkbox" id="${sessionId}-running" name="${sessionId}-running" checked>
        </div>
        <div class="col-lg-2">
        <button class="create-btn" type="button" id="${sessionId}-create" name="${sessionId}-create" data-toggle="modal" data-target="#confirm-create-modal">Create Session</button>
        </div>
        <div class="col-lg-2">
        <button type="button" class="discard-btn" id="${sessionId}-discard" name="${sessionId}-discard">Discard</button>
        </div>
        `
        
        sessionCont.appendChild(newRow)
        activitySelect = document.getElementById(`${sessionId}-activity`)
        for (let act of activityList){
            let newOption = document.createElement("option")
            newOption.value = act.innerHTML
            newOption.innerHTML = act.innerHTML
            activitySelect.appendChild(newOption)
        }

        locationSelect = document.getElementById(`${sessionId}-location`)
        for (let loc of locationList){
            let newOption = document.createElement("option")
            newOption.value = loc.innerHTML
            newOption.innerHTML = loc.innerHTML
            locationSelect.appendChild(newOption)
        }


        let createBtns = document.getElementsByClassName("create-btn")
        for (let btn of createBtns){
            btn.addEventListener("click", () => {
                createField.value = sessionId
                createBtnModal.addEventListener("click", () => {
                    sessionForm.submit()
                })
            })
        }

        let discardBtns = document.getElementsByClassName("discard-btn")
        for (let btn of discardBtns){
            btn.addEventListener("click", () => {
                document.getElementById(`${sessionId}-row`).remove()
            })
        }

        maxId.innerHTML = sessionId

    })

    for (let btn of updateBtns){
        btn.addEventListener("click", () => {
            sessionId = btn.id.substring(0,6)
            updateField.value = sessionId
            sessionForm.submit()
        })
    }

    for (let btn of deleteBtns){
        btn.addEventListener("click", () => {
            console.log("clicked")
            sessionId = btn.id.substring(0,6)
            deleteField.value = sessionId
            sessionForm.submit()
        })
    }
    
})