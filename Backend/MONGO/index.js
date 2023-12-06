const mongoose = require('mongoose');

main()
 .then((res)=>{
    console.log("connection succesfull");
  })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User",userSchema);

User.find({age:{$eq:23}}).then((res)=>{
    console.log(res);
});
// User.insertMany([
//     {name:"tony",email:"tony@gmail.com",age:45},
//     {name:"steve",email:"steve@gmail.com",age:46},
//     {name:"bruce",email:"bruce@gmail.com",age:48},
//     {name:"cris",email:"cris@gmail.com",age:50},
// ]).then((data)=>{
//     console.log(data);
// });
// const user2= new User({ name: "sejal",email: "sejal@gmail.com",age: 22});

// user2.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });