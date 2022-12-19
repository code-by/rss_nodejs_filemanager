import { resolve } from 'path';
import { open } from 'fs/promises';

import { LABELS_ERRORS } from './index.js';


/*
    Create empty file in current working directory:
    add new_file_name
*/

const exec = async (args, wPath) => {

    if (args.length != 1) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    const fileFullPath = resolve(wPath, args[0]);
    const fh = await open(fileFullPath, 'ax+');
    if (fh) {
        await fh.close();
    } else {
       throw new Error(LABELS_ERRORS.OPERATION_FAILED);
    }
}

export const add = ({
    add: exec,
    exec,
});
