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
let ZVARNI = {};

// first start
loadSortamentProcat((response) => {
  PROCAT = JSON.parse(response);

  showStandarts();
  showSortament();
});

loadSortamenZvarni((response) => {
  ZVARNI = JSON.parse(response);
});

// Load sortaments
function loadSortamentProcat(callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "data/procat.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      callback(this.responseText);
    }
  };

  xhr.send();
}

// Load sortaments
function loadSortamenZvarni(callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "data/zvarni.json", true);

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

function beamParametersToTable(beam) {
  const beamRow = `<tr class='procatrow'>
  <td>${beam["Марка"]}</td>
  <td>${beam["H"]}</td>
  <td></td>
  <td>${beam["h2"]}</td>
  <td></td>
  <td>${beam["s"]}</td>
  <td></td>
  <td>${beam["b"]}</td>
  <td></td>
  <td>${beam["t"]}</td>
  <td></td>
  <td>${beam["M"]}</td>
  <td></td>
  <td>${beam["A"]}</td>
  <td></td>
  <td>${beam["Ix"]}</td>
  <td></td>
  <td>${beam["Wx"]}</td>
  <td></td>
  <td>${beam["i_x"]}</td>
  <td></td>
  <td>${beam["Iy"]}</td>
  <td></td>
  <td>${beam["Wy"]}</td>
  <td></td>
  <td>${beam["i_y"]}</td>
  <td></td>
  </tr>`;

  return beamRow;
}

function zvarnіBeamParametersToTable(beam, basebeam) {
  const beamRow = `<tr>
  <td>${beam["Марка"]}</td>
  <td>${beam["H"]}</td>
  <td class='diff'>${findDiff(beam["H"], basebeam["H"])}</td>
  <td>${beam["h2"]}</td>
  <td class='diff'>${findDiff(beam["h2"], basebeam["h2"])}</td>
  <td>${beam["s"]}</td>
  <td class='diff'>${findDiff(beam["s"], basebeam["s"])}</td>
  <td>${beam["b"]}</td>
  <td class='diff'>${findDiff(beam["b"], basebeam["b"])}</td>
  <td>${beam["t"]}</td>
  <td class='diff'>${findDiff(beam["t"], basebeam["t"])}</td>
  <td>${beam["M"]}</td>
  <td class='diff'>${findDiffPercent(beam["M"], basebeam["M"])}</td>
  <td>${beam["A"]}</td>
  <td class='diff'>${findDiffPercent(beam["A"], basebeam["A"])}</td>
  <td>${beam["Ix"]}</td>
  <td class='diff'>${findDiffPercent(beam["Ix"], basebeam["Ix"])}</td>
  <td>${beam["Wx"]}</td>
  <td class='diff'>${findDiffPercent(beam["Wx"], basebeam["Wx"])}</td>
  <td>${beam["i_x"]}</td>
  <td class='diff'>${findDiffPercent(beam["i_x"], basebeam["i_x"])}</td>
  <td>${beam["Iy"]}</td>
  <td class='diff'>${findDiffPercent(beam["Iy"], basebeam["Iy"])}</td>
  <td>${beam["Wy"]}</td>
  <td class='diff'>${findDiffPercent(beam["Wy"], basebeam["Wy"])}</td>
  <td>${beam["i_y"]}</td>
  <td class='diff'>${findDiffPercent(beam["i_y"], basebeam["i_y"])}</td>
  </tr>`;

  return beamRow;
}

function findDiff(param1, param2) {
  let result = "";
  if (param1 > param2) {
    result = "+" + (Math.trunc((param1 - param2) * 100) / 100).toString();
  } else {
    result = (Math.trunc((param1 - param2) * 100) / 100).toString();
  }
  return result;
}

function findDiffPercent(param1, param2) {
  let result = "";
  if (param1 > param2) {
    result =
      "+" +
      (Math.trunc(((param1 - param2) / param2) * 100 * 10) / 10).toString() +
      "%";
  } else {
    result =
      (Math.trunc(((param1 - param2) / param2) * 100 * 10) / 10).toString() +
      "%";
  }
  return result;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const sortament = PROCAT[document.getElementById("standart").value];
  const beamNumber = document.getElementById("beamNumber").value;
  const tableBody = document.getElementById("table-body");

  const procatBeam = sortament.find((item) => {
    return item["Марка"] == beamNumber;
  });

  let resultTable = "";

  resultTable += beamParametersToTable(procatBeam);

  resultTable += zvarnіBeamParametersToTable(ZVARNI[0], procatBeam);
  resultTable += zvarnіBeamParametersToTable(ZVARNI[1], procatBeam);
  resultTable += zvarnіBeamParametersToTable(ZVARNI[2], procatBeam);
  resultTable += zvarnіBeamParametersToTable(ZVARNI[3], procatBeam);
  resultTable += zvarnіBeamParametersToTable(ZVARNI[4], procatBeam);

  tableBody.innerHTML = resultTable;

  showResults();
});
