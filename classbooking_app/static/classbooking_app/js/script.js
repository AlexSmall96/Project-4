document.addEventListener("DOMContentLoaded", function(){
    // Get date chosen from form
    let currentDate = document.getElementById("select-date")
    let form = document.getElementById("date-form")
    // Add event listener on date form to convert date into serial number
    currentDate.addEventListener("change", function(){
        let date = new Date(this.value);
        let serialDate = Math.floor(date.getTime()/(1000*60*60*24))+25569;
        // Convert serial number into string and add class number (1 for boxfit)
        let serialStr = serialDate.toString();
        let session_id = Number("1".concat(serialStr));
        form.submit()
    })
   
})
