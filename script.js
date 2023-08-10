
function handlePdfGeneration(config, dataJson) {
  const columns = config.filter(c => c.visible == true).map(c => ({id: c.id, title: c.title }))
  const data = dataJson.map(d => {
    const trimmed_data = []
    for (const field of columns) {
      trimmed_data.push(d[field.id])
    }
    return trimmed_data;
  })

  const doc = new jspdf.jsPDF();
  doc.autoTable({
    head: [columns],
    body: data.slice(1),
    startY: 10,
    theme: 'grid',
    tableWidth: 'auto',
  });
  doc.text(150,285, 'page ' + doc.page);
  doc.save('json-to-pdf.pdf');
}


document.querySelector("button").addEventListener("click", () => {
  const config = [
    {
      "id": "column1",
      "title": "Name",
      "visible": true
    },
    {
      "id": "column2",
      "title": "Email",
      "visible": true
    },
    {
      "id": "column3",
      "title": "Password",
      "visible": true
    },
    {
      "id": "column4",
      "title": "Place of birth",
      "visible": true
    },
    {
      "id": "column5",
      "title": "Address",
      "visible": true
    }
  ]

  const data = [
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
})