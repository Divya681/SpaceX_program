const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/SpaceXProgram/browser'));

app.get('/*', (req:any, res:any) =>
    res.sendFile('index.html', {root: 'dist/SpaceXProgram/browser/index.html'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);