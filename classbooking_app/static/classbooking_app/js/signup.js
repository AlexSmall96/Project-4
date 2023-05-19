document.addEventListener("DOMContentLoaded", function(){
    const memberBtn = document.getElementById("membership-btn")
    const memberTab = document.getElementById("nav-membership-tab")
    const persTab = document.getElementById("nav-personal-tab")
    const persForm = document.getElementById("personal-form")
    const payTab = document.getElementById("nav-payment-tab")
    const loginTab = document.getElementById("nav-login-tab")
    const payForm = document.getElementById("pay-form")

    memberBtn.addEventListener("click", () => {
        persTab.classList.remove("disabled")
        memberTab.classList.add("disabled")
        persTab.click()
    })

    persForm.addEventListener("submit", (event) => {
        event.preventDefault()
        payTab.classList.remove("disabled")
        persTab.classList.add("disabled")
        payTab.click()
    })

    payForm.addEventListener("submit", (event) => {
        event.preventDefault()
        loginTab.classList.remove("disabled")
        payTab.classList.add("disabled")
        loginTab.click()
    })










})