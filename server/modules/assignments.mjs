import fs from "fs";
import {octokit} from "./classes.mjs";
export {WriteAssignmentsToFile, ParseAssignmentNames, AssignmentsGHRequest, AssignmentsCacheRequest, organization};

// organization: string
const organization = JSON.parse(fs.readFileSync('../app.config.json', 'utf8')).organization;


/**
 * Fetches cached assignments for a given class and username.
 * If the cache is not available, it fetches the assignments from GitHub.
 * @param {string} cName - The name of the class.
 * @param {string} username - The username of the student.
 * @returns {Promise<string[]>} - A promise that resolves to an array of assignment names.
 */
async function AssignmentsCacheRequest(cName, username) {
    // classPath: string
    const classPath = '../database/classes.json';
    // cId: number
    let cId = 0;
    let cachedAssignments = [];
    try {
        // classData: string
        const classData = fs.readFileSync(classPath, 'utf8');
        // classes: string[]
        let classes = JSON.parse(classData);
        cId = parseInt(classes[classes.indexOf(cName) + 1]);
    } catch (e) {
        process.stdout.write(`\\\x1b[31m \rAn error occured while reading from the file at ${classPath}. Error occurs at assignments.mjs line 51.\n`);
    }
    // assPath: string
    const assPath = `../database/assignments${cId}.json`;
    try {
        // data: string
        const data = fs.readFileSync(assPath, 'utf8');
        cachedAssignments = JSON.parse(data);
        return cachedAssignments;
    } catch (e) {
        return await AssignmentsGHRequest(cId, username);
    }
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
        process.stdout.write(`\\\x1b[31m \rAn error occurred while processing the response from GitHub to the request for Classroom ${cId} assignments. Error occurs at assignments.mjs line 33.\n`);
    }
}

/**
 * Parses assignment names from the GitHub API response data.
 * @param {Object[]} data - The data returned from the GitHub API.
 * @returns {string[]} - An array of assignment names.
 */
function ParseAssignmentNames(data) {
    // aNames: string[]
    let aNames = [];
    for (let i = data.length - 1; i >= 0; i--) {
        aNames.push(data[i].title);
    }
    return aNames;
}

/**
 * Writes assignment names to a file for caching.
 * @param {string[]} assignments - An array of assignment names.
 * @param {number} cId - The ID of the class.
 */
function WriteAssignmentsToFile(assignments, cId) {
    // path: string
    const path = `../database/assignments${cId}.json`;
    try {
        fs.writeFileSync(path, JSON.stringify(assignments));
        process.stdout.write(`\\\x1b[32m \rFile at ${path} written successfully.\n`);
    } catch (e) {
        process.stdout.write(`\\\x1b[31m \rAn error occurred while writing to the file at ${path}. Error occurs at assignments.mjs line 16.\n`);
    }
}