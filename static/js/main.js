const Standarts = {
  "GOST-B": "Двотаври балочні (Б)",
  "GOST-K": "Двотаври колонні (К)",
  "GOST-SH": "Двотаври широкополичкові (Ш)",
  HEA: "Двотаври HEA",
  HEB: "Двотаври HEB",
  HEM: "Двотаври HEM",
  IPE: "Двотаври IPE",
};

let PROCAT = {};

// first start
loadSortament((response) => {
  PROCAT = JSON.parse(response);

  showStandarts();
  showSortament();
});

// Load sortaments
function loadSortament(callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "data/procat.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      callback(this.responseText);
    }
  };

  xhr.send();
}

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
  let sortament = PROCAT[document.getElementById("standart").value];
  // alert(PROCAT[document.getElementById("standart").value]);

  let beamNumbers = "";
  for (beam of sortament) {
    beamNumbers += `<option value='${beam["Марка"]}'>${beam["Марка"]}</option>`;
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

  const tableBody = document.getElementById("table-body");

  resultTable = "<tr><th>212</th></tr>";

  tableBody.innerHTML = resultTable;

  showResults();
});
