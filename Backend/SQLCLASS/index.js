const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');
const { render } = require('ejs');



app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '@MySQL5253110'
});

let getRandomUser = ()=>{
  let post = 'Hello';
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
    post
  ];
}

//insert data
// let q = "INSERT INTO user (id, username, email, password,post) VALUES ?;";
// let data = [];
// for(i=1;i<53;i++){
//   data.push(getRandomUser())
// }

// try {
//   connection.query(q,[data],(err,result)=>{
//     if(err){
//       throw err;
//     }
//     console.log(result);
//   });
// } catch (error) {
//   console.log(error);
// }
// connection.end();

// rest api
const port = 8080;

//--home-route
app.get("/",(req,res)=>{
  let q = `select count(*) from user`;
  try {
    connection.query(q,(err,result)=>{
      if(err){
        throw err;
      }
      let count = result[0]['count(*)'];
      res.render("home.ejs",{count});
      console.log(result);
  });
  } catch (error) {
    console.log(error);
    res.send("Some error in DB");
  }
});
//--show-route
app.get("/user",(req,res)=>{
  let q = `SELECT * FROM user`;
  try {
    connection.query(q,(err,result)=>{
      if(err){
        throw err;
      }
      res.render("showUsers.ejs",{result});
      console.log(result);
    });
    } catch (error) {
      console.log(error);
      res.send("Some error in DB");
    }
});

//--Creat-Route
app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
});
app.post("/user",(req,res)=>{
  let{username,email,password,content}=req.body;
  let id = uuidv4();
  let q = "INSERT INTO user (id, username, email, password,post) VALUES (?,?,?,?,?);";
  let newdata = [id,username,email,password,content];

  try {
    connection.query(q,newdata,(err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.redirect("/user");
    });
  } catch (error) {
    console.log(error);
    res.send("some error in DB");
  }
});

//--edit-Route
app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q,(err,result)=>{
      if(err){
        throw err;
      }
      let user = result[0];
      res.render("edit.ejs",{user});
    });
    } catch (error) {
      console.log(error);
      res.send("Some error in DB");
    }
});
//--Update-Route
app.patch("/user/:id",(req,res)=>{
  let {id} = req.params;
  let {password,username}= req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q,(err,result)=>{
      if(err){
        throw err;
      }
      let user = result[0];
      if(password===user.password){
        let q2 = `UPDATE user SET username = '${username}' WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err){
            throw err;
          }
          res.redirect("/user");
        });
      }else{
        res.send("you enter wrong pass");
      }
    });
    } catch (error) {
      console.log(error);
      res.send("Some error in DB");
    }
});

//--Delet-route
app.get("/user/:id/delete",(req,res)=>{
  let {id} = req.params;
  res.render("delete.ejs",{id});
});
app.delete("/user/:id", (req,res)=>{
  let {id} = req.params;
  let {password}= req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q,(err,result)=>{
      if(err){
        throw err;
      }
      let user = result[0];
      if(password===user.password){
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err){
            throw err;
          }
          res.redirect("/user");
        });
      }else{
        res.send("you enter wrong pass");
      }
    });
    } catch (error) {
      console.log(error);
      res.send("Some error in DB");
    }
});

app.listen(port,()=>{
  console.log(`app is listing on port ${port}`); 
});