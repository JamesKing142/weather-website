const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocoding = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const { send } = require('process')

const port = process.env.PORT || 3000
const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partial')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nhan',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Nhan',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Nhan',
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide a valid address',
    })
  }

  geocoding(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send(error)
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        })
      })
    }
  )
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Nhan',
    title: '404',
    errorMessage: 'Help article not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    name: 'Nhan',
    title: '404',
    errorMessage: 'Page not found',
  })
})
app.listen(port, () => {
  console.log('Server is up on port' + port)
})
