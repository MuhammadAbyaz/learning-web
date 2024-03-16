const button = document.querySelector("button");
button.addEventListener("click",()=>{
    const red = Math.floor(Math.random() * 255)
    const green = Math.floor(Math.random() * 255)
    const blue = Math.floor(Math.random() * 255)
    const color = `rgb(${red} ,${green} ,${blue})`;
    document.body.style.backgroundColor = color; 
    document.querySelector("h1").innerText = color;
})