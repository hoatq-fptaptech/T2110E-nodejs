var express = require("express");
var app = express();
const port = process.env.PORT || 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
// cap quyền truy cập cho các file tĩnh (static file): css jquery.js, images...
app.use(express.static("public"));// cho quyền truy cập toàn bộ các file tĩnh bên trong thư mục public

// khai bao su dung view engine la ejs
app.set("view engine","ejs");
// ket noi database
var mssql = require("mssql");
// var config = {
//     server: "t2110e.database.windows.net",
//     user:"demosql",
//     password:"Abcd@123",
//     database:"t2110e-demosql",
//     stream: false,
//     port:1433,
//     options: {
//         trustedConnection: true,
//         encrypt: true,
//         enableArithAbort: true,
//         trustServerCertificate: true,
//     },
// }
const config = {
    server:"118.70.125.210",
    user:"sa",
    password:"z@GH7ytQ",
    database:"QuangHoa"
};
mssql.connect(config,function (err){
    if(err) console.log(err);
    else console.log("connected database..");
});
// tao doi tuong truy van
var sql = new mssql.Request();

// vi du 1 routing truy van db
app.get("/",function (req, res) {
    var sql_txt = "select * from Demo;";
    sql.query(sql_txt,function (err, rs) {
        if(err) res.send(err);
        else res.send(rs.recordset);
    })
})


// them routing
var count = 0;
// app.get("/",function (req, res) {
//     count++;
//     res.send("Xin chào:"+count);
// })
app.get("/bong-da",function (req,res) {
    count++;
    res.render("layout");
})
app.get("/tin-tuc",function (req,res) {
    var param = req.query.TenSP;
    var sql_txt = "select * from SanPham where TenSP like '%"+param+"%';";
    sql.query(sql_txt,function (err, rs) {
        if(err) res.send("Errors..");
        else  res.render("demo",{
            products:rs.recordset
        });
    })
})
app.get("/chi-tiet",function (req,res){
    var param = req.query.id;
    var sql_txt = "select * from SanPham where ID = "+param+";";
    sql.query(sql_txt,function (err, rs) {
        if(err) res.send("Errors..");
        else if(rs.recordset.length ==0){
            res.send("Không tìm thấy sản phẩm nào hết");
        }else{
            res.render("chitiet",{
                product:rs.recordset[0]
            })
        }
    })
})
// routing ds - tim kieems hãng
// routing tim kiems sản phẩm theo tên hãng
// routing tất cả sản phẩm kèm tên hãng