function generateOutputTable(dict, depth) {
  clearTable();
  table = document.getElementById("output_table");
  if (depth == 0) {
    let row = table.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = "Zero depth";
  } else {
    for (var i = 0; i < depth; i++) {
      let row = table.insertRow();
      for (var j = 0; j < Math.pow(2, i); j++) {
        var cell = row.insertCell();
        cell.colSpan = Math.pow(2, depth - 1 - i);
        cell.align = "center";
        if ("" + i + j in dict) {
          var div = document.createElement("div");
          div.classList.add("div-cell");
          div.align = "center";
          div.innerHTML = dict["" + i + j];
          cell.appendChild(div);
        }
      }
    }
  }
}

function updateSMLErrorText(err) {
  document.getElementById("sml_error_text").innerHTML = err;
}

// append two dictionaries
function append(obj1, obj2) {
  var res = {};
  for (var i in obj1) {
    res[i] = obj1[i];
  }
  for (var j in obj2) {
    res[j] = obj2[j];
  }
  return res;
}

function smlEntered() {
  var sml_form_value = document.getElementById("sml_form").value;
  console.log('sml: "' + sml_form_value + '"');

  var res;
  try {
    var res = smlToDict(sml_form_value, 0, 0);
    updateSMLErrorText("");
    generateOutputTable(res[0], res[1]);
  } catch (e) {
    console.log(e);
    updateSMLErrorText(e);
  }
}

String.prototype.trimLeft = function(charlist) {
  if (charlist === undefined) {
    charlist = " ";
  }

  return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

// returns array of [dict, depth] with dict = {<row><col> : <value>}
function smlToDict(sml, r, c) {
  var dict = [];
  var depth = r;
  var sml = sml.trimLeft().trimRight();
  if (sml.localeCompare("Empty") == 0) {
    return [dict, depth];
  } else {
    var p = 0; // unbalanced paren tracker
    var leftResult, leftDict, rightResult, rightDict;
    var leftStr, value, rightStr;
    if (!sml.startsWith("Node"))
      throw "Invalid SML Tree: doesn't start with Node or Empty";
    sml = sml.trimLeft("Node").trimLeft();
    sml = sml.substring(1);
    var len = sml.length;
    for (var i = 0; i < len; i++) {
      switch (sml.charAt(i)) {
        case ",":
          // console.log("comma found");
          if (p == 0) {
            leftStr = sml.substring(0, i);
            // console.log('left: "' + leftStr + '"');
            leftResult = smlToDict(leftStr, r + 1, c * 2);
            leftDict = leftResult[0];
            var q = 0;
            for (var j = i + 1; j < len - 1; j++) {
              switch (sml.charAt(j)) {
                case ",":
                  if (q == 0) {
                    value = sml
                      .substring(i + 1, j)
                      .trimLeft()
                      .trimRight();
                    // console.log('value: "' + value + '"');
                    rightStr = sml.substring(j + 1, len - 1);
                    // console.log(
                    //   'right: "' + rightStr + '"'
                    // );
                    rightResult = smlToDict(
                      sml.substring(j + 1, len - 1),
                      r + 1,
                      c * 2 + 1
                    );
                    rightDict = rightResult[0];
                    depth = Math.max(leftResult[1], rightResult[1]);
                    dict = append(leftDict, rightDict);
                    dict["" + r + c] = value;
                    return [dict, depth];
                  }
                  break;
                case "(":
                  q++;
                  break;
                case ")":
                  if (q == 0)
                    throw "Invalid SML Tree: unbalanced close parenthesis";
                  q--;
                  break;
              }
            }
            throw "Invalid SML Tree: Issue with right branch";
          }
          break;
        case "(":
          p++;
          break;
        case ")":
          if (p == 0) throw "Invalid SML Tree: unbalanced close parenthesis";
          p--;
      }
    }
    throw "Invalid SML Tree: Issue with left branch";
  }
}

// general rules: don't use parentheses or commas within quotes
