import logProcessErrors = require("log-process-errors");

import "log-process-errors/build/register/ava";
import "log-process-errors/build/register/mocha";
import "log-process-errors/build/register/jasmine";
import "log-process-errors/build/register/tape";
import "log-process-errors/build/register/node-tap";

// test type exports
type ExceptionType = logProcessErrors.ExceptionType;
type LogLevel = logProcessErrors.LogLevel;
type LogLevelGetter = logProcessErrors.LogLevelGetter;
type Options = logProcessErrors.Options;
type EnhancedError = logProcessErrors.EnhancedError;

const restore = logProcessErrors(); // $ExpectType () => void
restore();

logProcessErrors({
    log(error, level, originalError) {
        error; // $ExpectType EnhancedError
        error.message; // $ExpectType string
        error.name; // $ExpectType "UncaughtException" | "UnhandledRejection" | "RejectionHandled" | "MultipleResolves" | "Warning"
        error.stack; // $ExpectType string

        level; // $ExpectType LogLevel
        originalError; // $ExpectType Error
    },
});
logProcessErrors({
    log(error, level, originalError) {
        return Promise.resolve();
    },
});

logProcessErrors({ level: { uncaughtException: "debug" } });
logProcessErrors({ level: { uncaughtException: "info" } });
logProcessErrors({ level: { uncaughtException: "warn" } });
logProcessErrors({ level: { uncaughtException: "error" } });
logProcessErrors({ level: { uncaughtException: "silent" } });
logProcessErrors({ level: { uncaughtException: "default" } });
// @ts-expect-error
logProcessErrors({ level: { uncaughtException: "foo" } });
logProcessErrors({
    level: {
        uncaughtException(error) {
            error; // $ExpectType EnhancedError
            return "default";
        },
    },
});
logProcessErrors({ level: { unhandledRejection: "debug" } });
logProcessErrors({ level: { rejectionHandled: "debug" } });
logProcessErrors({ level: { multipleResolves: "debug" } });
logProcessErrors({ level: { warning: "debug" } });
logProcessErrors({ level: { default: "debug" } });
// @ts-expect-error
logProcessErrors({ level: { foo: "debug" } });

logProcessErrors({ exitOn: ["uncaughtException"] });
logProcessErrors({ exitOn: ["unhandledRejection"] });
logProcessErrors({ exitOn: ["rejectionHandled"] });
logProcessErrors({ exitOn: ["multipleResolves"] });
logProcessErrors({ exitOn: ["warning"] });
// @ts-expect-error
logProcessErrors({ exitOn: ["foo"] });

logProcessErrors({ testing: "ava" });
logProcessErrors({ testing: "mocha" });
logProcessErrors({ testing: "jasmine" });
logProcessErrors({ testing: "tape" });
logProcessErrors({ testing: "node-tap" });
// @ts-expect-error
logProcessErrors({ testing: "foo" });

logProcessErrors({ colors: false });

// @ts-expect-error
logProcessErrors({ foo: "bar" });
