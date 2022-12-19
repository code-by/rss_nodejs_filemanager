import { ls } from './ls.js';
import { cat } from './cat.js';
import { add } from './add.js';
import { rn } from './rn.js';
import { cp } from './cp.js';
import { rm } from './rm.js';
import { mv } from './mv.js';

import { LABELS_ERRORS } from '../../appconstants.js';


const fs = {
    ...ls,
    ...cat,
    ...add,
    ...rn,
    ...cp,
    ...rm,
    ...mv,
};

export {
    fs,
    LABELS_ERRORS,
}
