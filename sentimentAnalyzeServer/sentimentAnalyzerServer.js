const express = require('express');
const app = new express();
require('dotenv').config()

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

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
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
                'emotion': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result);
    }).catch((error) => {
        return error;
    });
});

app.get("/url/sentiment", (req, res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'sentiment': true,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result);
    }).catch((error) => {
        return error;
    });
});

app.get("/text/emotion", (req, res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
                'emotion': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result);
    }).catch((error) => {
        return error;
    });
});

app.get("/text/sentiment", (req, res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'sentiment': true,
                'limit': 2,
            },
        },
    };
    getNLUInstance().analyze(analyzeParams).then((results) => {
        const analisis = JSON.stringify(results);
        const { result } = JSON.parse(analisis);
        return res.send(result);
    }).catch((error) => {
        return error;
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

