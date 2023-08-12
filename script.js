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

  const rowsCount = data.length;
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

  doc.autoTable({
    head: [columns],
    body: data.slice(1),
    columnStyles,
    startY: 30,
    theme: 'grid',
    tableWidth: 'auto',
  });

  doc.save('json-to-pdf.pdf');
}


const main = () => {
  const config = {
    title: "This is title",
    subtitle: "This is subtitle",

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
    }
  ]

  handlePdfGeneration(config, data);
}


document.querySelector("button").addEventListener("click", main)