const SHEETS = {
  4: [1250, 1500],
  5: [1250, 1500],
  6: [1500],
  8: [1500, 2000],
  10: [1500, 2000],
  12: [1500, 2000],
  14: [1500, 2000],
  16: [1500, 2000],
  18: [2000],
  20: [1500, 2000],
  22: [2000],
  25: [1500, 2000],
  30: [1500, 2000],
  32: [2000],
  36: [2000],
  40: [2000],
};

const form = document.getElementById("form");

// Show thickness
function showThickness() {
  // let thicknessSelect = document.getElementById('thickness');
  let thicknessSelect;
  for (t in SHEETS) {
    thicknessSelect += `<option value='${t}'>${t}</option>`;
  }
  document.getElementById("thickness").innerHTML = thicknessSelect;
}

// Show available Width
function availableWidth() {
  let sheetWidthArray = SHEETS[document.getElementById("thickness").value];
  let sheetWidth = "";
  for (w of sheetWidthArray) {
    if (sheetWidth == "") {
      sheetWidth += `<input type="radio" id="${w}" value="${w}" name="sheet-width" checked> <label for="${w}">${w}</label>`;
    } else {
      sheetWidth += `<input type="radio" id="${w}" value="${w}" name="sheet-width"> <label for="${w}">${w}</label>`;
    }
  }
  document.getElementById("sheetWidth").innerHTML = sheetWidth;
  hideResults();
}

function showResults() {
  const resultsUI = document.getElementById("results");
  if (resultsUI.classList.contains("hide")) {
    resultsUI.classList.remove("hide");
  }
}

// hide card with Results
function hideResults() {
  const resultsUI = document.getElementById("results");
  if (!resultsUI.classList.contains("hide")) {
    resultsUI.classList.add("hide");
  }
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function numberWithComa(x) {
  return x.toString().replace(".", ",");
}

function showCutOptions() {
  document.getElementById("tor").parentElement.classList.toggle("hide");
  document.getElementById("riz").parentElement.classList.toggle("hide");
  document.getElementById("tor-title").classList.toggle("hide");
  document.getElementById("riz-title").classList.toggle("hide");
}

function showDelta(delta, sheetWidth) {
  let procent = numberWithComa(
    Math.round((delta / sheetWidth) * 100 * 10 + Number.EPSILON) / 10
  );
  let deltaText = `${delta}мм (${procent}%)`;
  return deltaText;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let width = parseInt(document.getElementById("width").value);
  let thickness = parseInt(document.getElementById("thickness").value);
  let sheetWidth = parseInt(
    document.querySelector('input[name="sheet-width"]:checked').value
  );
  let cutWidth = parseInt(document.getElementById("riz").value);
  let endCutWidth = parseInt(document.getElementById("tor").value);

  console.log(width);
  console.log(thickness);
  console.log(sheetWidth);
  console.log(cutWidth);
  console.log(endCutWidth);

  let widthNew = sheetWidth - endCutWidth * 2;

  let n = Math.floor((widthNew + cutWidth) / (width + cutWidth));

  let delta = widthNew - n * width - (n - 1) * cutWidth;

  document.getElementById("numberOfStrips").innerText = numberWithSpaces(n);
  document.getElementById("waste").innerText = showDelta(delta, sheetWidth);

  showResults();
});

showThickness();
availableWidth();
