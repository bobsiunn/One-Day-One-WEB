var http = require('http');
var fs = require('fs');
//url모듈 사용 선언 'url' 이름으로 사용하기로 함
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id
    console.log(queryData.id);

    if(_url == '/'){
      title = 'Welcome';
    }

    if(_url == '/favicon.ico'){
        response.writeHead(404);
    }
    
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
    
      var template = `
    <!doctype html>
<html>
<head>
    <title>WEB - ${title}</title>
    <meta charset="urf-8">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1><a href="/">WEB</a></h1>
    <input type="button" value="night" onclick="document.querySelector('body').style.backgroundColor='black';
    document.querySelector('body').style.color='white';">
    <input type="button" value="day" onclick="document.querySelector('body').style.backgroundColor='white';
    document.querySelector('body').style.color='black';">
    <div id="grid">   
        <ul>
            <li><a href="/?id=HTML" target="_blank" title="HTML">HTML</a></li>
            <li><a href="/?id=CSS" target="_blank" title="CSS">CSS</a></li>
            <li><a href="/?id=JS" target="_blank" title="JS">JS</a></li>
        </ul>
        
        <div id="article">    
            <h2>${title}</h2>
            <p>
                ${description}
            </p>
        </div>
    </div>   
</body>
</html>`;
    console.log(__dirname + _url);
    response.end(template);
    })
 
});
app.listen(3000);