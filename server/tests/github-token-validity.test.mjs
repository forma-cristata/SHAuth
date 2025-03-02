import {assert} from "chai";
import {ClassesGHRequest} from "../modules/classes.mjs";

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