import express from 'express';
import bodyParser from "express";
import cors from 'cors';
import {AssignmentsCacheRequest} from "./modules/assignments.mjs";
import {ClassesCacheRequest} from "./modules/classes.mjs";
import {shaGHRequest, generateFeedback} from "./modules/shas.mjs";
import compression from 'compression';

const app = express();
const PORT = 3012;

app.use(bodyParser.json());
app.use(compression());

/**
 * Starts the server and listens on the specified port.
 */
app.listen(PORT, () => {
    process.stdout.write(`\\\x1b[34m \rServer is listening on http://localhost:${PORT}.\n`);
});

/**
 * Handles GET requests for classes.
 */
app.get(`/classes`, async (req, res) => {
    process.stdout.write(`\\\x1b[36m \rReceived a request for classes from ${req.get('host')}.\n`);
    let data = await ClassesCacheRequest();
    res.json(data);
});

/**
 * Handles GET requests for assignments.
 */
app.get(`/assignments`, async (req, res) => {
    process.stdout.write(`\\\x1b[36m \rReceived a request for assignments from ${req.get('host')}.\n`);
    let data = await AssignmentsCacheRequest(req.query.classname);
    res.json(data);
});

/**
 * Handles GET requests for SHA validation.
 */
app.get('/shas', async (req, res) => {
    process.stdout.write(`\\\x1b[36m \r \rReceived a request for SHA Validation from ${req.get('host')}.\n`);
    let username = req.query.username;
    let assignment = req.query.assignment;
    let shaToCheck = req.query.sha;
    let validSHAs = await shaGHRequest(assignment, username);
    res.json([generateFeedback(validSHAs, shaToCheck)]);
});
