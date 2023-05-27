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
    const locationFilter = document.getElementById("loc-filter")
    const updateBtns = document.getElementsByClassName("update-btn")
    const deleteBtns = document.getElementsByClassName("delete-btn")
    const createBtnModal = document.getElementById("create-btn-modal")
    const updateField = document.getElementById("update-field")
    const createField = document.getElementById("create-field")
    const deleteField = document.getElementById("delete-field")
    const feedback = document.getElementById("admin-feedback").innerHTML
    const feedbackModal = document.getElementById("feedback-modal")
    const feedbackModalBtn = document.getElementById("feedback-modal-btn")
    const feedbackModalTitle = document.getElementById("feedback-modal-title")
    const defaultDate = document.getElementById("default-date").innerHTML
 
    if (feedback != ""){
        feedbackModal.classList.remove("fade")
        feedbackModalBtn.click()
        feedbackModal.classList.add("fade")
        feedback.value = ""
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
        newRow.classList.add("new-session")
        newRow.id = `${sessionId}-row`
        newRow.innerHTML=`
        <div class="col-2 d-sm-none">
          <label class="sm-font" for="${sessionId}-activity">Name</label>
        </div>
          <div class="col-10 col-sm-2">
              <select class="sm-width" id="${sessionId}-activity" name="${sessionId}-activity">
            </select>
          </div>
          <div class="col-2 d-sm-none">
            <label class="sm-font" for="${sessionId}-date">Date/Time</label>
          </div>
          <div class="col-5 col-sm-2">
              <input class="date-edit sm-width" type="date" id="${sessionId}-date" name="${sessionId}-date" value="${defaultDate}">
          </div>
          <div class="col-5 col-sm-2">
              <input class="sm-width" type="time" id="${sessionId}-time" name="${sessionId}-time" value="07:00" step="3600000">
          </div>
          <div class="col-2 d-sm-none">
            <label class="sm-font" for="${sessionId}-location">Location</label>
          </div>
          <div class="col-10 col-sm-2">
              <select class="sm-width" id="${sessionId}-location" name="${sessionId}-location">
              </select>
          </div>
          <div class="col-2 d-sm-none">
            <label class="sm-font" for="${sessionId}-spaces">Spaces</label>
          </div>
          <div class="col-5 col-sm-1">
              <input class="sm-width" type="number" id="${sessionId}-spaces" name="${sessionId}-spaces" value="25" min="0" max="25" step="1">
          </div>
          <div class="col-2 offset-1 d-sm-none">
            <label class="sm-font" for="${sessionId}-running">Running</label>
          </div>
          <div class="col-2 col-sm-1">
              <input class="sm-width" type="checkbox" id="${sessionId}-running" name="${sessionId}-running" checked>  
          </div>
          <div class="col-5 offset-2 col-sm-1 offset-sm-0">
              <button class="create-btn admin-btn sm-width sm-btn" type="button" id="${sessionId}-create"  name="${sessionId}-create" data-toggle="modal" data-target="#confirm-create-modal">
              <p class="action-icon"><i class="fa-solid fa-floppy-disk"></i></p>
              <p class="action-txt">Create Session</p>
              </button>
          </div>
          
          <div class="col-5 col-sm-1">
              <button class="discard-btn admin-btn sm-width sm-btn" type="button" id="${sessionId}-discard"  name="${sessionId}-discard">
              <p class="action-icon"><i class="fa-solid fa-trash-can"></i></p>
              <p class="action-txt">Discard</p>
              </button>
          </div>
      </div>
        `
        sessionCont.insertBefore(newRow, sessionCont.firstChild)
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
                let newId = btn.id.substring(0,6)
                let newRow = document.getElementById(`${newId}-row`)
                if (newRow){
                    newRow.remove()
                }
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
            sessionId = btn.id.substring(0,6)
            deleteField.value = sessionId
            let sessionRow = document.getElementById(sessionId.concat("-admin-list"))
            sessionRow.remove()
            sessionForm.submit()
        })
    }
    
})