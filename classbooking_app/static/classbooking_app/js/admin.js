document.addEventListener("DOMContentLoaded", function(){
    // Declare constant variables
    const filters = document.getElementsByClassName("filter");
    const sessionForm = document.getElementById("session-form");
    const addSession = document.getElementById("add-session");
    const sessionCont = document.getElementById("session-cont");
    const locationList = document.getElementById("location-list").children;
    const activityList = document.getElementById("activity-list").children;
    const filterIcons = document.getElementsByClassName("filter-icon");
    const updateBtns = document.getElementsByClassName("update-btn");
    const deleteBtns = document.getElementsByClassName("delete-btn");
    const createBtnModal = document.getElementById("create-btn-modal");
    const updateField = document.getElementById("update-field");
    const createField = document.getElementById("create-field");
    const deleteField = document.getElementById("delete-field");
    const feedback = document.getElementById("admin-feedback").innerHTML;
    const feedbackModal = document.getElementById("feedback-modal");
    const feedbackModalTitle = document.getElementById("feedback-modal-title");
    const feedbackModalBtn = document.getElementById("feedback-modal-btn");
    const defaultDate = document.getElementById("default-date").innerHTML;
   
    // If feedback message has been sent then display it in modal
    if (feedback != ""){
        feedbackModal.classList.remove("fade");
        feedbackModalBtn.click();
        feedbackModal.classList.add("fade");
        feedback.value = "";
    }
    
    // Setup filter icons next to headers to remove date, location or activity filters
    for (let icon of filterIcons){
        icon.addEventListener("click", () => {
            // Get filter icon id
            let filterId = icon.id.substring(0,10);
            let filter = document.getElementById(filterId);
            // Remove filter from sessions when filter icon is clicked
            if (filterId === "dat-filter"){
                filter.value = "";
            } else {
                filter.value= "All";
            }
            // Submit the form to reload the list of sessions
            sessionForm.submit();
        });
    }
   
    // When filter is applied submit the form to reload the list of sessions
    for (let filter of filters){
        filter.addEventListener("change", () => {
            sessionForm.submit();
        });
    }
    
    // Add session button to add new session to list
    addSession.addEventListener("click", () => {
        // Ensure id is unqiue my finding the current maxiumum of all session ids
        let maxId = document.getElementById("max-id");
        let sessionId = (Number(maxId.innerHTML) + 1).toString();
        // Create new row for sessions
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.classList.add("new-session");
        newRow.id = `${sessionId}-row`;
        // Setup default values
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
        `;
        // Add new session to list
        sessionCont.insertBefore(newRow, sessionCont.firstChild);
        // Set options for select elements
        let activitySelect = document.getElementById(`${sessionId}-activity`);
        for (let act of activityList){
            let newOption = document.createElement("option");
            newOption.value = act.innerHTML;
            newOption.innerHTML = act.innerHTML;
            activitySelect.appendChild(newOption);
        }

        let locationSelect = document.getElementById(`${sessionId}-location`);
        for (let loc of locationList){
            let newOption = document.createElement("option");
            newOption.value = loc.innerHTML;
            newOption.innerHTML = loc.innerHTML;
            locationSelect.appendChild(newOption);
        }

        // Redefine list of create buttons once new session has been added
        let createBtns = document.getElementsByClassName("create-btn");
        for (let btn of createBtns){
            btn.addEventListener("click", () => {
                    createBtnModal.addEventListener("click", () => {
                    // Get time selected
                    let time = document.getElementById(sessionId.concat("-time")).value
                    // Check if time is on the hour
                    if (time.substring(3,5) != "00"){
                    let dismissBtn = document.getElementById("data-dismiss-create")
                    let modal = document.getElementById("confirm-create-modal")
                    modal.classList.remove("fade")
                    // Hide confirmation modal
                    dismissBtn.click()
                    modal.classList.add("fade")
                    // Show feedback modal
                    feedbackModalTitle.innerHTML = "Session times must be on the hour"
                    feedbackModal.classList.remove("fade");
                    feedbackModalBtn.click();
                    feedbackModal.classList.add("fade");
                    } else {
                        // Feed session id to into form
                        createField.value = sessionId;
                        // Submit form to create session
                        sessionForm.submit();
                    }
                    });                    
                
            });
        }
        
        // Redefine discard buttons once new session has been added
        let discardBtns = document.getElementsByClassName("discard-btn");
        for (let btn of discardBtns){
            // If user clicks discard then new session is removed from list
            btn.addEventListener("click", () => {
                let newId = btn.id.substring(0,6);
                let newRow = document.getElementById(`${newId}-row`);
                if (newRow){
                    newRow.remove();
                }
            });
        }
        
        // Redefine max id so new session id is always unique
        maxId.innerHTML = sessionId;

    });
    
    for (let btn of updateBtns){
        btn.addEventListener("click", () => {
            // Get sesssion id user wishes to update
            let sessionId = btn.id.substring(0,6);
            // Get time chosen
            let time = document.getElementById(sessionId.concat("-time")).value
            // Check if time is on the hour
            if (time.substring(3,5) != "00"){
                let dismissBtn = document.getElementById("data-dismiss-".concat(sessionId))
                let modal = document.getElementById("confirm-update-modal-".concat(sessionId))
                modal.classList.remove("fade")
                // Hide confirmation modal
                dismissBtn.click()
                modal.classList.add("fade")
                // Show feedback modal
                feedbackModalTitle.innerHTML = "Session times must be on the hour"
                feedbackModal.classList.remove("fade");
                feedbackModalBtn.click();
                feedbackModal.classList.add("fade");
            } else {
            // Feed session id into form input
            updateField.value = sessionId;
            // Submit form to update session details
            sessionForm.submit();
            }
        });
    }

    for (let btn of deleteBtns){
        btn.addEventListener("click", () => {
            // Get sesssion id user wishes to delete
            let sessionId = btn.id.substring(0,6);
            // Feed session id into form input
            deleteField.value = sessionId;
            // Remove session from list
            let sessionRow = document.getElementById(sessionId.concat("-admin-list"));
            sessionRow.remove();
            // Submit form to delete session
            sessionForm.submit();
        });
    }

});