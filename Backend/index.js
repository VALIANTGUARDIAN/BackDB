// import express
const express = require('express');
const app = express();
const port = 5000;

const userRouter = require('./routers/userRouter');
const dbUtilRouter = require('./routers/DBUtils');
const apiRouter = require('./routers/apiRouter');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000'}));

/* app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
})); */

app.use(express.json());

app.use('/user', userRouter);
app.use('/dbutil', dbUtilRouter);
app.use('/api', apiRouter);

app.use(express.static('./archives'))

app.get('/', (req, res) => {
    res.send('Working fine');
});

app.get('/home', (req, res) => {
    res.send('Response from home');
})

// add
// delete


app.listen( port, () => { console.log('server started') } );