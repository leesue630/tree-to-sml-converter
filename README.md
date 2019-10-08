# tree-to-sml-converter
Test cases involving trees are difficult to type out in SML due to the many syntactical requirements (next Nodes, parentheses, and Empty's).

This HTML Page allows conversion from a tree (represented as a table) to a valid SML text test case.
The datatype of the output tree for this converter is defined as:
```
datatype 'a tree = Empty | Node of 'a tree * 'a * 'a tree.
```


Built with HTML, CSS, JavaScript.
