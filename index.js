var express = require("express");
var app = express();
const port = 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
// cap quyền truy cập cho các file tĩnh (static file): css jquery.js, images...
app.use(express.static("public"));// cho quyền truy cập toàn bộ các file tĩnh bên trong thư mục public

// khai bao su dung view engine la ejs
app.set("view engine","ejs");
// them routing
var count = 0;
app.get("/",function (req, res) {
    count++;
    res.send("Xin chào:"+count);
})
app.get("/bong-da",function (req,res) {
    count++;
    res.render("layout");
})
app.get("/tin-tuc",function (req,res) {
    count++;
    res.render("demo",{
        xyz: count
    });
})