import { resolve, parse, join } from 'path';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import { stat, open } from 'fs/promises';

import { LABELS_ERRORS } from './index.js';


/*
Copy file (should be done using Readable and Writable streams):
cp path_to_file path_to_new_directory
*/

const exec = async (args, wPath) => {

    if (args.length < 1 || args.length > 2) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }
 
    const srcFileFullPath = resolve(wPath, args[0]);
    const srcFileName = parse(srcFileFullPath).base;

    // check source is file
    const isFileFullPath = (await stat(srcFileFullPath)).isFile();
    if (!isFileFullPath) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }
    const fdSrc = await open(srcFileFullPath);
    const source = fdSrc.createReadStream(srcFileFullPath);

    const dstFullPath = resolve(wPath, args[1])
    const dstFileFullPath = join(dstFullPath, srcFileName);
    const destination = createWriteStream(dstFileFullPath, {flags: 'wx'});

    await pipeline(source, destination);

};

/*
const commandsMap = {
    [command_cp]: exec_cp,
    [command_mv]: exec_mv,
}
*/

export const cp = {
    cp: exec,
    exec,
}

/*
export {
    exec,
}
*/