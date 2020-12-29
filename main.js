const express = require('express');
const app = require('https-localhost')()
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use('/public', express.static('public'));

app.use(cors({
    origin: 'https://foo.com:3000',
    credentials: true,
}));
app.use(cookieParser());

app.post('/set-cookie', (req, res) => {
    res.cookie(req.query.key, req.query.value, {
        domain: req.hostname,
        secure: true,
        sameSite: 'None',
    });
    res.send('hello world');
});

app.get('/echo-cookie', (req, res) => {
    res.send(req.cookies[req.query.key]);
    console.log(req.cookies);
});

app.listen(3000, () => {
    console.log('start listening');
});
