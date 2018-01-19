var http = require("http");
var url = require("url");
var fs = require("fs");
var express = require('express');
var app = express();

app.get('*', function (req, res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/menu', function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname, query = urlObj.query;
    var data = fs.readFileSync("./json/menu.json", "utf8");
    res.send(JSON.parse(data));
});
app.get('/organ', function (req, res) {
  var data = fs.readFileSync("./json/organ.json", "utf8");
  res.send(JSON.parse(data));
});
app.get('/post', function (req, res) {
  var data = fs.readFileSync("./json/post.json", "utf8");
  res.send(JSON.parse(data));
});
var server = app.listen(8099, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// //->使用NODE创建一个服务:当客户端发送一次请求的时候就会把对应的回调函数执行,并且传递两个参数值REQUEST、RESPONSE
// var server = http.createServer(function (req, res) {
//     //->解析客户端发送请求的这个地址
//     var urlObj = url.parse(req.url, true);
//     console.log('urlobj', urlObj);
//     var pathname = urlObj.pathname, query = urlObj.query;
//     //  query = utils.queryURLParameter(decodeURIComponent(urlObj.query));
//     //->我们使用url.parse最后一个参数传递的是true,会自动把传递进来的参数进行解析,但是获取到的对象不支持hasOwnProperty这个方法,所以我们自己写一个方法实现即可

//     //->前端路由判断:HTML/JS/CSS文件读取,并且返回给客户端进行解析
//     var reg = /\.(html|css|js)/i;
//     if (reg.test(pathname)) {
//         var fileCon = fs.readFileSync("." + pathname, "utf8");
//         var suffix = reg.exec(pathname)[1];
//         var conType = suffix === "html" ? "text/html" : (suffix === "css" ? "text/css" : "text/javascript");
//         res.writeHead(200, { 'content-type': conType });
//         res.end(fileCon);
//         return;
//     }

//     //->通过前端发送get请求响应数据或者直接前端请求该node服务上所存放的文件地址 直接可以获取并响应给前端 这时候什么判断就不用写。
//     if (pathname === "/getLoginData") {
//         var data = fs.readFileSync("./json/patrolPlanList.json", "utf8");
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(data);
//         return;
//     }


//     if (pathname === "/applicationData") {
//         var data = fs.readFileSync("./json/application.json", "utf8");
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(JSON.stringify(JSON.parse(data).data));
//         return;
//     }

//     if (pathname === "/patrolRecord") {
//         var data = fs.readFileSync("./json/patrolRecord.json", "utf8");
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(JSON.stringify(JSON.parse(data).data));
//         return;
//     }

//     if (pathname === "/type") {
//         var data = fs.readFileSync("./json/type.json", "utf8");
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(data);
//         return;
//     }


//     if (pathname === "/manualList") {
//         var data = fs.readFileSync("./json/manualList.json", "utf8");
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(data);
//         return;
//     }

//     if (pathname === "/filter") {
//         var data1 = fs.readFileSync("./json/manualList.json", "utf8");
//         data1 = JSON.parse(data1);
//         var  ary = [];
//         var data = data1.data.rows;
//         for (var i = 0; i < data.length; i++) {
//             var cur = data[i];
//             if (cur.fileName.indexOf(query.filter) > -1) {
//                 cur = JSON.parse(JSON.stringify(cur))
//                 ary.push(cur);
//                 console.log(ary)
//             }
//         }
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(JSON.stringify({ code: 0, desc: "搜索成功!", data: ary }));
//     }

//      if (pathname === "/manualDetail") {
//         var data = fs.readFileSync("./json/manualDetail.json", "utf8");
//         data = JSON.parse(data).data;
//         var obj={};
//         for (var i = 0; i < data.length; i++) {
//             var cur = data[i];
//             if (cur.id==query.id) {
//                obj=cur;
//             }
//         }
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(JSON.stringify({ code: 0, desc: "success!", data: obj }));
//     }

//      if (pathname === "/scoringObject") {
//          res.header("Access-Control-Allow-Origin", "*");  
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
//         var data = fs.readFileSync("./json/scoringObject.json", "utf8");
//         res.writeHead(200, { 'content-type': 'application/json; charset=UTF-8' });
//         res.end(JSON.stringify(JSON.parse(data) ));
//         return;
//     }


// });

 
// app.get('/scoringObject', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Content-Type", "application/json;charset=utf-8");
//     var data = fs.readFileSync("./json/scoringObject.json", "utf8");
//     res.send(JSON.parse(data));
//     return;
// });
// app.get('/qCategoryquotas', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Content-Type", "application/json;charset=utf-8");
//     var data = fs.readFileSync("./json/qCategoryquotas.json", "utf8");
//     res.send(JSON.parse(data));
//     return;
// });
// server.listen(8088, function () {
//     console.log("服务创建成功,8088~");
// });
