// let url = "https://catfact.ninja/fact";
// let url2= "https://dog.ceo/api/breeds/image/random";
let url3 = "http://universities.hipolabs.com/search?name=";

let con = "nepal";

let btn = document.querySelector("button");
let ol  = document.querySelector("ol");

btn.addEventListener("click", async ()=>{
    con = document.querySelector("input").value;
    console.log(con);
    let colArry = await getColleges();
    ol.innerHTML = "";
    show(colArry);
})

function show(colArry){
    for(col of colArry){
        let li = document.createElement("li");
        li.innerText = col.name;
        ol.appendChild(li);
    }
}

async function getColleges(){
    try {
        let res = await axios.get(url3+con);
        return res.data;
    }catch(e){
        console.log("error : ",e);
        return [];
    }
}

// let p = document.querySelector("p");
// let btn = document.querySelector("button");
// let img = document.querySelector("img");

// async function getImg(){
//     try{
//         let res = await axios.get(url2);
//         return res.data.message;
//     }catch(e){
//         console.log("error - ",e);
//         return "No img";
//     }
// }

// async function getFacts(){
//     try{
//         let res = await axios.get(url);
//         return res.data.fact;
//     }catch(e){
//         console.log("error - ",e);
//         return "No fact";
//     }
// }

// btn.addEventListener("click",async ()=>{
//     let res = await getFacts();
//     let res2= await getImg();

//     console.log(res);
//     p.innerText = res;

    
//     console.log(res2);
//     img.src = res2;
// });