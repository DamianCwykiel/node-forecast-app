const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
// console.log(__dirname)
// console.log(path.join(__dirname, './public'))


const port = process.env.PORT || 3000;

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

const partialsPath = path.join(__dirname, '../views/partials')

//setup handlebars engineer and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directly to serve
app.use(express.static(publicDirectoryPath))

//Express Middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
  
    // console.log(log);
    // fs.appendFile('server.log', log + '\n');
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err) {
        console.log('unable to append to server.log')
      }
    });
    next();
  });

  //helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
  })


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Damian Cwykiel ©'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Damian Cwykiel ©'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpfulText: 'A few helpful tips',
        name: 'Damian Cwykiel ©'
    })
})

//weather endpoint
// app.get ('/weather',(req, res) => {
//     if (!req.query.address || !req.query.country) {
//         return res.send ({
//             error: 'Both an address and country terms must be provided'
//         })
//     }
// console.log(req.query.country)
//     res.send([{
//         location: req.query.country,
//         forecast: 'Sunny day, no rain',
//         address: req.query.address
//     }])
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'An address term must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


//products
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term cannot be empty'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
//help
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404!',
        name: 'Damian Cwykiel',
        errorMessage: 'Cannnot find the help art O_O'
    })
})

//404-page
app.get('*', (req, res) => {
    res.render('404-page',{
        title:'404!',
        name: 'Damian Cwykiel',
        errorMessage: 'Page not found. Sorry O_O'
    })
})

//server
app.listen(`${port}`, () => {
    console.log(`Server is alive on port ${port}!`);
  }); 