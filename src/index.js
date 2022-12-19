import { homedir } from 'os';
import * as readline from 'readline';
import {
    access as fsAccess,
    constants as fsConstants,
    stat as fsStat
} from 'fs/promises';
import { resolve } from 'path';

import {
    CMD_EXIT,
    CMD_UP,
    CMD_CD,
    LBL_CMD_PROMPT,
    LABELS_ERRORS,
    OUTPUT_ERRORS,
} from './appconstants.js';
import { bye } from './appflow.js';

import { arch } from './modules/arch/index.js';
import { crypto } from './modules/crypto/index.js';
import { fs } from './modules/fs/index.js';
import { system } from './modules/system/index.js';


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {
    exec: _,
    ...commandsMap
} = {
    ...arch,
    ...crypto,
    ...fs,
    ...system
};


let wPath = homedir();

const cmdPrompt = wPath =>
    `${LBL_CMD_PROMPT} ${wPath} `;

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
})

rl.on('close', () => bye(true));

const ask = async question => {
    rl.question(question, async (userInput) => {

        try {

            if (!userInput) {
                throw new Error(LABELS_ERRORS.INVALID_INPUT);
            }
            const userInputArr = userInput ? userInput.trim().match(/(?:[^\s"]+|"[^"]*")+/g) : [];
            const userCommand = userInputArr[0];
    
            // TODO: move to external file ?
            if (userCommand === CMD_EXIT) {
                rl.close();
                bye();
                return;
            }
            if (userCommand === CMD_UP) {
                if (userInputArr.length > 1) {
                    // no args expected for 'up'
                    throw new Error(LABELS_ERRORS.INVALID_INPUT);
                }
                wPath = resolve(wPath, '..');
                await ask(cmdPrompt(wPath));
                return;
            }
            if (userCommand === CMD_CD) {
                if (userInputArr.length != 2) {
                    // only 1 arg expected for 'cd'
                    throw new Error(LABELS_ERRORS.INVALID_INPUT);
                }
                const cdToPath = userInputArr[1];
                const wPathTemp = resolve(wPath, cdToPath);
                // check access
                await fsAccess(wPathTemp, fsConstants.R_OK);
                // check is folder
                const stat = await fsStat(wPathTemp); 
                if (!stat.isDirectory()) {
                    throw new Error(LABELS_ERRORS.OPERATION_FAILED);
                }
                wPath = wPathTemp;
                await ask(cmdPrompt(wPath));
                return;
            }

            const isValidCommand = !!commandsMap[userCommand];
            if (!isValidCommand) {
                throw new Error(LABELS_ERRORS.INVALID_INPUT);
            }
            const restArgs = userInputArr.splice(1);
            process.stdin.pause();
            const execCommand = commandsMap[userCommand];
            await execCommand(restArgs, wPath);
        } catch (e) {
            if (OUTPUT_ERRORS.indexOf(e?.message) >= 0) {
                console.log(e.message);
            } else if(e?.code) {
                console.log(LABELS_ERRORS.OPERATION_FAILED);            
            }
        } finally {
            process.stdin.resume();
            await ask(cmdPrompt(wPath));
        }
    })
}

await ask(cmdPrompt(wPath));

// TODO:
/*
    remove debug code
    remove comments
    remove unused files
    check arg is folder instead of file
        cd, cp.2, mv.2
    check arg is file instead of folder
        cat, add, rn, cp.1, mv.1, rm +
*/
