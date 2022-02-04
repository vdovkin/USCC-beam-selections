const beam_B = ["10Б1", "12Б1", "12Б2"];
const beam_SH = ["20Ш0", "20Ш1", "20Ш2"];

const Standarts = {
  0: "Двотаври балочні (Б) по ГОСТ Р 57837-2017",
  1: "Двотаври широкополичкові (Ш) по ГОСТ Р 57837-2017",
};

const Sortaments = {
  0: beam_B,
  1: beam_SH,
};

const form = document.getElementById("form");

// Show thickness
function showStandarts() {
  let standartSelect;
  for ([key, value] of Object.entries(Standarts)) {
    standartSelect += `<option value='${key}'>${value}</option>`;
  }
  document.getElementById("standart").innerHTML = standartSelect;
}

// Show available Width
function showSortament() {
  let sortament = Sortaments[document.getElementById("standart").value];
  let beamNumbers = "";
  for (w of sortament) {
    beamNumbers += `<option value='${w}'>${w}</option>`;
  }
  document.getElementById("beamNumber").innerHTML = beamNumbers;
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

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let standart = parseInt(document.getElementById("standart").value);
  let beamNumber = parseInt(document.getElementById("beamNumber").value);

  showResults();
});

showStandarts();
showSortament();
showResults();

const tableBody = document.getElementById("table-body");

resultTable = "<tr><th>212</th></tr>";

tableBody.innerHTML = resultTable;
