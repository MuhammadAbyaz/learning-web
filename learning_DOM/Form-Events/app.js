const form = document.getElementById("shelterForm")
const input = document.querySelector("#catName")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const listElement = document.createElement("li")
    listElement.innerText = input.value
    input.value = ""
    document.querySelector("ul").append(listElement)
})
