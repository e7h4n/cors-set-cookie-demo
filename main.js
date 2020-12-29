const express = require('express');
const app = require('https-localhost')()
const cookieParser = require('cookie-parser');

app.use('/public', express.static('public'));
app.use(cookieParser());

// set cors headers
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'https://foo.com:3000');
    res.set('Access-Control-Allow-Credentials', 'true');
    next();
});

app.post('/set-cookie', (req, res) => {
    res.cookie(req.query.key, req.query.value, {
        domain: req.hostname,
        secure: true,
        sameSite: 'None',
    });
    res.send('hello world');
});

app.post('/echo-cookie', (req, res) => {
    res.send(req.cookies[req.query.key]);
});

app.listen(3000, () => {
    console.log('start https listening');
});
