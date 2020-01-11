# tree-to-sml-converter
Test cases involving trees are difficult to type out in SML due to the many syntactical requirements (next Nodes, parentheses, and Empty's).

This HTML Page allows conversion from a tree (represented as a table) to a valid SML text test case.
The datatype of the output tree for this converter is defined as:
```
datatype 'a tree = Empty | Node of 'a tree * 'a * 'a tree.
```

Valid nodes (aka non-empty nodes that have a valid path to the root) are given a green border when the SML text is generated.

Built with HTML, CSS, JavaScript.

GitHub Pages Link: https://leesue630.github.io/tree-to-sml-converter/
