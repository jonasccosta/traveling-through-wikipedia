const PORT = 8000

const express = require('express');
const router = express.Router();
const process = require('./public/js/urlProcessor')

const app = express();


app.use(express.urlencoded({extended:true}));

// Static Files
app.use(express.static('public'))


app.set('view engine', 'ejs')

app.get('/', async (req, res) => { 
    res.render('index')
})

app.get('/about', async (req, res) => { 
    res.render('about')
})


app.post('/', async function (req, res) { 
    // Get user input
    var initialArticle  = req.body.initialArticle
    var finalArticle = req.body.finalArticle
    var stops = req.body.stops

    // Get the result of the Wikipedia Processor
    var result = await process.run(initialArticle, finalArticle, stops);

    res.render('result', { result: result, initial: initialArticle, initialp: process.proccessUrl(initialArticle), final: finalArticle, finalp: process.proccessUrl(finalArticle), stops: stops })
    

});



app.use('/', router);
app.listen(PORT, () => console.info(`Listening on Port ${PORT}`))








