import { exec } from './proceed.js';

import { LABELS_ERRORS } from '../../appconstants.js';

const commandsMap = {
    compress: exec,
    decompress: (...args) => {
        exec(...args, '', true)
    }
};

export const arch = {
    ...commandsMap,
};

export {
    LABELS_ERRORS,
};
