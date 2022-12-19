import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { resolve } from 'path';

import { LABELS_ERRORS } from './index.js';

/*
    Calculate hash for file and print it into console
    hash path_to_file
*/

const exec = async (args, wPath) => {
    // console.log('hash command');
    if (args.length != 1) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }
    const fileFullPath = resolve(wPath, args[0]);
    const fileContent = await readFile(fileFullPath, { encoding: 'utf8' });
    const hash = createHash('sha256').update(fileContent).digest('hex');
    console.log(hash);
}

export const hash = {
    hash: exec,
}
