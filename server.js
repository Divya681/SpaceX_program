const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/SpaceXProgram/browser'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/SpaceXProgram/browser/index.html'));
});
ngApp.listen(process.env.PORT || 8080);