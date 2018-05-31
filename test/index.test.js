const expect = require('chai').expect;
const sinon = require("sinon");
const runAndLogReport = require("../index");
const runAndReturnReport = runAndLogReport.runAndReturnReport;

describe("sunlit", () => {
  describe("runAndLogReport", () => {
    it("logs test case run report", () => {
      let consoleLogStub = sinon.stub(console, "log");

      function returnTrue() {
        return true;
      };

      runAndLogReport(_ => _("Expect", returnTrue(), "to equal", true));

      expect(consoleLogStub.calledWith(
        '✅ "Expect", returnTrue(), "to equal", true'))
        .to.equal(true);

      consoleLogStub.restore();
    });
  });

  describe("runAndReturnReport", () => {
    it("returns test passed message if test passes", () => {
      function returnTrue() {
        return true;
      };

      expect(runAndReturnReport(
        _ => _("Expect", returnTrue(), "to equal", true)))
        .to.equal(
          '✅ "Expect", returnTrue(), "to equal", true');
    });

    it("returns not equal message if actual and expected not equal", () => {
      function returnTrue() {
        return true;
      };

      expect(runAndReturnReport(
        _ => _("Expect", returnTrue(), "to equal", false)))
        .to.equal(
          '❌ "Expect", returnTrue(), "to equal", false \n   but it equals true');
    });

    it("returns error and line number if exception thrown", () => {
      expect(runAndReturnReport(
        _ => _("Expect", returnTrue(), "to equal", false)))
        .to.equal(
          '❌ "Expect", returnTrue(), "to equal", false \n   but get error `returnTrue is not defined` \n   on line 58');
    });
  });
});
