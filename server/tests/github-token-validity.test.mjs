import {assert} from "chai";
import {ClassesGHRequest} from "../modules/classes.mjs";

/**
 * Tests that your GitHub token is valid.
 * Tests that your organization name is valid (i.e. returns classes).
 * Useful for running the application in a CI/CD pipeline.
 */

describe('server', function() {
    describe('modules', function() {
        describe('classes.mjs', function() {
            it('ClassesGHRequest() should return an array of classes', async function () {
                // Test goes here
                let classesArray = await ClassesGHRequest();
                console.log(classesArray);
                assert.notEqual(classesArray, undefined);
            })
        })
    })
});