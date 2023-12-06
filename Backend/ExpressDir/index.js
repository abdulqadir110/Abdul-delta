const express = require("express");
const app = express();
//console.dir(app);

let port = 3000;

app.listen(port,() => {
    console.log(`app is listening on port ${port}`);
});
//-------------------------------//
app.get("/",(req,res)=>{
    res.send("<h1>hello you contected to the root path of Abdul Sir</h1>");
});
app.get("/:lonara/:abdul",(req,res)=>{
    console.log(req.params);
    let {lonara,abdul} = req.params;
    res.send(`<h1>hello ${abdul} you contected to the root path of Abdul Sir and you also give ${lonara}</h1>`);
});
app.get("/serach",(req,res)=>{
    let { q } = req.query;
    if(!q){
        res.send(`you not send any querry`);
    }
    console.log(req.query);
    res.send(`for your query ${q}`);
});
app.get("*",(req,res)=>{
    res.send("<h1>you enter the wrong path to contact, if you think it is an error please try to contact Abdul Sir</h>");
});
