const vehicles = [
  {
    name: "Vehicle CR-14",
    area: "Near MG Road collection point",
    eta: "8 min",
    capacity: "64%",
    driver: "Ravi Kumar",
  },
  {
    name: "Vehicle CR-08",
    area: "Crossing Sector 8 market",
    eta: "14 min",
    capacity: "42%",
    driver: "Meena Patil",
  },
  {
    name: "Vehicle CR-21",
    area: "Approaching Lake Road bins",
    eta: "21 min",
    capacity: "78%",
    driver: "Imran Shaikh",
  },
];

const reports = [
  {
    title: "Overflowing community bin",
    area: "Sector 8 park gate",
    type: "Overflowing bin",
    priority: "High",
    distance: "0.7 km",
  },
  {
    title: "Plastic waste near bus stop",
    area: "MG Road stop 2",
    type: "Plastic waste",
    priority: "Medium",
    distance: "1.2 km",
  },
  {
    title: "Household waste pile",
    area: "Lake Road corner",
    type: "Household waste",
    priority: "Medium",
    distance: "2.1 km",
  },
  {
    title: "Construction debris",
    area: "Ward 4 service lane",
    type: "Construction waste",
    priority: "Low",
    distance: "3.4 km",
  },
];

const vehicleName = document.querySelector("#vehicleName");
const vehicleArea = document.querySelector("#vehicleArea");
const vehicleEta = document.querySelector("#vehicleEta");
const vehicleCapacity = document.querySelector("#vehicleCapacity");
const vehicleDriver = document.querySelector("#vehicleDriver");
const locationHint = document.querySelector("#locationHint");
const reportForm = document.querySelector("#reportForm");
const formMessage = document.querySelector("#formMessage");
const reportsGrid = document.querySelector("#reportsGrid");

function selectVehicle(index) {
  const vehicle = vehicles[index];
  vehicleName.textContent = vehicle.name;
  vehicleArea.textContent = vehicle.area;
  vehicleEta.textContent = vehicle.eta;
  vehicleCapacity.textContent = vehicle.capacity;
  vehicleDriver.textContent = vehicle.driver;

  document.querySelectorAll(".vehicle-pin").forEach((pin) => {
    pin.classList.toggle("active", pin.dataset.vehicle === String(index));
  });
}

function renderReports() {
  reportsGrid.innerHTML = reports
    .map(
      (report) => `
        <article class="report-card">
          <header>
            <h3>${report.title}</h3>
            <span class="status-pill">Open</span>
          </header>
          <p>${report.area}</p>
          <div class="meta">
            <span>${report.type}</span>
            <span>${report.priority}</span>
            <span>${report.distance}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

document.querySelectorAll(".vehicle-pin").forEach((pin) => {
  pin.addEventListener("click", () => selectVehicle(Number(pin.dataset.vehicle)));
});

document.querySelector("#locateMe").addEventListener("click", () => {
  if (!navigator.geolocation) {
    locationHint.textContent = "GPS is not supported in this browser.";
    return;
  }

  locationHint.textContent = "Requesting your GPS position...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude.toFixed(5);
      const longitude = position.coords.longitude.toFixed(5);
      locationHint.textContent = `Location added: ${latitude}, ${longitude}`;
    },
    () => {
      locationHint.textContent = "Location permission was not allowed. Demo map is still available.";
    },
  );
});

document.querySelector("#getReportLocation").addEventListener("click", () => {
  formMessage.textContent = "GPS location added to this report in demo mode.";
});

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(reportForm);
  const area = data.get("area");
  const type = data.get("type");

  reports.unshift({
    title: "New citizen report",
    area,
    type,
    priority: "New",
    distance: "GPS added",
  });

  renderReports();
  formMessage.textContent = "Report submitted. Worker dashboard updated below.";
  reportForm.reset();
});

renderReports();