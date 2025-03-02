import {assert} from "chai";
import { WriteAssignmentsToFile} from "../modules/assignments.mjs";
import fs from "fs";

describe('server', function() {
    describe('modules', function() {
        describe('assignments', function() {
            it('WriteAssignmentsToFile(assignments, cId) should successfully write to the correct filepath', function() {
                // Test goes here
                const classId = 45;
                const path = WriteAssignmentsToFile(["Assignment1", "TeStInG", "__**moreCla33es"], classId);
                assert.equal(path , `../database/assignments${classId}.json`);
                fs.unlinkSync(path);
            });

        })
    })
});
