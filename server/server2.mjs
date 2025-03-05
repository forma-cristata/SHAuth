import express from 'express';
import bodyParser from 'express';
import cors from 'cors';
import { octokit, WriteClassesToFile} from "./modules/classes.mjs";
import { ParseAssignmentNames, WriteAssignmentsToFile} from "./modules/assignments.mjs";
import fs from "fs";
import cron from 'node-cron';
import compression from 'compression';

const app = express();
const PORT = 3009;

app.use(bodyParser.json());
app.use(compression());

// pollTime: string, hour: string, minute: string
const pollTime = JSON.parse(fs.readFileSync('./database/app.config.json', 'utf8')).pollTime;
const hour = pollTime.split(":")[0];
const minute = pollTime.split(":")[1];

pollClassesAndAssignments().then(cron.schedule(`${minute} ${hour} * * *`, pollClassesAndAssignments));

/**
 * Starts the server and listens on the specified port.
 */
app.listen(PORT, () => {
    process.stdout.write(`\\\x1b[34m \rUtility Server is actively polling at http://localhost:${PORT}.\n`);
});

/**
 * Handles GET requests for manual polling.
 */
app.get(`/refresh`, async (req, res) => {
    process.stdout.write(`\\\x1b[36m  \rManual poll request received from ${req.get('host')}.\n`);
    await pollClassesAndAssignments();
    res.json("fini");
});

/**
 * Polls classes and assignments from GitHub and updates the cache.
 */
async function pollClassesAndAssignments() {
    // classes: string[]
    let classes = await ClassesGHRequest();
    if(classes){
        for(let i = 0; i < classes.length; i++)
        {
            await AssignmentsGHRequest(classes[i])
        }
    }
}

/**
 * Fetches classes from GitHub.
 * @returns {Promise<string[]>} - A promise that resolves to an array of class IDs.
 */
async function ClassesGHRequest() {
    try {
        let data = (await octokit.request('GET /classrooms', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        return await ParseClasses(data);
    } catch (e) {
        process.stdout.write("\\\x1b[31m \rError occurred in poll while processing request to GitHub for Classrooms. Error occurs at server2 line 65.\n");
    }
}

/**
 * Parses classes from the GitHub API response data.
 * @param {Object[]} data - The data returned from the GitHub API.
 * @returns {Promise<string[]>} - A promise that resolves to an array of class IDs.
 */
async function ParseClasses(data) {
    // classes: string[] classIds: string[]
    let classes = [];
    let classIds = [];
    for (let i = 0; i < data.length; i++) {
        classIds.push(data[i].id.toString());
        classes.push(data[i].name);
        classes.push(data[i].id.toString());
    }
    WriteClassesToFile(classes);
    return classIds;
}

/**
 * Fetches assignments from GitHub for a given class ID.
 * @param {number} cId - The ID of the class.
 * @returns {Promise<string[]>} - A promise that resolves to an array of assignment names.
 */
async function AssignmentsGHRequest(cId) {
    try {
        let data = (await octokit.request(`GET /classrooms/${cId}/assignments`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        // aNames: string[]
        let aNames = ParseAssignmentNames(data);
        WriteAssignmentsToFile(aNames, cId);
        return aNames;
    } catch (e) {
        process.stdout.write(`\\\x1b[31m \rError occurred in poll while processing request to GitHub for Assignments in Classroom: ${cId}. Error occurs at server2 line 52.\n`);
    }
}