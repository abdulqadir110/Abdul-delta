var figlet = require("figlet");

figlet("Shalu Rawat", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
console.log(process.argv);
let proAray = process.argv;
for (let index = 2; index < proAray.length; index++) {
  console.log(`${proAray[index]}`);
}