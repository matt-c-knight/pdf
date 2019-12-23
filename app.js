const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const puppeteer = require('puppeteer');


inquirer
    .prompt({
        message: "Enter your GitHub username:",
        name: "username"
    })
    .then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function(res) {
            fs.writeFile("index.html", 
            `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
            img {
                width: 200px;
                height: 200px;
            }
            </style>
            </head>
            <body>
            <h1>Matt Knight Resume</h1>
            <img src="${res.data.avatar_url}">
            <p>Location: ${res.data.location}</p>
            <p>Github: "${res.data.html_url}"</p>
            <p>I am a junior web developer from Austin, TX. My previous career experience is in the financial industry. My skills include HTML, CSS/Bootstrap, Javascript, jQuery, Node/Express, and MySQL.</p>
            <p>Github Repositories: ${res.data.public_repos}</p>
            <p>Followers: ${res.data.followers}</p>
            <p>Following: ${res.data.following}</p>
            </body>
            </html>`, 
            function(err) {
              if (err) {
                  throw err;
                }
            })
        })
    }).then(function() {
              (async () => {
                
                const browser = await puppeteer.launch();
            
                const page = await browser.newPage();
                const html = fs.readFileSync("./index.html", "utf8");
            
                await page.setContent(html);
            
                await page.pdf({
                    path: 'index.pdf'
                });
            
                await browser.close();
            })();
    })

   