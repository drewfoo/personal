// require node modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// this calls connect mongo and allows it access to the session
const MongoStore = require('connect-mongo')(session);

const app = express();

// Want to add - chalk, morgan, and debug NPM modules to learn how to debug


// MongoDB Connection
const url = 'mongodb://localhost:27017/Personal';
mongoose.connect(url);
const db = mongoose.connection;
// Mongo Error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('"Connected Successfully to the Server');
});

// Use Sessions for Tracking Logins
// Will need to eventually change the sesssion store using mongo db
// set a new mongo  store for the session storage middleware
app.use(session({
    secret: 'password',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// make another middleware for the User ID available to our templates
// locals in the response is something views can access
app.use(function(req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
})

// Parse Incoming Requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Static Files and View Engine Setup
app.use(express.static('assets'));
app.set('view engine', 'pug');
app.set('views', [__dirname + '/views/', __dirname + '/views/playbook']);

// Import and Use Route Files

const mainRoutes = require('./routes');
const playbookRoutes = require('./routes/playbook');
// const siteMap = require('./routes/sitemap');

app.use(mainRoutes);
app.use(playbookRoutes);
// app.use(siteMap);

// Catch 404 Errors and Forward to Error Handler
app.use(function(req, res, next) {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// Error Handler and Define as the Last App.Use Callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// server information
app.listen(8000, function() {
    console.log('App Listening to Port 8000');
});

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    // eslint-disable-next-line camelcase
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    gmail.users.labels.list({
        userId: 'me',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const labels = res.data.labels;
        if (labels.length) {
            console.log('Labels:');
            labels.forEach((label) => {
                console.log(`- ${label.name}`);
            });
        } else {
            console.log('No labels found.');
        }
    });
}