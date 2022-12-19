import { hash } from './hash.js';
import { LABELS_ERRORS } from '../../appconstants.js';

const commandsMap = {
    ...hash,
};

export const crypto = {
    ...commandsMap,
}

export {
    LABELS_ERRORS,
};
