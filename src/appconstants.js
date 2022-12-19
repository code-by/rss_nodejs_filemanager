const LBL_CMD_PROMPT = 'You are currently in';

const CMD_EXIT = '.exit';
const CMD_UP = 'up';
const CMD_CD = 'cd';

const DEFAULT_USER_NAME = 'Guest';
const USER_NAME_ARG = '--username=';

const LABELS_ERRORS = {
    INVALID_INPUT: 'Invalid input',
    OPERATION_FAILED: 'Operation failed',
}

const OUTPUT_ERRORS = [
    LABELS_ERRORS.INVALID_INPUT,
    LABELS_ERRORS.OPERATION_FAILED,
];

export {
    LBL_CMD_PROMPT,
    CMD_EXIT,
    CMD_UP,
    CMD_CD,
    DEFAULT_USER_NAME,
    USER_NAME_ARG,
    LABELS_ERRORS,
    OUTPUT_ERRORS,
};