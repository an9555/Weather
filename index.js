const express = require("express");
const https = require("https");
const bodyParser=require("body-parser")//import

const app = express();

app.use(bodyParser.urlencoded({extended:true}));//調用body

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")//調用HTML
})

app.post("/",function(req,res){//連接HTML
  const query = req.body.cityName
  api_key="631705d972f6ab21d42cabe043353874"
  units="metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api_key+"&units="+units
  
  https.get(url,function(response){
  console.log(response.statusCode);
  
    response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        const name = weatherData.name
        
        res.write("<h1>The weather is currently "+weatherDescription+"<h1>")
        res.write("<h1>The temperature in "+name+" is "+temp+" degrees Celcius.<h1>");
        res.write("<img src='"+imageURL+"'>")
        res.send()
        })
    })
})

//const query = "HongKong"
//api_key="631705d972f6ab21d42cabe043353874"
//units="metric"
//const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api_key+"&units="+units

//https.get(url,function(response){
//  console.log(response.statusCode);

//  response.on("data",function(data){
//      const weatherData = JSON.parse(data)
//      const temp = weatherData.main.temp
//      const weatherDescription = weatherData.weather[0].description
//      const icon = weatherData.weather[0].icon
//      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      
//      res.write("<h1>The weather is currently "+weatherDescription+"<h1>")
//      res.write("<h1>The temperature is "+temp+" degrees Celcius.<h1>");
//      res.write("<img src='"+imageURL+"'>")
//      res.send()
//      })
//  })

app.listen(3000, function(){
    console.log("😊主人,內容已更新✔, 愛你哦😘")
  });