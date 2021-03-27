const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){

  res.sendFile(__dirname +"/index.html");
  // we can have only one send response inside app.get
  // res.send("Server is up and running");
})

app.post('/',function(req,res){
  const query = req.body.cityName;
  const  apiKey = "9443e9d02270a3be5ed53eaaaf8594b4";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  console.log(req.body);
  https.get(url,function(response){
    // console.log(response.statusCode);
    response.on("data",function(data){

         const weatherData = JSON.parse(data);
         var count = Object.keys(weatherData).length;
         console.log(count);
         res.write("<body background =/nature.jpg>");

         if(count<=2){

            res.write("<br>");
            res.write("<center><h1> 404 Error!</h1>")
            res.write("City Not Found");
         }else{
           const temp  = weatherData.main.temp;
           const maxTemp = weatherData.main.temp_max;
           const minTemp = weatherData.main.temp_min;
           const weatherDescription = weatherData.weather[0].description;
           // console.log(weatherData ,'\n',temp, weatherDescription );
           const imgUrl =  "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +"@2x.png"
           res.write("<br><br><br>");
           res.write("<p><center>Location : <strong>" + query +"</strong>")
           res.write("<p>Weather Description : <strong>" + weatherDescription +"</strong>")
           res.write("<p>Temperature : <strong>" + temp +" Degree Celcius</strong>")
           res.write("<p>Max Temperature : <strong>" + maxTemp +" Degree Celcius</strong>")
           res.write("<p>Min Temperature : <strong>" + minTemp +" Celcius</strong>")

           res.write("<p><img src='" + imgUrl + "'/>");
         }
         // res.write()
         res.send();

    })

  })
})


app.listen(3000,function(){
  console.log("server is running on port 3000.");
})
