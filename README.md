# tree-to-sml-converter
Test cases involving trees are difficult to type out in SML due to the many syntactical requirements (Nodes, parentheses, commas, and Empty's).

This HTML Page allows conversion from a tree/shrub (represented as a table) to a valid SML text test case.
The datatypes for the output are defined as:
```
datatype 'a tree = Empty | Node of 'a tree * 'a * 'a tree.
datatype 'a shrub = Empty | Leaf of 'a | Node of 'a shrub * 'a shrub.
```
There is also a feature for SML text to tree (table representation).
This does not handle SML texts with parentheses and commas within quotations of the values.

Valid nodes (aka non-empty nodes that have a valid path to the root) are given a green border when the SML text is generated.

Built with HTML, CSS, JavaScript.

GitHub Pages Link: https://leesue630.github.io/tree-to-sml-converter/
