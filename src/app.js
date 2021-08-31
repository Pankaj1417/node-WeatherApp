const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const getGeoCode = require('./utils/geocode')
const getWeatherForecast = require('./utils/weatherForecast')

//getting the application rtesponse from server
const app = express()

//Gettig the path of endpoints
const publicDirectoryPAth = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



//Setting the handle bar  engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setting up static distionary to be served
app.use(express.static(publicDirectoryPAth))


app.get('',(req,res) =>{
    res.render('index',{
        title :'Weather',
        name : 'Pankaj Kumar',
        location : 'Ghaziabad'
    })
})

app.get('/about',(req , res)=>{
    res.render('about',{
        title :'About',
        name : 'Pankaj Kumar',
        location : 'Ghaziabad'
    })
})

app.get('/help',(req , res) =>{
    res.render('help',{
        title :'Help',
        name : 'Pankaj Kumar',
        location : 'Ghaziabad'
    })
})

app.get('/weather' , (req , res) =>{
   if(!req.query.address){
      return res.send({
           Error:'Please provide the Address'
       })
   }getGeoCode(req.query.address,(error,{longitude,latitude,location}={})=>{
    if(error){ 
       return res.send({
               error
           })
    }
    getWeatherForecast(longitude,latitude,(error,result)=>{
       if(error){
        return res.send({
            error
        })
       }
          res.send({
            address : location,
            description : result.description,
        })
    })
 })
})

app.get('/help/*',(req , res)=>{
    res.render('404',{
    title : '404',
    name : 'Pankaj Kumar',
    errorMessage : 'Help article not found'
    })
})

app.get('*',(req , res)=>{
    res.render('404',{
    title : '404',
    name : 'Pankaj Kumar',
    errorMessage : 'Page not found'
    })
})
//Strting the server
app.listen(3000 , ()=>{
    console.log('server is up and running on port 3000')
})
