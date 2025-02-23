import {Octokit} from "octokit";
import fs from "fs";
export {WriteClassesToFile, ParseClasses, ClassesGHRequest, ClassesCacheRequest, octokit};

// ghToken: string
const ghToken = JSON.parse(fs.readFileSync('../app.config.json', 'utf8')).gitHubAccessToken;
const octokit = new Octokit({
    auth: ghToken
});

/**
 * Fetches classes from GitHub.
 * @returns {Promise<string[]>} - A promise that resolves to an array of class names.
 */
async function ClassesCacheRequest() {
    // path: string
    const path = `../database/classes.json`;
    // cachedClasses: string[]
    let cachedClasses = [];
    try {
        const data = fs.readFileSync(path, 'utf8');
        cachedClasses = JSON.parse(data);
        return ParseClassNames(cachedClasses);
    } catch (e) {
        return await ClassesGHRequest();
    }
}

/**
 * Parses classes from the GitHub API response data.
 * @param {Object[]} data - The data returned from the GitHub API.
 * @returns {string[]} - An array of class names.
 */
function ParseClassNames(data) {
    // cNames: string[]
    let cNames = [];
    for (let i = 0; i < data.length; i = i + 2) {
        cNames.push(data[i]);
    }
    return cNames;
}

/**
 * Fetches classrooms from GitHub.
 * @returns {Promise<string[]>} - A promise that resolves to an array of class names.
 */
async function ClassesGHRequest() {
    try {
        let data = (await octokit.request('GET /classrooms', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        return ParseClasses(data);

    } catch (e) {
        process.stdout.write("\\\x1b[31m \nAn error occurred while processing the response from GitHub to the request for classrooms. The error occurs at classes.mjs line 47.\n");
    }
}

/**
 * Parses classes from the GitHub API response data.
 * @param {Object[]} data - The data returned from the GitHub API.
 * @returns {string[]} - An array of class names.
 */
function ParseClasses(data) {
    // classes: string[]
    let classes = [];
    // classNames: string[]
    let classNames = [];
    for (let i = 0; i < data.length; i++) {
        classNames.push(data[i].name);
        classes.push(data[i].name);
        classes.push(data[i].id.toString());
    }
    WriteClassesToFile(classes);
    return classNames;
}

/**
 * Writes classroom names to a file for caching.
 * @param {string[]} classes - An array of class names.
 */
function WriteClassesToFile(classes) {
    // path: string
    const path = `../database/classes.json`;
    try {
        fs.writeFileSync(path, JSON.stringify(classes));
        process.stdout.write(`\\\x1b[32m \rFile at ${path} written successfully.\n`);

    } catch (e) {
        process.stdout.write(`\\\x1b[31m \rAn error occurred while writing to the file at ${path}. Error occurs at classes.mjs line 35.\n`);
    }
}