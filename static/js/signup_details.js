document.addEventListener("DOMContentLoaded", function(){
    // Declare constant variables
    const memberBtn = document.getElementById("membership-btn");
    const memberTab = document.getElementById("nav-membership-tab");
    const persTab = document.getElementById("nav-personal-tab");
    const persForm = document.getElementById("personal-form");
    const payTab = document.getElementById("nav-payment-tab");
    const loginTab = document.getElementById("nav-login-tab");
    const payForm = document.getElementById("pay-form");
    const signupLink = document.getElementById("sign-up-link");
    
    // Remove disabled attribute from next tab once user submits form on current tab
    memberBtn.addEventListener("click", () => {
        persTab.classList.remove("disabled");
        memberTab.classList.add("disabled");
        persTab.click();
    });

    persForm.addEventListener("submit", (event) => {
        event.preventDefault();
        payTab.classList.remove("disabled");
        persTab.classList.add("disabled");
        payTab.click();
    });
    
    // Once user completes the final form direct user to real registration page
    payForm.addEventListener("submit", (event) => {
        event.preventDefault();
        loginTab.classList.remove("disabled");
        payTab.classList.add("disabled");
        signupLink.click();
    });

});