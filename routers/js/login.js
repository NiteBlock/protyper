let button = document.querySelector(".login-container button")

button.addEventListener("click", event => {
    event.preventDefault()
    let name = document.querySelector(".login-container input[name=name]").value
    let password = document.querySelector(".login-container input[name=password]").value
    let isRemebered = false
    try{
        isRemebered = document.querySelector(".login-container p input:checked").value != "off" ? true : false
    } catch {
        isRemebered = false
    }
    
})