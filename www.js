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
        if (req.path === '/' || req.path.indexOf('.') < 0) {
            pathname = '/index.html';
        }
        res.sendFile(__dirname + '/dist/angular-node' + pathname);
        // res.sendFile(__dirname + '/dist/angular-node/index.html');
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

app.get('/api/heroes', (req, res) => {
    res.send(heroes).end();
});

app.get('/api/heroesPage', (req, res) => {
    const param = req.query;
    const start = (param.page - 1) * param.countPerPage;
    const end = Math.min(heroes.length, param.page * param.countPerPage);
    res.send({
        heroes: heroes.slice(start, end),
        total: heroes.length
    }).end();
});

app.get('/api/detail', (req, res) => {
    const id = +req.query.id;
    const hero = heroes.find(e => e.id === id);
    res.send(hero).end();
});

app.post('/api/addHero', (req, res) => {
    const param = req.query;
    const id = getId();
    const hero = {
        id: id,
        name: param.name
    };
    heroes.push(hero);
    res.send(hero).end();
});

app.delete('/api/deleteHero', (req, res) => {
    const param = req.query;
    heroes = heroes.filter(e => e.id !== +param.id);
    res.send(param.id).end();
});

app.post('/api/update', (req, res) => {
    const param = req.query;
    let hero = heroes.find(e => e.id === +param.id);
    hero.name = param.name;
    res.send().end();
});

app.get('/api/search', (req, res) => {
    const name = req.query.name.toLowerCase();
    let results = heroes.filter(e => e.name.toLowerCase().indexOf(name) > -1);
    res.send(results).end();
});

app.listen('4200', function () {
    console.log('runing on port 4200.')
});

const getId = () => {
    const sortList = heroes.sort((a, b) => a.id - b.id);
    let id = sortList[sortList.length - 1].id + 1;
    return id;
}