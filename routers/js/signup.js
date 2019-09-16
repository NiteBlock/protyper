let button = document.querySelector(".signup-container button")

button.addEventListener("click", event => {
    event.preventDefault()
    let name = document.querySelector(".signup-container input[name=name]").value
    let password = document.querySelector(".signup-container input[name=password]").value ==  document.querySelector(".signup-container input[name=cpassword]").value ? document.querySelector(".signup-container input[name=password]").value : undefined
    if (!password){}
    let isRemebered = false
    try{
        isRemebered = document.querySelector(".signup-container p input:checked").value != "off" ? true : false
    } catch {
        isRemebered = false
    }
    
})