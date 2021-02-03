import express from "express";

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define the about route
router.get('/test', function (req, res) {
    throw  new Error("Whoops!")
    res.send('About birds')
})

export default router