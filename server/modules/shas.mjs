import {organization} from "./assignments.mjs";
import {octokit} from "./classes.mjs";
export {shaGHRequest, generateFeedback};

/**
 * Encodes the assignment title by replacing spaces with hyphens and converting to lowercase.
 * @param {string} sTitle - The title of the assignment.
 * @returns {string} - The encoded title.
 */
function titleEncoding(sTitle) {
    return sTitle.replace(/ /g, "-").toLowerCase();
}

/**
 * Fetches the commit SHAs from GitHub for a given assignment and username.
 * @param {string} assignment - The title of the assignment.
 * @param {string} username - The username of the student.
 * @returns {Promise<string[]>} - A promise that resolves to an array of commit SHAs.
 */
async function shaGHRequest(assignment, username) {
    try {
        let data = (await octokit.request(`GET /repos/${organization}/${titleEncoding(assignment)}-${username}/commits`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        // shas: string[]
        let shas = [];
        for (let i = 0; i < data.length; i++) {
            shas.push(data[i].sha);
        }
        return shas;
    }
    catch (e) {
        process.stdout.write("\\\x1b[31m \rAn error occurred at sha.mjs line 26. Repository not found. \n")
        return [];
    }
}

/**
 * Generates feedback based on the validity of the provided commit SHA.
 * @param {string[]} validSHAs - An array of valid commit SHAs.
 * @param {string} shaToCheck - The commit SHA to check.
 * @returns {string} - Feedback indicating whether the commit SHA is valid or invalid.
 */
function generateFeedback(validSHAs, shaToCheck) {
    if(validSHAs.length === 0) {
        return "INo Commits Found for this Assignment";
    }
    // valid: boolean
    let valid = validSHAs.includes(shaToCheck);
    return valid ? "VCommit ID is Valid for this Assignment" : "ICommit ID is Invalid for this Assignment";
}