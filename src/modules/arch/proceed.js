import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { resolve } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

import { LABELS_ERRORS } from './index.js';

const command = 'compress';

/*
    Compress file (using Brotli algorithm, should be done using Streams API)
    compress path_to_file path_to_destination

    Decompress file (using Brotli algorithm, should be done using Streams API)
    decompress path_to_file path_to_destination
    NB! After decompressing of previously compressed file result should not
    differ with originally compressed file
*/

// TODO:
// could be moved into separate file
// for sharing in eg. networks
const getTransform = (alg, decompress) => {
    switch (alg) {
        case 'brotli': {
            return (decompress ?
                createBrotliDecompress() :
                createBrotliCompress());
        }
    }

};

const exec = async (args, wPath, alg, decompress = false) => {

    if (args.length != 2) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    // NB:
    // destanation is file, not folder
    // https://discord.com/channels/755676888680366081/1049609531006660658/1053938917755326474
    const srcFileFullPath = resolve(wPath, args[0]);
    const dstFileFullPath = resolve(wPath, args[1]);

    const source = createReadStream(srcFileFullPath);
    const destination = createWriteStream(dstFileFullPath);
    const transform = getTransform(alg || 'brotli', decompress);

    const pipe = promisify(pipeline);
    await pipe(source, transform, destination);
}

export {
    exec,
}

export default command;