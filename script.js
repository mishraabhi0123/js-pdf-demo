function createPage(doc, data, columns, pageNumber, totalPages, columnStyles) {
  doc.setFontSize(12); // Reset font size for page number
  doc.text(`${pageNumber} / ${totalPages}`, 185, 285); // Adjust position as needed
  
  doc.autoTable({
    head: [columns],
    columnStyles,
    startY: pageNumber == 1 ? 30 : 20,
    body: data,
    theme: 'striped',
    tableWidth: 'auto',
  });

  if (pageNumber != totalPages) {
    doc.addPage();
  }
}


function handlePdfGeneration(config, dataJson) {
  const columns = config.tableConfig.filter(c => c.visible == true).map(c => ({
    id: c.id, 
    title: c.title, 
    align: c.align, 
  }));

  // Create a column specific styles
  const columnStyles = {}
  for (const i in columns) {
    columnStyles[i]  =  { halign: columns[i].align }
  }

  let data = dataJson.map(d => {
    const trimmed_data = []
    for (const field of columns) {
      trimmed_data.push(d[field.id])
    }
    return trimmed_data;
  })

  const doc = new jspdf.jsPDF();
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0); // Black color

  // Define title text
  const title = config.title;
  const subtitle = config.subtitle;

  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const pageWidth = doc.internal.pageSize.getWidth();
  const tx = (pageWidth - titleWidth) / 2;
  
  // Add centered title
  doc.text(title, tx, 15);

  doc.setFontSize(12);

  const subtitleWidth = doc.getStringUnitWidth(subtitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const sx = (pageWidth - subtitleWidth) / 2;
  doc.text(subtitle, sx, 22);

  const totalRows = data.length;
  const pageSize = config.rowsPerPage;
  const totalPages = Math.ceil(totalRows / pageSize);
  const remainderRows = totalRows % pageSize

  for (let page = 0; page < totalPages; page++) {
    const startIndex = page * pageSize;
    const endIndex = startIndex + (page !== totalPages-1 ? pageSize : remainderRows);

    const currentPageData = data.slice(startIndex, endIndex);
    createPage(doc,currentPageData, columns, page + 1, totalPages, columnStyles);
  }

  doc.save(config.outputFileName);
}


const main = () => {
  const config = {
    title: "Introductory Prelimnary Report of Depot",
    subtitle: "Year 2012-2013, Includes staff status",
    outputFileName: "report.pdf",
    rowsPerPage: 30,

    tableConfig: [
    {
      "id": "column1",
      "title": "Name",
      "visible": true,
      "align": "left"
    },
    {
      "id": "column2",
      "title": "Email",
      "visible": true,
      "align": "right" 
    },
    {
      "id": "column3",
      "title": "Password",
      "visible": true,
      "align": "right",
    },
    {
      "id": "column4",
      "title": "Place of birth",
      "visible": true,
      "align": "center"
    },
    {
      "id": "column5",
      "title": "Address",
      "visible": true,
      "align": "left"
    }
  ]}

  const data = [
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    }
  ]

  const dataShort = [
    {
      "column1": "Abhi",
      "column2": "mishraabhi0123@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek",
      "column2": "abhi@gmail.com",
      "column3": "password",
      "column4": "bihar",
      "column5": "address"
    },
    {
      "column1": "Abhishek Mishra",
      "column2": "123@gmail.com",
      "column3": "12232127688979124",
      "column4": "Rohtas, Bihar",
      "column5": "1265, jasj asghnka"
    }
  ]

  handlePdfGeneration(config, dataShort);
}


document.querySelector("button").addEventListener("click", main)