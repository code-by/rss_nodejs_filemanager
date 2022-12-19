import { EOL, cpus as os_cpus, homedir as homedir_os, userInfo } from 'os';
import { LABELS_ERRORS } from './index.js';

const command = 'os';

/*
    Get EOL (default system End-Of-Line) and print it to console
    os --EOL
*/
const eol = () => {
    console.log(JSON.stringify(EOL));
};

/*
    Get host machine CPUs info
    (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
    and print it to console
    os --cpus
*/
const cpus = () => {
    const cpuData = os_cpus().map(({ model, speed }) => ({ model, speed }));
    console.log('CPU cores amount:', os_cpus().length);
    console.log('CPU cores info:');
    console.log(cpuData);
};

/*
    Get home directory and print it to console
    os --homedir
*/
const homedir = () =>
    console.log(homedir_os());

/*
    Get current system user name
    (Do not confuse with the username that is set when the application starts)
    and print it to console
    os --username
*/
const username = () =>
    console.log(userInfo().username);

/*
    Get CPU architecture for which Node.js binary has compiled and print it to console
    os --architecture
*/
const architecture = () =>
    console.log(os.architecture());


const argsMap = {
    '--EOL': eol,
    '--cpus': cpus,
    '--homedir': homedir,
    '--username': username,
    '--architecture': architecture,
};

const exec = async (args) => {
    if (args.length != 1) {
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }
    const proceedArg = argsMap[args[0]];
    if (proceedArg) {
        await proceedArg();
    } else {
        // TODO
        throw new Error(LABELS_ERRORS.INVALID_INPUT);
    }
};


export const os = ({
    os: exec,
    exec,
});
