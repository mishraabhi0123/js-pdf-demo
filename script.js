
function handlePdfGeneration(config, data) {
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
    {}
  ]

  const data = [
    {}
  ]
})