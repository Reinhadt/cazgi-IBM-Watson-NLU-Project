const express = require('express');
const app = new express();
require('dotenv').config()

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getAnalyzeParams(type, toAnalyze, param) {
    const baseObject = {
        'features': {
            'entities': {
                'limit': 1,
            },
        },
    };
    baseObject[type] = param
    baseObject.features.entities[toAnalyze] = true;
    return baseObject;
}

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    const analyzeParams = getAnalyzeParams('url', 'emotion', req.query.url);
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result.entities[0].emotion);
    }).catch((error) => {
        return error;
    });
});

app.get("/url/sentiment", (req, res) => {
    const analyzeParams = getAnalyzeParams('url', 'sentiment', req.query.url);
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result.entities[0].sentiment);
    }).catch((error) => {
        return error;
    });
});

app.get("/text/emotion", (req, res) => {
    const analyzeParams = getAnalyzeParams('text', 'emotion', req.query.text);
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result.entities[0].emotion);
    }).catch((error) => {
        return error;
    });
});

app.get("/text/sentiment", (req, res) => {
    const analyzeParams = getAnalyzeParams('text', 'sentiment', req.query.text);
    console.log(analyzeParams);
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result.entities[0].sentiment);
    }).catch((error) => {
        return error;
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

