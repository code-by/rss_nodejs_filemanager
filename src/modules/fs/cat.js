import { createReadStream } from 'fs';
import { resolve as fsResolve } from 'path';

import { LABELS_ERRORS } from './index.js';


/*
    Read file and print it's content in console (should be done using Readable stream):
    cat path_to_file
*/

const exec = async (args, wPath) => {

    if (args.length != 1) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    await new Promise((res, rej) => {

        const fileFullPath = fsResolve(wPath, args[0]);
        const stream = createReadStream(fileFullPath);

        stream.on('error', (e) => {
            rej(LABELS_ERRORS.OPERATION_FAILED);
        });
        stream.on('end', () => {
            res();
        });
        stream.on('data', (row) => {
            console.log(row.toString());
        });
    });
}

export const cat = ({
    cat: exec,
    exec,
});