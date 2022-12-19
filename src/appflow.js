import { USER_NAME_ARG, DEFAULT_USER_NAME } from './appconstants.js';

let userName;

const getUserName = () => {
    const userNameArg = process.argv.find(a => a.indexOf(USER_NAME_ARG) >= 0);
    userName = userNameArg?.substring(USER_NAME_ARG.length) || DEFAULT_USER_NAME;
};

const greet = () => {
    console.log(`Welcome to the File Manager, ${userName}!`);
};

export const bye = br => {
    br && console.log('\r');
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
};

const setProcessSignals = () => {
    process.once('SIGINT', () => {
        bye(true);
    });
    process.once('SIGTERM', () => {
        bye(true);
    });    
}

const appflow = () => {
    setProcessSignals();
    getUserName();
    greet();
};

export default appflow();
