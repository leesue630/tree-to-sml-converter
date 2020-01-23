var depth;
var treeArray;
var table;
var activeTab;
var FUN_FACT_SOURCE = "hgtv.com";
var funFacts = [
  "A shade tree can help cool your home or office building by as much as 20 degrees in the summertime.",
  "Trees help improve our water quality as they slow and filter rainfall.",
  "No other organism on Earth lives as long as a tree.",
  "Have you ever knocked on wood for good luck? That superstition may have originated with primitive peoples who believed benevolent spirits lived in the trees.",
  "Trees have an important role in preventing soil erosion - their net-like roots enable them to lock soil in place, and their leafy canopies reduce the force of wind and rain to minimize soil displacement."
];

// called when "Enter depth" clicked
// clears and generates table if depth is valid
function depthEntered() {
  table = document.getElementById("table");
  depth = document.getElementById("depth").value;
  if (depth != "" && !isNaN(depth)) {
    if (depth > 10) {
      document.getElementById("depth_error_text").innerHTML =
        "Depth <10 pls :(";
    } else {
      clearTable();
      document.getElementById("depth_error_text").innerHTML = "";
      generateTable();
    }
  } else {
    document.getElementById("depth_error_text").innerHTML =
      "Depth must be a non-negative integer.";
  }
}

function clearTable() {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function resetPage() {
  table = document.getElementById("table");
  clearTable();
  let row = table.insertRow();
  let cell = row.insertCell();
  var text = document.createTextNode("Node table will appear here");
  cell.appendChild(text);
  document.getElementById("table_warning_text").innerHTML = "";
  document.getElementById("sml_text").innerHTML = "~SML Text will appear here~";
}

function createUIBFunction(i, j) {
  return function() {
    uncolorInputBorder(i, j);
  };
}

function createDLIFunction(i, j) {
  return function() {
    disableLeafInput(i, j);
  };
}

function createELIFunction(i, j) {
    return function() {
      enableLeafInput(i, j);
    };
  }

function uncolorInputBorder(i, j) {
  var cellij = document.getElementById("cell" + i + j);
  colorCell(cellij, "base");
}

function disableLeafInput(i, j) {
  document.getElementById("leaf_value" + i + j).disabled = true;
}

function enableLeafInput(i, j) {
  document.getElementById("leaf_value" + i + j).disabled = false;
}

function colorCell(cell, color) {
  cell.classList.remove("base-cell");
  cell.classList.remove("valid-cell");
  switch (color) {
    case "base":
      cell.classList.add("base-cell");
      break;
    case "valid":
      cell.classList.add("valid-cell");
      break;
  }
}

function newTreeCell(i, j) {
  var input = document.createElement("input");
  input.type = "text";
  input.size = "5";
  input.id = "cell" + i + j;
  input.placeholder = "value";
  colorCell(input, "base");
  input.onchange = createUIBFunction(i, j);
  return input;
}

function newShrubCell(i, j) {
  // create div container
  var div = document.createElement("div");
  div.id = "cell" + i + j;
  div.classList.add("left-inner");
  div.classList.add("shrub-div");
  div.align = "left";
  colorCell(div, "base");

  // if not last level, cell has Node or Leaf option
  if (i < depth - 1) {
    // create Node radio button
    var nodeBtn = document.createElement("input");
    nodeBtn.type = "radio";
    nodeBtn.id = "node_btn" + i + j;
    nodeBtn.name = "radio" + i + j;
    div.appendChild(nodeBtn);

    div.innerHTML += "Node<br/>";

    // create Leaf radio button
    var leafBtn = document.createElement("input");
    leafBtn.type = "radio";
    leafBtn.id = "leaf_btn" + i + j;
    leafBtn.name = "radio" + i + j;
    div.appendChild(leafBtn);
  }

  div.innerHTML += "Leaf: ";
  var leafValue = document.createElement("input");
  leafValue.type = "text";
  leafValue.size = "5";
  leafValue.id = "leaf_value" + i + j;
  leafValue.placeholder = "value";

  div.appendChild(leafValue);

  return div;
}

function generateTable() {
  var table = document.querySelector("table");
  if (depth == 0) {
    let row = table.insertRow();
    let cell = row.insertCell();
    var text = document.createTextNode("Zero depth");
    cell.appendChild(text);
  } else {
    for (var i = 0; i < depth; i++) {
      let row = table.insertRow();
      for (var j = 0; j < Math.pow(2, i); j++) {
        var cell = row.insertCell();
        cell.colSpan = Math.pow(2, depth - 1 - i);
        cell.align = "center";
        switch (activeTab) {
          case "tree":
            cell.appendChild(newTreeCell(i, j));
            break;
          case "shrub":
            cell.appendChild(newShrubCell(i, j));
            if (i < depth - 1) {
              document.getElementById("node_btn" + i + j).onchange = createUIBFunction(i, j);
              document.getElementById("node_btn" + i + j).onclick = createDLIFunction(i, j);
              document.getElementById("leaf_btn" + i + j).onchange = createUIBFunction(i, j);
              document.getElementById("leaf_btn" + i + j).onclick = createELIFunction(i, j);
            }
            break;
        }
      }
    }
  }
}

function treeTextHelper(i, j) {
  if (depth == null || depth == "") {
    return "Enter depth first, please!";
  }
  if (i == depth) {
    // shouldn't be possible for shrubs
    return "Empty";
  }
  var cellij = document.getElementById("cell" + i + j);
  switch (activeTab) {
    case "tree":
      if (cellij.value == "") return "Empty";
      colorCell(cellij, "valid");
      return (
        "Node(" +
        treeTextHelper(i + 1, j * 2) +
        "," +
        cellij.value +
        "," +
        treeTextHelper(i + 1, j * 2 + 1) +
        ")"
      );
      break;
    case "shrub":
      // leaf cell
      if (
        i == depth - 1 ||
        document.getElementById("leaf_btn" + i + j).checked
      ) {
        var leafValueij = document.getElementById("leaf_value" + i + j);
        colorCell(cellij, "valid");
        if (leafValueij.value == "")
          document.getElementById("table_warning_text").innerHTML =
            "Warning: Empty leaf value";
        return "Leaf(" + leafValueij.value + ")";
      }
      // node cell
      if (document.getElementById("node_btn" + i + j).checked) {
        colorCell(cellij, "valid");
        return (
          "Node(" +
          treeTextHelper(i + 1, j * 2) +
          "," +
          treeTextHelper(i + 1, j * 2 + 1) +
          ")"
        );
      }

      if (i == 0) {
        return "Empty";
      } else {
        throw "Node without valid children";
      }
  }
}

function generateText() {
  document.getElementById("table_warning_text").innerHTML = "";
  for (var i = 0; i < depth; i++) {
    for (var j = 0; j < Math.pow(2, i); j++) {
      uncolorInputBorder(i, j);
    }
  }
  var text;
  try {
    text = treeTextHelper(0, 0);
  } catch (e) {
    console.log(e);
    text = "Node must have 2 valid children.";
  }
  document.getElementById("sml_text").innerHTML = text;
}

function randNum(max) {
  return Math.floor(Math.random() * max);
}

function setFunFact() {
  var randFact = funFacts[randNum(funFacts.length)];
  document.getElementById("fact").innerHTML =
    "Fun Tree Fact! " + randFact + " (" + FUN_FACT_SOURCE + ")";
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;
  activeTab = tabName;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tab-links");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  resetPage();
}

document.getElementById("default_open").click();