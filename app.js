
var http = require('http'),
    urlLib = require('url'),
    fs = require('fs');

var express = require('express'),
    jade = require('jade'),
    fs=require('fs'),
    static=require('express-static');

var server = express();
server.listen(2138);

server.use('/',function(req,res,next){
    var str = jade.renderFile('./min.jade',{pretty:true});
    res.send(str);
});

server.use(static('./'));


http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var json = urlLib.parse(req.url,true).query;
    fs.writeFile('./文章列表/'+json.titleName+'.txt',json.inner,function(err){
        if(err){
            console.log('错误了:'+err);
        }
        else{
            fs.readFile('./所有文章的名字.txt','utf8',function(err,data){
                if(err){
                    console.log('err:'+err);
                }
                else{
                    var s = toString(data,'’');
                    var b = toString(s,'‘');
                    var arr = eval('('+b+')');
                    arr.push(json.titleName);
                }
            });
            res.write('成功了');
            res.end();
        }
    })
}).listen(1222);


function toString(data,need){
    if(data.indexOf(need)!=-1){
        var data = data.replace(need,'"');
        return toString(data,need);
    }
    else{
        return data;
    }
}


