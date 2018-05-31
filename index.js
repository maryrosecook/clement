function runAndLogReport(testFn) {
  console.log(runAndReturnReport(testFn));
};

function runAndReturnReport(testFn) {
  try {
    const isEqualReport = testFn(getIsEqualReport);
    if (!isEqualReport.isPassed) {
      return failedWithUnmetExpectationTestCaseReport(
        testFn, isEqualReport.actual);
    }

    return passedTestCaseReport(testFn);
  } catch (exception) {
    return failedWithExceptionTestCaseReport(testFn, exception);
  }
};

function getIsEqualReport(_, actual, _, expected) {
  return {
    isPassed: actual === expected,
    actual
  };
};

function passedTestCaseReport(testFn) {
  return [
    "✅",
    expectationFromTestFn(testFn)
  ].join(" ");
};

function failedWithUnmetExpectationTestCaseReport(
  testFn, actual) {
  return [
    "❌",
    expectationFromTestFn(testFn),
    "\n  ",
    "but it equals",
    actual
  ].join(" ");
};

function failedWithExceptionTestCaseReport(testFn, exception) {
  return [
    "❌",
    expectationFromTestFn(testFn),
    "\n  ",
    "but get error",
    `\`${exception.message}\``,
    "\n  ",
    "on line",
    exceptionFirstLineNumber(exception),
  ].join(" ")
};

function expectationFromTestFn(testFn) {
  return /\((.+)\)$/.exec(testFn.toString())[1];
};

function exceptionFirstLineNumber(exception) {
  return /:(\d+):\d+\)$/g
    .exec(
      exception.stack.split("\n")[1]
    )[1];
};

module.exports = runAndLogReport;
runAndLogReport.runAndReturnReport = runAndReturnReport;
