const newrelic = require('newrelic');

/**
 * Custom Exception object with stack trace
 * @param message
 * @param code
 * @constructor
 */
function TestMultiStepException(message, code) {
    code = code || 500;
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.name = 'TestMultiStepException';
    this.code = code;
}

function step1() {
    console.log('step 1');
    step2();
}

function step2() {
    console.log('step 2');
    step3();
}

function step3() {
    console.log('step 3');
    throw new TestMultiStepException('This is an error step 3 with error stack track abstraction', 500);
}

setInterval(function () {
    try {
        step1();
    } catch (error) {
        newrelic.noticeError(error, {
            'code': error.code,
            'param2': 'test',
            'param3': 'test',
            'param4': 'test',
        });
        console.log('error noticed');
    }
}, 500);
