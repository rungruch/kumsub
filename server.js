
const express = require('express')
const http = require('http')
const longdo = require('longdo-api')



const app = express()

app.use('/', express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
  })
app.get('/index2',function(req,res){
   res.sendFile(__dirname,'/index2.html')
})


app.use('/resources', express.static(__dirname + '/resources')); 



app.get('/getlongdo/:id', function (req, res) {
    var id = req.params.id;
   console.log(id);
    longdo.search(id).then((result) => {
      console.log(result);
      //console.log(result["พจนานุกรม ฉบับราชบัณฑิตยสถาน พ.ศ. ๒๕๕๔"][0][1]);
      var testres=result["พจนานุกรม ฉบับราชบัณฑิตยสถาน พ.ศ. ๒๕๕๔"];
      console.log(testres);
      res.json(testres);
  });
})



  const server = http.createServer((req, res) => {
    const handler = (req, res) => {
        res.end(`
          <div>
            <h2 style="color: #ff3456;">Ahoy!</h2>
            <p style="color: #23dd55;">This is node.js tutorial</p>
          </div>
        `)
      }
      const server = http.createServer(handler)
  })


app.listen(4046)