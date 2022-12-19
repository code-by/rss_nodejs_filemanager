import { readdir } from 'fs/promises';

import { LABELS_ERRORS } from './index.js';


const sortEntries = (a, b) =>
    a.Name.localeCompare(b.Name);

const getEntryData = entry => ({
    Name: entry.name,
});

const proceedEntries = (entries, wPath) => {

    const files = [];
    const dirs = [];
    for (const entry of entries) {
        if (entry.isFile()) {
            files.push({
                ...getEntryData(entry, wPath),
                Type: 'file',
            });
        } else if (entry.isDirectory()) {
            dirs.push({
                ...getEntryData(entry, wPath),
                Type: 'directory',
            });
        }
    }

    return [
        ...dirs.sort(sortEntries),
        ...files.sort(sortEntries),
    ];
}

const exec = async (args, wPath) => {
    if (args > 0) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }
    const dirEntries = await readdir(wPath, { withFileTypes: true });
    if (!dirEntries || !dirEntries.length) {
        return;
    };
    const outputEntries = proceedEntries(dirEntries, wPath);
    console.table(outputEntries);
}

export const ls = {
    ls: exec,
    exec,
};
