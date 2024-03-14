const { response, query } = require("express");
const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");
});



app.post("/",function(req, res){
    const query = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=2fe62bd49be2c13f471ea89c9942d6b1&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata= JSON.parse(data);
            const temp = weatherdata.main.temp
            const weatherdescription = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon 
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather is currently "+weatherdescription+"<p>");
            res.write("<h1>The temperature in "+query+" is "+temp+ " degree celcius</h1>");
            res.write("<img src="+imageUrl+">");
            res.send();
            
        });
        
    });
   
});






app.listen(3000,function(req, res){
    console.log("server is running in port 3000");
});
