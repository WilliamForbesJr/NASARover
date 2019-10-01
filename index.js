// Modules
const request       = require('request');
const express       = require('express');
const hbs           = require('hbs');
const APIManager    = require('./utils/APIManager.js');
const app           = express();

//view engine setup for templating
app.set('view engine', 'hbs');
app.use(express.static('public')); //static dir

app.get('/', (req, res) => {

    const url = APIManager.buildURL();

    request({url, json: true}, (error, response, body) => {
        if (error) {
            res.send(error);
        } else {

            // const index = APIManager.loadRandomArrayIndex(body.photos.length); //creating constant for photos array based on length of array received

            response.render('index', {
                date: body.photos[0].earth_date,
                img: body.photos[0].img_src,
                sol: body.photos[0].sol,
                status: body.photos[0].rover.status,
                cam: body.photos[0].camera.full_name
            });
        }
    });
});

let port = process.env.PORT;

app.listen(port || 3000, () => {
    console.log('server started!');
})

module.exports = app; //to test