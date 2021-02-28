var funFacts = [
  "A shade tree can help cool your home or office building by as much as 20 degrees in the summertime. -hgtv.com",
  "Trees help improve our water quality as they slow and filter rainfall. -hgtv.com",
  "No other organism on Earth lives as long as a tree. -hgtv.com",
  "Have you ever knocked on wood for good luck? That superstition may have originated with primitive peoples who believed benevolent spirits lived in the trees. -hgtv.com",
  "Trees have an important role in preventing soil erosion - their net-like roots enable them to lock soil in place, and their leafy canopies reduce the force of wind and rain to minimize soil displacement. -hgtv.com",
  "If you chop down a tree, it will become Empty :( -Kaz",
  "Parrots can live in trees! -PBrandon",
  "The similarity between all children nodes is a-parent! -Puhua C.",
  "Contrary to the beliefs of many computer scientists, trees tend to get wider as you go up, not down. (Let's invert our drawings to match reality) -Daniel N.",
];

function randNum(max) {
  return Math.floor(Math.random() * max);
}

function setFunFact() {
  var randFact = funFacts[randNum(funFacts.length)];
  document.getElementById("fact").innerHTML = "Fun Tree Fact! " + randFact;
}
