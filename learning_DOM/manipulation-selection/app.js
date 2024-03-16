// const allImages = document.getElementsByTagName("img");
// for(let img of allImages){
//     console.log(img.src);
// }


// it only gives us the first match
// for tag 
console.log(document.querySelector('p'));

// for class
console.log(document.querySelector(".square"));

// for id
console.log(document.querySelector("#banner"));

// we can be more complex with selectors like:
console.log(document.querySelector("img:nth-of-type(2)"))
console.log(document.querySelector("a[title=Java]"))
// it gives all the element with specified tag/class
console.log(document.querySelectorAll('p'))
const links = document.querySelectorAll("p a");
for (let link of links){
   link.style.color = 'rgb(0,108,134)' ;
   link.style.textDecorationColor = "magenta";
   link.style.textDecorationStyle = "wavy";
}
// class list
// this classlist property has many functions like add,remove,toggle,contains etc
document.querySelector("h2").classList.add("purple","border");

// traversing parent and child
const paragraph = document.querySelector("b").parentElement;
const paragraphChildrens = paragraph.children;
console.log(paragraphChildrens);
const paragraphNextAdjacentElement = paragraph.nextElementSibling;
const paragraphPreviousAdjacentElement = paragraph.previousElementSibling;
const paragraphNextNode = paragraph.nextSibling;
const paragraphPreviousNode = paragraph.previousSibling;


// creating new element
const newImage = document.createElement("img")
newImage.setAttribute("src","https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
newImage.style.width = "100%"
document.body.appendChild(newImage)

const newh2 = document.createElement("h2");
newh2.innerText = "I am new h2";
document.querySelector("h1").insertAdjacentElement("afterend",newh2);
const h3 = document.createElement("h3");
h3.append("I am a h3");
document.querySelector("h2").after(h3);
