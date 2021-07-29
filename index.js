const port = require('process').argv[2];
const express = require("express");
const path = require('path');
const handlebars = require('express-handlebars').create({ defaultLayout: 'default' });

const client_folder = path.resolve(__dirname, "..", "client");

app = express()
    .use(express.static(client_folder))
    .engine('handlebars', handlebars.engine)     //Set handlebars as template engine
    .set('view engine', 'handlebars')            //Automaticaly pick up files with ".handlebars" extension
    .set('views', path.join(__dirname,'/views')) //Set views folder
    .get("/:page", (request, result) => {        //If no static file found, use handlebar template
        result.render(request.params.page);
    }).
    get("/", (request, result) => { 
        result.redirect("/index");
    })
    .set('port', port)                       //Set port
    .listen(port, () => {                    //Start Server
        console.log(`Server now running...\n Serving ${client_folder}`)
    });