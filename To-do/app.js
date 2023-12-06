let inp = document.querySelector("input");
let btn = document.querySelector("button");
let ol  = document.querySelector("ol");

btn.addEventListener("click", function(){
    let li = document.createElement("li");
    li.innerText = inp.value;

    // delet button
    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";
    delBtn.classList.add("delete");

    ol.appendChild(li);
    li.appendChild(delBtn);
    inp.value = "";
});

ol.addEventListener("click",function(event){
    if(event.target.innerText == "delete"){
        event.target.parentElement.remove();
        console.log("deleted");
    }
})
