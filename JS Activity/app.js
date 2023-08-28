let btn = document.querySelector("button");
btn.addEventListener("click", function (){
    console.log("generate random color");
    let h3 = document.querySelector("h3");
    let randomColor = getRandomColor();
    h3.innerText = randomColor;
    h3.style.color = randomColor;
    
    let div = document.querySelector("div");
    div.style.backgroundColor = randomColor;
});

function getRandomColor(){
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);

    let color = `rgb(${red}, ${green}, ${blue})`;
    return color;
}


