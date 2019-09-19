const express = require('express')
const app = express()
const fetch = require("node-fetch")
const fs = require('fs')

const allowCors = require('../config/cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(allowCors)

app.get("/buscarJSON", function (req, res) {
  fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=64303698a48effb62677752107150d355a274937')
    .then(response => {
      if (!response.ok)
        throw new Error()

      return response.json()
    })
    .then(response => {
      console.log(__dirname)
      const answer = JSON.stringify(response)
      fs.writeFile('answer.json', answer, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      res.send(answer)
    })
    .catch((error) => console.log('3', error))
})

app.post("/encaminharJSON", function (req, res) {
  console.log(req.body)
  const answer = JSON.stringify(req.body)

  fs.writeFile('answer.json', answer, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  // fetch('http://localhost:4001/encaminharJSON', {
  fetch('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=64303698a48effb62677752107150d355a274937', {
    method: 'post',
    body: answer,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(res => {
      console.log(res)
    })
    .catch((error) => console.log('4', error))

  res.status(200).send(answer)
})

// {
//   "code": "400",
//   "error": "invalid",
//   "message": "Invalid Content-type. Should be multipart/form-data"
// }

module.exports = app