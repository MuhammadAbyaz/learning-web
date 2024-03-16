document.querySelector("button").addEventListener("click", function (evt){
    // this is event objectt which has its own properties and methods
    console.log(evt)
})

window.addEventListener("keydown",(e)=>{
    switch (e.code){
        case "ArrowUp":
            console.log("Up");
        case "ArrowDown":
            console.log("Down");
        case "ArrowLeft":
            console.log("Left");
        case "ArrowRight":
            console.log("Right");
        default:
            console.log("IGNORED!!")
    }
})