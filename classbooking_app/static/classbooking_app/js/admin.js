document.addEventListener("DOMContentLoaded", function(){
    const filters = document.getElementsByClassName("filter")
    const sessionForm = document.getElementById("session-form")
    const addSession = document.getElementById("add-session")
    const sessionCont = document.getElementById("session-cont")
    let containerLength = sessionCont.children.length
    const locationList = document.getElementById("location-list").children
    const activityList = document.getElementById("activity-list").children

    for (let filter of filters){
        filter.addEventListener("change", () => {
            sessionForm.submit()
        })
    }
    
    addSession.addEventListener("click", () => {
        let newRow = document.createElement("div")
        newRow.classList.add("row")
        newRow.innerHTML=`
        <div class="col">
        <select id="${containerLength}-activity">
        </select>
        <input type="date" id="${containerLength}-date" name="${containerLength}-date">
        <input type="time" id="${containerLength}-time" name="${containerLength}-time">
        <select id="${containerLength}-location">
        </select>
        <input type="number" id="${containerLength}-spaces" name="${containerLength}-spaces" min="0" max="25" step="1">
        <input type="checkbox" id="${containerLength}-running" name="${containerLength}-running" checked>
        <button type="button" id="${containerLength}-remove" name="${containerLength}-remove">Remove</button>
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



})