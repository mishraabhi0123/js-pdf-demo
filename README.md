## Bubble PDF export plugin
This is a simple bubble plugin to convert and download a dataset into PDF format    

Function definition is given below

```javascript
function handlePdfGeneration(config, dataJson);
```

Below is the `config` schema
```js
const config = {
    title: "Title of the document",
    subtitle: "This is a subtitile of the page which will appear below title",
    outputFileName: "mydata.pdf",
    rowsPerPage: 30,
    orientation: "landscape", // orientation of the page

    tableConfig: [
        {
            "id": "column1",
            "title": "Column Name",
            "visible": true,  // Whether the column should be visible or not in the table
            "align": "left", // alignment of text in column
            "width": 80 // optionally specify a width of column
        },

        ...
  ]}
```


`dataJson` should be in the below mentioned format 
```json
[
    {   
      "column1": "asdkjh",
      "column2": "asd@asmad.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "asjhdk",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
]
```

`column1`, `column2`  etc are the id of the column declared in the config above.