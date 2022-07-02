const { JSDOM } = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");

const { document } = new JSDOM(index).window;
global.document = document;
const { cards, matchCount } = require("../src/memory_game");

describe("index.html", function () {
  beforeEach(function (done) {
    JSDOM.fromFile(`index.html`).then(function (res) {
      browser = res;
      done();
    });
  });
  it(`should have </div> element`, function () {
    const div = browser.window.document.querySelector(`div`);
    expect(div).not.toBe(null);
  });
  it(`should have </script> element`, function () {
    const script = browser.window.document.querySelector(`script`);
    expect(script).not.toBe(null);
  });
  it(`should have </img> element`, function () {
    const img = browser.window.document.querySelector(`img`);
    expect(img).not.toBe(null);
  });
  it("should have 12 cards displayed", () => {
    expect(cards.length).toEqual(12);
  });
  it("should check if the card flips when button is clicked", () => {
    expect(matchCount).toEqual(0);
    cards[0].click();
    expect(matchCount.innerHTML).not.toEqual(0);
  });
});
