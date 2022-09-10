const { JSDOM } = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const { document } = new JSDOM(index).window;
global.document = document;
const {
  cards,
  matchCount,
  getGridSize,
  outputSeconds,
  countFlip,
} = require("../src/memory_game");

describe("index.html", function () {
  beforeEach(function (done) {
    JSDOM.fromFile(`index.html`).then(function (res) {
      browser = res;
      done();
    });
  });
  it("should have a total of 16 cards to display", () => {
    expect(cards.length).toEqual(16);
  });
  it("should check if the card flips when button is clicked", () => {
    expect(matchCount).toEqual(0);
    cards[0].click();
    expect(matchCount.innerHTML).not.toEqual(0);
  });
  it("should remove grid selection after choosing grid size", () => {
    const gridButtons = document.querySelector(".gridButton");
    gridButtons.addEventListener("click", getGridSize);
    expect(document.getElementById("grid").style.display).toBe("");
    gridButtons.click();
    expect(document.getElementById("grid").style.display).toBe("none");
  });
  it("should start timer when grid size is chosen", () => {
    expect(outputSeconds.innerHTML).toBe("00");
    cards[0].click();
    setTimeout(() => {
      expect(outputSeconds.innerHTML).not.toBe("00");
    }, 1000);
  });
  it("should increment flip count by 1 when card is clicked", () => {
    expect(countFlip).toEqual(0);
    cards[0].click();
    cards[1].click();
    expect(document.getElementById("flips").innerHTML).toBe("2");
  });
});
