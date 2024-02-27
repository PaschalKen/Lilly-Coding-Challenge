const spinnerSection = document.querySelector('.spinnerSection');

const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

function drawLine(start, end, style) {
  ctx.beginPath();
  ctx.strokeStyle = style || 'black';
  ctx.moveTo(...start);
  ctx.lineTo(...end);
  ctx.stroke();
}

//Displays the spinner upon loading
function showSpinner() {
  spinnerSection.classList.remove('hide');
  spinnerSection.classList.add('show');
}

//Hides the spinner after loading
function hideSpinner() {
  spinnerSection.classList.add('hide');
  spinnerSection.classList.remove('show');
}

// invokes the hideSpinner or showSpinner functions based on the state
function loadState(state) {
  if (state === 'loading') {
    showSpinner();
  } else if (state === 'loaded') {
    hideSpinner();
  } else {
    hideSpinner();
  }
}


// Get a list of available stock
async function getAvailableStocks() {
  loadState('loading');
  const response = await fetch('stocks');
  const stocks = await response.json();
  return stocks.stockSymbols;
}



// Get data about a specific stock symbol
async function getSymbolStockData(symbol) {
  const response = await fetch(`stocks/${symbol}`);
  const data = await response.json();
  if (response.status === 200) {
    return data;
  } else {
    const { message } = data;
    console.error(`Error: ${message}`);
    return [];
  }
}

async function loadAllStockData() {
  let stockData = {};
  try {
    const stocks = await getAvailableStocks();
    for (let stock of stocks) {
      const data = await getSymbolStockData(stock);
      stockData = { ...stockData, [stock]: data };
    }
    loadState('loaded');
    createButtons(Object.keys(stockData));
  } catch (error) {
    loadState('loaded');
    console.log('An error occurred while loading stock data:', error);
  }
  // return stockData;
  console.log('All stock data:', stockData);
}

loadAllStockData();


function createButtons(stockNames) {
  const container = document.querySelector('.buttonSection');

  stockNames.forEach((stockName) => {
    const button = document.createElement('button');
    button.classList.add('stockButton');
    button.textContent = stockName;
    button.addEventListener('click', async () => {
    const stockData = await getSymbolStockData(stockName);
    console.log(stockName, stockData);
    });
    container.appendChild(button);
  });
}


function drawTriangle(apex1, apex2, apex3) {
  ctx.beginPath();
  ctx.moveTo(...apex1);
  ctx.lineTo(...apex2);
  ctx.lineTo(...apex3);
  ctx.fill();
}




  drawLine([50, 50], [50, 550]);
  drawTriangle([35, 50], [65, 50], [50, 35]);

  drawLine([50, 550], [950, 550]);
  drawTriangle([950, 535], [950, 565], [965, 550]);


