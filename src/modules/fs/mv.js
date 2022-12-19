import { cp } from './cp.js';
import { rm } from './rm.js';

const exec = async (args, wPath) => {

    if (args.length < 1 || args.length > 2) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }

    await cp.exec(args, wPath);

    await rm.exec([args[0]], wPath);
}

export const mv = ({
    mv: exec,
    exec,
});