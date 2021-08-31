const request = require('request')
const chalk = require('chalk')


const getWeatherForecast = (longitude, latitude ,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=9d2da229806cfabc1e740dffa9333138'
    request({
       url, 
      json : true
   },(error,{body})=>{
       if(error){
          callback(chalk.red.bold('Error -> Unable to fetch Weather Forecast Service'),undefined)
       }else if(body.weather.length === 0){
          console.log(chalk.red.bold('Error -> Unable to fetch Current location'))
       } else{
          callback(undefined,{
              description : 'Weather condition is as follows : '+'Weather Description -> '+body.weather[0].description+
              ', Temprature -> '+body.main.temp +', Humidity -> '+body.main.humidity
          })
       }
    })
 }

 module.exports = getWeatherForecast