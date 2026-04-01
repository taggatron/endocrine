const glandData = {
  pituitary: {
    name: "Pituitary Gland",
    location: "base of the brain",
    summary: "Master endocrine regulator releasing trophic hormones that stimulate other glands.",
    hormones: ["TSH", "ACTH", "GH", "FSH", "LH", "ADH (posterior release)"]
  },
  thyroid: {
    name: "Thyroid Gland",
    location: "anterior neck",
    summary: "Controls metabolic rate, growth, and heat production using thyroxine and related hormones.",
    hormones: ["T4 Thyroxine", "T3", "Calcitonin"]
  },
  adrenals: {
    name: "Adrenal Glands",
    location: "on top of each kidney",
    summary: "Coordinate stress and blood-pressure responses through cortex and medulla hormones.",
    hormones: ["Adrenaline", "Cortisol", "Aldosterone"]
  },
  pancreas: {
    name: "Pancreas (Islets)",
    location: "upper abdomen behind stomach",
    summary: "Regulates blood glucose by balancing insulin and glucagon release.",
    hormones: ["Insulin", "Glucagon", "Somatostatin"]
  },
  gonads: {
    name: "Gonads",
    location: "pelvic region",
    summary: "Produce reproductive hormones and gamete-supporting signals.",
    hormones: ["Estrogen", "Progesterone", "Testosterone", "Inhibin"]
  }
};

const glandInfo = document.getElementById("gland-info");
const glandNodes = document.querySelectorAll(".gland");

function setActiveGland(glandKey) {
  const entry = glandData[glandKey];
  if (!entry) {
    return;
  }

  glandNodes.forEach((node) => {
    const active = node.dataset.gland === glandKey;
    node.classList.toggle("active", active);
  });

  const chips = entry.hormones.map((hormone) => `<span>${hormone}</span>`).join("");
  glandInfo.innerHTML = `
    <h3>${entry.name}</h3>
    <p class="location">Location: ${entry.location}</p>
    <p class="summary">${entry.summary}</p>
    <div class="hormone-list">${chips}</div>
  `;
}

glandNodes.forEach((node) => {
  node.addEventListener("click", () => setActiveGland(node.dataset.gland));
});

setActiveGland("pituitary");

const tabs = document.querySelectorAll(".tab");
const casePanels = document.querySelectorAll(".case-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((other) => {
      const active = other === tab;
      other.classList.toggle("active", active);
      other.setAttribute("aria-selected", active ? "true" : "false");
    });

    casePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === tab.dataset.case);
    });
  });
});

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const thyroxineSlider = document.getElementById("thyroxine");
const trhVal = document.getElementById("trh-val");
const tshVal = document.getElementById("tsh-val");
const thyroxineVal = document.getElementById("thyroxine-val");
const negativeMsg = document.getElementById("negative-msg");

function updateNegativeFeedback() {
  const thyroxine = Number(thyroxineSlider.value);
  const inhibitoryDrive = clamp((thyroxine - 50) * 1.5, -45, 45);
  const trh = Math.round(clamp(50 - inhibitoryDrive, 5, 95));
  const tsh = Math.round(clamp(50 - inhibitoryDrive * 0.9, 5, 95));

  thyroxineVal.textContent = String(Math.round(thyroxine));
  trhVal.textContent = String(trh);
  tshVal.textContent = String(tsh);

  if (thyroxine > 70) {
    negativeMsg.textContent = "High thyroxine suppresses TRH and TSH through negative feedback to restore set point.";
  } else if (thyroxine < 35) {
    negativeMsg.textContent = "Low thyroxine reduces feedback inhibition, so TRH and TSH rise to stimulate thyroid output.";
  } else {
    negativeMsg.textContent = "Thyroxine is near set point. Hypothalamus and pituitary output remain moderate.";
  }
}

thyroxineSlider.addEventListener("input", updateNegativeFeedback);

const temperatureSlider = document.getElementById("temperature");
const adhVal = document.getElementById("adh-val");
const thermoThyroxineVal = document.getElementById("thermo-thyroxine-val");
const sweatVal = document.getElementById("sweat-val");
const thermoMsg = document.getElementById("thermo-msg");

function updateThermoregulation() {
  const temp = Number(temperatureSlider.value);
  const deviation = temp - 37;

  const sweating = Math.round(clamp(50 + deviation * 20, 5, 99));
  const thyroxineDrive = Math.round(clamp(50 - deviation * 16, 5, 99));
  const adh = Math.round(clamp(50 + deviation * 8, 5, 99));

  sweatVal.textContent = String(sweating);
  thermoThyroxineVal.textContent = String(thyroxineDrive);
  adhVal.textContent = String(adh);

  if (temp > 38.2) {
    thermoMsg.textContent = "Heat stress triggers sweating and mild ADH rise to conserve fluid losses, while metabolic heat drive falls.";
  } else if (temp < 36.0) {
    thermoMsg.textContent = "Cold stress increases thyroid-driven metabolic heat production and reduces sweating output.";
  } else {
    thermoMsg.textContent = "At set point, basal metabolic and cooling signals are balanced.";
  }
}

temperatureSlider.addEventListener("input", updateThermoregulation);

const glucoseSlider = document.getElementById("glucose");
const insulinVal = document.getElementById("insulin-val");
const glucagonVal = document.getElementById("glucagon-val");
const liverVal = document.getElementById("liver-val");
const glucoseMsg = document.getElementById("glucose-msg");

function updateGlucose() {
  const glucose = Number(glucoseSlider.value);
  const delta = glucose - 5.2;

  const insulin = Math.round(clamp(52 + delta * 12, 5, 99));
  const glucagon = Math.round(clamp(48 - delta * 10, 5, 99));
  const liverRelease = Math.round(clamp(45 - delta * 9, 5, 99));

  insulinVal.textContent = String(insulin);
  glucagonVal.textContent = String(glucagon);
  liverVal.textContent = String(liverRelease);

  if (glucose > 7.2) {
    glucoseMsg.textContent = "After high glucose intake, insulin rises to increase uptake and glycogen synthesis, suppressing hepatic release.";
  } else if (glucose < 4.2) {
    glucoseMsg.textContent = "Low blood glucose increases glucagon, driving glycogen breakdown and glucose release from the liver.";
  } else {
    glucoseMsg.textContent = "Normal range supports balanced insulin and glucagon secretion.";
  }
}

glucoseSlider.addEventListener("input", updateGlucose);

const osmolaritySlider = document.getElementById("osmolarity");
const osmoAdhVal = document.getElementById("osmo-adh-val");
const thirstVal = document.getElementById("thirst-val");
const urineVal = document.getElementById("urine-val");
const osmoMsg = document.getElementById("osmo-msg");

function updateOsmoregulation() {
  const osm = Number(osmolaritySlider.value);
  const delta = osm - 290;

  const adh = Math.round(clamp(50 + delta * 1.5, 5, 99));
  const thirst = Math.round(clamp(50 + delta * 1.2, 5, 99));
  const urineConcentration = Math.round(clamp(50 + delta * 1.4, 5, 99));

  osmoAdhVal.textContent = String(adh);
  thirstVal.textContent = String(thirst);
  urineVal.textContent = String(urineConcentration);

  if (osm > 300) {
    osmoMsg.textContent = "Rising osmolarity stimulates hypothalamic osmoreceptors, increasing ADH and thirst to conserve water.";
  } else if (osm < 280) {
    osmoMsg.textContent = "Low osmolarity suppresses ADH, so kidneys excrete more dilute urine to remove excess water.";
  } else {
    osmoMsg.textContent = "Osmolarity is close to set point, so kidney water reabsorption is moderate.";
  }
}

osmolaritySlider.addEventListener("input", updateOsmoregulation);

updateNegativeFeedback();
updateThermoregulation();
updateGlucose();
updateOsmoregulation();
