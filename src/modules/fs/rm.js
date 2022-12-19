import { resolve } from 'path';
import fs from 'fs/promises';

import { LABELS_ERRORS } from './index.js';

/*
    Delete file:
    rm path_to_file
*/

const exec = async (args, wPath) => {

    if (args.length != 1) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    const fileFullPath = resolve(wPath, args[0]);

    // check is file
    const isFile = (await fs.stat(fileFullPath)).isFile();
    if (!isFile) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    await fs.rm(fileFullPath);

}

export const rm = {
    rm: exec,
    exec,
}
