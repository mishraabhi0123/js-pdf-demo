function createPage(doc, data, columns, columnStyles) {
  doc.setFontSize(12); // Reset font size for page number
  const pageNumber = doc.getNumberOfPages();
  // doc.text(`${pageNumber}`, 185, 285); // Adjust position as needed

  doc.autoTable({
    head: [columns],
    columnStyles,
    startY: pageNumber == 1 ? 30 : 20,
    body: data,
    theme: 'striped',
    tableWidth: 'auto',
  });


  // if (pageNumber <= totalPages && actualPagesInDoc == pageNumber) {
  //   doc.addPage();
  // }
}


function handlePdfGeneration(config, dataJson) {
  const columns = config.tableConfig.filter(c => c.visible == true).map(c => ({
    id: c.id,
    title: c.title,
    align: c.align,
    width: c.width || undefined
  }));

  // Create a column specific styles
  const columnStyles = {}
  for (const i in columns) {
    columnStyles[i] = {
      halign: columns[i].align,
      cellWidth: columns[i].width
    }
  }

  let data = dataJson.map(d => {
    const trimmed_data = []
    for (const field of columns) {
      trimmed_data.push(d[field.id])
    }
    return trimmed_data;
  })

  let doc = null
  if (config.orientation == "landscape") {
    doc = new jspdf.jsPDF("landscape");
  } else {
    doc = new jspdf.jsPDF();
  }

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

  // const totalRows = data.length;
  // const pageSize = config.rowsPerPage;
  // const totalPages = Math.ceil(totalRows / pageSize);
  // const remainderRows = totalRows % pageSize

  // for (let page = 0; page < totalPages; page++) {
  //   const startIndex = page * pageSize;
  //   const endIndex = startIndex + ((page !== totalPages - 1) ? pageSize : remainderRows ? remainderRows : pageSize);

  //   const currentPageData = data.slice(startIndex, endIndex);
  // }

  createPage(doc, data, columns, columnStyles);
  open(doc.output('bloburl'), '_blank');
}


const main = () => {

  const data = [{
    "column1": "Barbie Benton\n\nPlayboy Lounge",
    "column2": "1234 Hop Along Trail\nBunny Hill, LV",
    "column3": "",
    "column4": "",
    "column5": ""
  }, {
    "column1": "Barry Manilow",
    "column2": "890 Singsong Ave\nRock Hill, SC 29708\n\nBill Addr: 1234 Barry Lane\nRock Hill, SC 29708",
    "column3": "(456) 234-7890",
    "column4": "marylawrence1949@gmail.com",
    "column5": "Barry \n\"456\""
  }, {
    "column1": "Benny Hill",
    "column2": "456 Edinborough Way\nInverness Scotland",
    "column3": "(333) 572-3321",
    "column4": "bennyhill@brithumour.com",
    "column5": "Benny \n\"BEN_HILL_69\""
  }, {
    "column1": "Billie Bob Thornton",
    "column2": "4567 Westinghouse Blvd\nFort Mill, Sc 29715\n\nBill Addr: 26 Highway 51\nFort Mill, SC 29715",
    "column3": "",
    "column4": "",
    "column5": ""
  }, {
    "column1": "Billy Baldwin",
    "column2": "12 Hollywood Blvd\nHollywood, CA",
    "column3": "",
    "column4": "mlstewart@msn.com",
    "column5": ""
  }, {
    "column1": "Boris Badenov\n\nRocky & Bullwinkle Show",
    "column2": "6464 Santa Monica Dr\nLos Angeles CA\n90210",
    "column3": "(305) 406-3453",
    "column4": "bb@rockbullwinkleshow.com",
    "column5": "Boris \n\"RBS01\""
  }, {
    "column1": "Bridgett (5%) Kemp",
    "column2": "23 Queen St East\nFort Mill, SC\n\nBill Addr: M.L. Stewart\n112106 Gallahad Cir Apt 20\nFort Mill, SC\n",
    "column3": "(453) 234-8976",
    "column4": "mlstewart@msn.com",
    "column5": ""
  }, {
    "column1": "Cathy Madill\n\nStiver Vale",
    "column2": "195 Main Street\nNewmarket ON",
    "column3": "(905) 895-4571",
    "column4": "camadill@stivervale.com",
    "column5": "Cathy-Anne"
  }, {
    "column1": "Charlie Brown",
    "column2": "8765 Christmas Tree Lane\nFort Mill, SC 29715",
    "column3": "",
    "column4": "mlstewart@msn.com",
    "column5": "Charlie"
  }, {
    "column1": "Clark Kent",
    "column2": "11 Ballinger Way\nUxbridge ON L9P 0R5",
    "column3": "(888) 111-2222",
    "column4": "ckent@dailyp.com",
    "column5": "Superman"
  }, {
    "column1": "Daffy Duck",
    "column2": "1115 Golden Pond Dr\nFort Mill, SC\n\nBill Addr: 1110 Keene Cir\nFort Mill, SC 29715",
    "column3": "(888) 123-4567",
    "column4": "",
    "column5": "Daffy"
  }, {
    "column1": "Daisy Duck",
    "column2": "364 Wet Pond Circle\nWetsburg OH",
    "column3": "(888) 555-1212",
    "column4": "dduck@email.com",
    "column5": "Daisy"
  }, {
    "column1": "Deborah Hutchison\n\nGutsy Gals Inspire Me 10%",
    "column2": "35 Okechobee Rd\nWest Palm Beach, FL 29708",
    "column3": "(980) 345-7654",
    "column4": "maryl@mlstewart.net",
    "column5": "Hall \n\"342\""
  }, {
    "column1": "Elmer Fudd\n\nLooney Tunes Inc.",
    "column2": "46323 Hermosa Way\nSan Francisco CA\n92423",
    "column3": "(204) 833-3183",
    "column4": "elmerf@looney.com",
    "column5": "Elmer"
  }, {
    "column1": "Fox Mulder\n\nFBI",
    "column2": "5633 1st Ave\nWashington DC",
    "column3": "(565) 222-9999",
    "column4": "fm@xfiles.net",
    "column5": "Fox or Dana"
  }, {
    "column1": "George Jetson\n\nSpacely's Sprockets",
    "column2": "362 HighSky Blvd\nFutureland CO",
    "column3": "(888) 555-1212",
    "column4": "jetsonfamily@gmail.com",
    "column5": "George, Elroy or Jane"
  }, {
    "column1": "Gerald McBoing-Boing",
    "column2": "4643 Bouncy Road\nBounceville SC",
    "column3": "(905) 676-3512",
    "column4": "gmm@bounce.com",
    "column5": "Gerald"
  }, {
    "column1": "Harry Armpit\n\nRazorback Ltd (taxes 5)",
    "column2": "980 Bladerunner Lane\nrock Hill, SC 29708\n\nBill Addr: 1110 Keene cir\nfort Mill, Sc 29715",
    "column3": "(987) 234-5678",
    "column4": "mlstewart@msn.com",
    "column5": "Harry"
  }, {
    "column1": "Harry Balls",
    "column2": "34 West Manchester Dr\nRock Hill, SC 29780",
    "column3": "(888) 121-2345",
    "column4": "marylawrence@mpengo.com",
    "column5": "Harry"
  }, {
    "column1": "Harry Barnes\n\nBarnies Plumbing",
    "column2": "23 Rocky Rd\nRock Hill, SC 29716",
    "column3": "888-555-1234",
    "column4": "marylawrence@mpengo.com",
    "column5": "Harry"
  }, {
    "column1": "Henry Higgins",
    "column2": "56 Main St\nBumhassle NY\n36432",
    "column3": "(321) 456-2342",
    "column4": "hhiggins@gmail.com",
    "column5": "Henry or Barbie"
  }, {
    "column1": "Joe Shmoe\n\nShmoe Roofing",
    "column2": "354 Biscayne Blvd\nKeswick ON\n",
    "column3": "888-555-1212",
    "column4": "joes@shmoe.ca",
    "column5": "Joe or Karen"
  }, {
    "column1": "Joe (T) Jackson",
    "column2": "457 Snowridge Dr\nPittsburgh PA",
    "column3": "(800) 555-1212",
    "column4": "JJ@pittsburgh.com",
    "column5": "Joe"
  }, {
    "column1": "Judy Garland\n\nThe Wizard of Oz",
    "column2": "27 Gold Hill Rd\nFort Mill, SC 29708",
    "column3": "",
    "column4": "marylawrence@mpengo.com",
    "column5": "Judy"
  }, {
    "column1": "Justin Perrin\n\nPrimetime Fitness",
    "column2": "53 Jimmy Walker Way\nKeswick ON",
    "column3": "(905) 888-3433",
    "column4": "jperrin@primetimefitness.ca",
    "column5": "Justin \n\"JPERRIN\""
  }, {
    "column1": "Kate X Lynch",
    "column2": "5432 Rockhill Lane\nFort Mill, SC\n\nBill Addr: 1234 Golden Arm Rd\nRock Hill, SC",
    "column3": "",
    "column4": "",
    "column5": "Kate"
  }, {
    "column1": "Lemon Oyl\n\nLoyal Lemonas Importica CTA",
    "column2": "463 Spinach Way\nBroccolini IT",
    "column3": "(888) 222-3345",
    "column4": "marylawrence@mpengo.com",
    "column5": "Lemon or Brutus"
  }, {
    "column1": "Lois Lane",
    "column2": "63 Main St Apt 607\nMetropolis OH",
    "column3": "(888) 222-3333",
    "column4": "llane@dailyp.com",
    "column5": "Lois"
  }, {
    "column1": "Mac Daddy",
    "column2": "5134 Gallahad Drive\nRock Hill, SC 29716",
    "column3": "765-890-1234",
    "column4": "mlstewart@msn.com",
    "column5": "Mac"
  }, {
    "column1": "Meg Ryan",
    "column2": "25 Westminster Blvd\nHollywood CA",
    "column3": "(888) 234-5678",
    "column4": "mlstewart@msn.com",
    "column5": "Meg"
  }, {
    "column1": "Mickey Mouse\n\nDisney",
    "column2": "23 Mouse Trap Dr\nMousechester, NH",
    "column3": "(888) 567-3456",
    "column4": "mlstewart@msn.com",
    "column5": "Minnie \n\"MM\""
  }, {
    "column1": "Nancy Drew",
    "column2": "4573 Smith St\nSmithville\nSC",
    "column3": "(888) 234-1654",
    "column4": "ndrew@gmail.com",
    "column5": "Nancy"
  }, {
    "column1": "Olive Oil",
    "column2": "234 Popeye Lane\nSpinach, SC",
    "column3": "",
    "column4": "",
    "column5": ""
  }, {
    "column1": "Patricia Bellissimo",
    "column2": "465 Gage Dr\nNorth York",
    "column3": "888-843-4623",
    "column4": "pb@gae.ca",
    "column5": "Patty "
  }, {
    "column1": "Perry White\n\nThe Daily Planet",
    "column2": "80 King St E\nMetroplois OH\n\nBill Addr: 120 5th Ave\nNew York NY",
    "column3": "(800) 999-1234",
    "column4": "info@dailyp.com",
    "column5": "Perry White, editor-in-chief \n\"DAILY_P\""
  }, {
    "column1": "Phil Atio",
    "column2": "456 Buttonthorpe Way\nFort Mill SC\n54632",
    "column3": "888-555-1212",
    "column4": "",
    "column5": "Phil or Connie"
  }, {
    "column1": "Porky Pig",
    "column2": "Pig Stall #3\n45 Piglet Dr\nPorkland, Maine",
    "column3": "(777) 687-9821",
    "column4": "marylawrence@mpengo.com",
    "column5": "Porky"
  }, {
    "column1": "Ricky Ricardo",
    "column2": "908 Hollywood Hills Rd\nFort Mill, Sc",
    "column3": "",
    "column4": "mlstewart@msn.com",
    "column5": ""
  }, {
    "column1": "Roger Ramjet",
    "column2": "256 Racetrack Rd\nFort Mill, SC",
    "column3": "",
    "column4": "",
    "column5": ""
  }, {
    "column1": "Sean Murphy",
    "column2": "23 Calloway Pines Dr\nTega Cay, SC 29708",
    "column3": "",
    "column4": "mlstewart@msn.com",
    "column5": ""
  }, {
    "column1": "Tom Terrific",
    "column2": "4636 Pumpwagon Way\nBelvedere NC",
    "column3": "(222) 555-1111",
    "column4": "tterrific@hughes.net",
    "column5": "Tom"
  }, {
    "column1": "Trevor Adderley\n\nBalmoral",
    "column2": "1234 Balmoral Drive\nNassau Bahamas",
    "column3": "980-213-5413",
    "column4": "mlstewart@msn.com",
    "column5": "Trevor \n\"BAL\""
  }, {
    "column1": "Yogi Bear",
    "column2": "Yellowstone Park\nUtah",
    "column3": "(234) 123-4444",
    "column4": "yogi@yellowstone.com",
    "column5": "Yogi or Boo-Boo \n\"YBEAR\""
  }, {
    "column1": "Yosemite Sam Jones",
    "column2": "576 Gold Rush Dr\nTucson AZ",
    "column3": "(302) 574-2342",
    "column4": "yosemitesam@gmail.com",
    "column5": "Yosemite Sam"
  }, {
    "column1": " \n\nRandy Perry Electric",
    "column2": "4646 Leslie St\nQueensville ON",
    "column3": "(905) 868-7597",
    "column4": "office@randyperryelectric.com",
    "column5": "John"
  }, {
    "column1": " \n\nBarre3 (Tax Exempt)",
    "column2": "1225 Merriweather Lane\nFort Mill, SC 29716\n\nBill Addr: 1110 Keene Cir\nFort Mill, SC 29715",
    "column3": "(888) 234-5678",
    "column4": "mlstewart@msn.com",
    "column5": "Mel \n\"123\""
  }, {
    "column1": " ",
    "column2": "",
    "column3": "",
    "column4": "",
    "column5": ""
  }, {
    "column1": " \n\nSimple & Sons",
    "column2": "456 Simpleton Lane\nJuggsville SC",
    "column3": "(833) 737-1515",
    "column4": "office@sons.ca",
    "column5": "Simon or Sylvester"
  }]

  const config =
  {
    "title": "M L Stewart Customer List",
    "subtitle": "aksjhb akjhdk lkjlkasd lkjasd",
    "rowsPerPage": 15,
    "tableConfig": [
      {
        "id": "column1",
        "title": "Name",
        "visible": true,
        "align": "left",
        "width": 45
      },
      {
        "id": "column2",
        "title": "Address",
        "visible": true,
        "align": "left",
        "width": 45
      },
      {
        "id": "column3",
        "title": "Telephone",
        "visible": true,
        "align": "left"
      },
      {
        "id": "column4",
        "title": "E-Mail",
        "visible": true,
        "align": "left"
      },
      {
        "id": "column5",
        "title": "Contact",
        "visible": true,
        "align": "left"
      }
    ]
  }

  handlePdfGeneration(config, data);
}


document.querySelector("button").addEventListener("click", main)