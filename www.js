const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

app.use('/', function (req, res, next) {
    console.log(`req.path === ${req.path}.`);
    if (req.path.indexOf('/api') > -1) {
        next();
    } else {
        let pathname = req.path;
        if (req.path === '/') {
            pathname = '/index.html';
        }
        res.sendFile(__dirname + '/dist/angular-node' + pathname);
    }
});

let heroes = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

app.get('/api/heroes', function (req, res) {
    res.send(heroes).end();
});

app.get('/api/detail/:id', function (req, res) {
    const hero = heroes.find(e => e.id === id);
    res.send(hero).end();
});

app.listen('4200', function () {
    console.log('runing on port 4200.')
});