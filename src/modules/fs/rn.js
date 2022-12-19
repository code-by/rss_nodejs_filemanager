import { resolve, sep } from 'path';
import { rename, stat } from 'fs/promises';
import { LABELS_ERRORS } from './index.js';

/*
    Rename file (content should remain unchanged):
    rn path_to_file new_filename
*/

const exec = async (args, wPath) => {

    if (args.length < 1 || args.length > 2) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    const srcFileFullPath = resolve(wPath, args[0]);
    const dstFileFullPath = resolve(wPath, args[1]);

    const isFileFullPath = (await stat(srcFileFullPath)).isFile();

    if (!isFileFullPath ||
        srcFileFullPath == dstFileFullPath
    ) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    await rename(srcFileFullPath, dstFileFullPath);

}

export const rn = ({
    rn: exec,
    exec,
});