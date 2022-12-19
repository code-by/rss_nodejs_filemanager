import { os } from './os.js';
import { LABELS_ERRORS } from '../../appconstants.js';

const commandsMap = {
    ...os,
};

export const system = {
    ...commandsMap,
}

export {
    LABELS_ERRORS,
};
