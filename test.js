  // const dataColumns = []
  // for (const row of data) {
  //   for(const i in row) {
  //     if (dataColumns.length > i) dataColumns[i].columns.push(row[i]);
  //     else 
  //       dataColumns[i] = { 
  //         alignment: columns[i].alignment,
  //         columns: [row[i]] 
  //       };
  //   }
  // }

  // data = []

  // for (const i in dataColumns) {
  //   dataColumns[i].columns = align(dataColumns[i].columns, dataColumns[i].alignment);
  // }

  // for (let i = 0; i < rowsCount; i++) {
  //   const row = [];
  //   for (const dataCol of dataColumns) {
  //     row.push(dataCol.columns[i]);
  //   }
  //   data.push(row);
  // }



function getPadding(value, n) {
  const a = value.length
  let padding = ''
  for(let i=0;i<n-a;i++){
    padding += " ";
  }
  return padding;
}


function getMaxLength(columns) {
  if (!columns.length) {
    return 0;
  }
  let maxLength = columns[0].length || 0;
  for(const c of columns) {
    maxLength = Math.max(c.length, maxLength);
  }
  return maxLength;
}


function align(columns, alignment) {
  const maxLength = getMaxLength(columns);
  const aligned = [];
  for(const c of columns) {
    aligned.push(alignment.align(c, maxLength));
  }

  return aligned;
}


const ALIGNMENT = {
  LEFT: {
    align: (value, n) => {
      const padding = getPadding(value, n)
      return value + padding;
    }
  },
  RIGHT: {
    align: (value, n) => {
      const padding = getPadding(value, n)
      return padding + value;
    }
  },
  CENTER: { 
    align: (value, n) => {
      const padding = getPadding(value, n)
      const paddings = ['', '']

      for(let i = 0; i<padding.length; i++) {
        paddings[i%2] += ' ';
      }

      return paddings[0] + value + paddings[1];
    }
  }
}
