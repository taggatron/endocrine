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
const glandHitNodes = document.querySelectorAll(".gland-hit");
const hormoneModalBackdrop = document.getElementById("hormone-modal-backdrop");
const hormoneModalClose = document.getElementById("hormone-modal-close");
const hormoneModalTitle = document.getElementById("hormone-modal-title");
const hormoneModalWhat = document.getElementById("hormone-modal-what");
const hormoneModalDoes = document.getElementById("hormone-modal-does");

const hormoneDetails = {
  tsh: {
    what: "Thyroid-stimulating hormone released from the anterior pituitary.",
    does: "Stimulates the thyroid gland to produce and release thyroid hormones (mainly T4 and T3)."
  },
  acth: {
    what: "Adrenocorticotropic hormone from the anterior pituitary.",
    does: "Stimulates the adrenal cortex to release cortisol for stress and metabolic regulation."
  },
  gh: {
    what: "Growth hormone secreted by the anterior pituitary.",
    does: "Promotes growth, protein synthesis, and energy mobilization in tissues."
  },
  fsh: {
    what: "Follicle-stimulating hormone from the pituitary gonadotrophs.",
    does: "Supports ovarian follicle development and estrogen production, and supports sperm production in testes."
  },
  lh: {
    what: "Luteinizing hormone from the anterior pituitary.",
    does: "Triggers ovulation and progesterone production in ovaries, and stimulates testosterone production in testes."
  },
  "adh posterior release": {
    what: "Antidiuretic hormone produced in the hypothalamus and released by the posterior pituitary.",
    does: "Increases kidney water reabsorption and helps maintain blood volume and osmolarity."
  },
  "t4 thyroxine": {
    what: "The main thyroid hormone circulating in blood.",
    does: "Raises metabolic rate and supports growth, neural function, and heat production."
  },
  t3: {
    what: "The more biologically active thyroid hormone.",
    does: "Binds nuclear receptors to regulate metabolic gene expression in target cells."
  },
  calcitonin: {
    what: "Peptide hormone made by thyroid parafollicular cells.",
    does: "Lowers blood calcium by reducing bone resorption and increasing calcium deposition in bone."
  },
  adrenaline: {
    what: "Catecholamine hormone released by the adrenal medulla.",
    does: "Drives the fight-or-flight response by increasing heart rate, blood flow to muscle, and glucose availability."
  },
  cortisol: {
    what: "A glucocorticoid steroid hormone from the adrenal cortex.",
    does: "Coordinates long-term stress response, influences immune activity, and increases glucose availability."
  },
  aldosterone: {
    what: "A mineralocorticoid hormone made by the adrenal cortex.",
    does: "Increases sodium and water retention in kidneys, helping regulate blood pressure."
  },
  insulin: {
    what: "Peptide hormone from pancreatic beta cells.",
    does: "Lowers blood glucose by promoting glucose uptake and storage in liver, muscle, and adipose tissue."
  },
  glucagon: {
    what: "Peptide hormone from pancreatic alpha cells.",
    does: "Raises blood glucose by stimulating glycogen breakdown and glucose release from the liver."
  },
  somatostatin: {
    what: "Inhibitory peptide hormone from pancreatic delta cells and hypothalamus.",
    does: "Dampens secretion of several hormones, including insulin, glucagon, GH, and TSH."
  },
  estrogen: {
    what: "Primary female sex steroid hormones, mainly from ovaries.",
    does: "Regulates menstrual cycle, supports reproductive tissues, and contributes to bone and cardiovascular health."
  },
  progesterone: {
    what: "Steroid hormone mainly produced by the corpus luteum and placenta.",
    does: "Prepares and maintains the uterus for implantation and pregnancy."
  },
  testosterone: {
    what: "Primary androgen hormone, mainly from testes.",
    does: "Supports sperm production, muscle and bone mass, and development of male secondary sex characteristics."
  },
  inhibin: {
    what: "Gonadal peptide hormone produced in ovaries and testes.",
    does: "Provides negative feedback to reduce pituitary FSH secretion."
  }
};

function hormoneKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getHormoneDetails(name) {
  return hormoneDetails[hormoneKey(name)] || {
    what: "A signaling molecule secreted by an endocrine gland.",
    does: "Travels in blood, binds specific receptors, and changes target-cell activity."
  };
}

function openHormoneModal(name) {
  if (!hormoneModalBackdrop || !hormoneModalTitle || !hormoneModalWhat || !hormoneModalDoes) {
    return;
  }

  const details = getHormoneDetails(name);
  hormoneModalTitle.textContent = name;
  hormoneModalWhat.textContent = details.what;
  hormoneModalDoes.textContent = details.does;
  hormoneModalBackdrop.hidden = false;
}

function closeHormoneModal() {
  if (!hormoneModalBackdrop) {
    return;
  }
  hormoneModalBackdrop.hidden = true;
}

function setActiveGland(glandKey) {
  const entry = glandData[glandKey];
  if (!entry) {
    return;
  }

  glandNodes.forEach((node) => {
    const active = node.dataset.gland === glandKey;
    node.classList.toggle("active", active);
  });

  const chips = entry.hormones
    .map((hormone) => `<button type="button" class="hormone-chip" data-hormone="${hormone}">${hormone}</button>`)
    .join("");
  glandInfo.innerHTML = `
    <h3>${entry.name}</h3>
    <p class="location">Location: ${entry.location}</p>
    <p class="summary">${entry.summary}</p>
    <div class="hormone-list">${chips}</div>
  `;
}

if (glandInfo) {
  glandInfo.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const chip = target.closest(".hormone-chip");
    if (!chip) {
      return;
    }

    const hormoneName = chip.getAttribute("data-hormone");
    if (hormoneName) {
      openHormoneModal(hormoneName);
    }
  });
}

if (hormoneModalBackdrop && hormoneModalClose) {
  hormoneModalClose.addEventListener("click", closeHormoneModal);
  hormoneModalBackdrop.addEventListener("click", (event) => {
    if (event.target === hormoneModalBackdrop) {
      closeHormoneModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !hormoneModalBackdrop.hidden) {
      closeHormoneModal();
    }
  });
}

glandHitNodes.forEach((node) => {
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

const glucoseModes = document.querySelectorAll(".glucose-mode");
const glucoseDeepPanel = document.getElementById("glucose-homeostasis-deep");
const glucoseStageButtons = document.querySelectorAll(".glucose-stage-btn");
const glucoseStageTitle = document.getElementById("glucose-stage-title");
const glucoseStageDetail = document.getElementById("glucose-stage-detail");
const glucoseStageGland = document.getElementById("glucose-stage-gland");
const glucoseStageHormone = document.getElementById("glucose-stage-hormone");
const glucoseStageTarget = document.getElementById("glucose-stage-target");
const glucoseStageResponse = document.getElementById("glucose-stage-response");
const glucoseLeftArrowLabel = document.getElementById("glucose-left-arrow-label");
const glucoseGraphCurve = document.getElementById("glucose-curve");
const glucoseGraphMarker = document.getElementById("glucose-marker");
const glucoseGraphCaption = document.getElementById("glucose-graph-caption");

const glucoseGraphProfiles = {
  hyper: [0.34, 0.55, 0.42, 0.2, 0.04],
  hypo: [-0.34, -0.55, -0.42, -0.2, -0.04]
};

const glucoseLoopData = {
  hyper: {
    title: "Hyperglycaemia Pathway",
    stages: [
      {
        navLabel: "Glucose rises",
        detail: "Blood glucose rises after a carbohydrate-rich meal, typically around 140-180 mg per 100 mL.",
        gland: "Pancreas (islets, beta cells)",
        hormone: "Insulin rising, glucagon suppressed",
        target: "Pancreas sensing + liver and muscle priming",
        response: "Detection phase begins and anabolic signaling ramps up.",
        organs: ["pancreas"]
      },
      {
        navLabel: "Pancreas detects",
        detail: "Pancreatic beta cells detect the increased glucose concentration, commonly about 150-170 mg per 100 mL.",
        gland: "Pancreas (beta cells)",
        hormone: "Insulin secretion increases",
        target: "Liver and skeletal muscle",
        response: "Hormonal signal enters circulation to increase glucose uptake.",
        organs: ["pancreas"]
      },
      {
        navLabel: "Hormone release",
        detail: "Insulin drives transporter activity and anabolic storage pathways as glucose begins to fall toward roughly 130-150 mg per 100 mL.",
        gland: "Pancreas",
        hormone: "High insulin, low glucagon",
        target: "Liver and skeletal muscle target cells",
        response: "Cells increase glucose entry and reduce hepatic output.",
        organs: ["liver", "muscle"]
      },
      {
        navLabel: "Target uptake",
        detail: "Liver and muscle convert glucose to glycogen for short-term storage, with blood glucose often near 110-125 mg per 100 mL.",
        gland: "Pancreas (ongoing insulin support)",
        hormone: "Insulin dominant",
        target: "Liver and skeletal muscle",
        response: "Glucose is buffered out of blood and stored as glycogen.",
        organs: ["liver", "muscle"]
      },
      {
        navLabel: "Set point restored",
        detail: "Blood glucose falls back toward set point (about 90-100 mg per 100 mL) and insulin tapers.",
        gland: "Pancreas feedback control",
        hormone: "Insulin normalizes",
        target: "Whole-body glucose network",
        response: "Homeostasis is restored by negative feedback.",
        organs: ["pancreas", "liver", "muscle"]
      }
    ]
  },
  hypo: {
    title: "Hypoglycaemia Pathway",
    stages: [
      {
        navLabel: "Glucose drops",
        detail: "Blood glucose drops between meals, overnight, or after prolonged activity, commonly to around 65-75 mg per 100 mL.",
        gland: "Pancreas (islets, alpha cells)",
        hormone: "Glucagon begins to rise, insulin falls",
        target: "Pancreas sensing + liver priming",
        response: "Counter-regulatory response activates.",
        organs: ["pancreas"]
      },
      {
        navLabel: "Pancreas detects",
        detail: "Pancreatic alpha cells detect low glucose and increase glucagon release, often around 55-65 mg per 100 mL.",
        gland: "Pancreas (alpha cells)",
        hormone: "Glucagon increased",
        target: "Liver",
        response: "Circulating signal stimulates hepatic glucose production.",
        organs: ["pancreas", "liver"]
      },
      {
        navLabel: "Hormone release",
        detail: "Liver increases glycogenolysis and gluconeogenesis to release glucose when levels may be around 50-60 mg per 100 mL.",
        gland: "Pancreas support + hepatic response",
        hormone: "Glucagon dominant",
        target: "Liver hepatocytes",
        response: "Hepatic glucose output elevates blood glucose.",
        organs: ["liver"]
      },
      {
        navLabel: "Target response",
        detail: "Skeletal muscle reduces glucose disposal and shifts fuel preference as blood glucose recovers toward about 60-75 mg per 100 mL.",
        gland: "Pancreas-adapted endocrine state",
        hormone: "Low insulin, high glucagon context",
        target: "Skeletal muscle target cells",
        response: "Glucose is spared for essential organs, including brain.",
        organs: ["muscle"]
      },
      {
        navLabel: "Set point restored",
        detail: "Blood glucose rises toward set point (about 85-95 mg per 100 mL) and counter-regulation tapers.",
        gland: "Pancreas feedback control",
        hormone: "Glucagon and insulin move toward baseline",
        target: "Whole-body glucose network",
        response: "Homeostasis is re-established.",
        organs: ["pancreas", "liver", "muscle"]
      }
    ]
  }
};

let activeGlucoseMode = "hyper";
let activeGlucoseStage = 0;

function updateStageButtonIcons() {
  const modeEntry = glucoseLoopData[activeGlucoseMode];
  if (!modeEntry) {
    return;
  }

  glucoseStageButtons.forEach((button, idx) => {
    const stageEntry = modeEntry.stages[idx];
    const organsForStage = stageEntry ? stageEntry.organs : [];
    const labelNode = button.querySelector(".stage-label");
    if (labelNode && stageEntry?.navLabel) {
      labelNode.textContent = stageEntry.navLabel;
    }
    const icons = button.querySelectorAll(".mini-organ");
    icons.forEach((icon) => {
      const organKey = icon.getAttribute("data-mini-organ");
      icon.classList.toggle("is-on", Boolean(organKey && organsForStage.includes(organKey)));
    });
  });
}

function getGraphPoints(modeKey) {
  const values = glucoseGraphProfiles[modeKey] || glucoseGraphProfiles.hyper;
  const xStart = 95;
  const xEnd = 455;
  const baselineY = 130;
  const amplitude = 78;
  const stepX = (xEnd - xStart) / (values.length - 1);

  return values.map((value, idx) => ({
    x: xStart + stepX * idx,
    y: baselineY - value * amplitude
  }));
}

function buildGraphPath(points) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let idx = 0; idx < points.length - 1; idx += 1) {
    const p0 = points[idx - 1] || points[idx];
    const p1 = points[idx];
    const p2 = points[idx + 1];
    const p3 = points[idx + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

function updateGlucoseGraph() {
  if (!glucoseGraphCurve || !glucoseGraphMarker) {
    return;
  }

  const points = getGraphPoints(activeGlucoseMode);
  const activePoint = points[activeGlucoseStage] || points[0];
  glucoseGraphCurve.setAttribute("d", buildGraphPath(points));
  glucoseGraphMarker.setAttribute("cx", String(activePoint.x));
  glucoseGraphMarker.setAttribute("cy", String(activePoint.y));

  if (glucoseGraphCaption) {
    const direction = activeGlucoseMode === "hyper" ? "above" : "below";
    glucoseGraphCaption.textContent = `Stage ${activeGlucoseStage + 1}: marker moves ${direction} the y = 0 normal line as the pathway progresses.`;
  }
}

function renderGlucoseLoop() {
  const modeEntry = glucoseLoopData[activeGlucoseMode];
  if (!modeEntry) {
    return;
  }

  if (glucoseDeepPanel) {
    glucoseDeepPanel.setAttribute("data-active-mode", activeGlucoseMode);
  }

  if (glucoseLeftArrowLabel) {
    glucoseLeftArrowLabel.textContent = activeGlucoseMode === "hyper" ? "Hyperglycaemia" : "Hypoglycaemia";
  }

  const stageEntry = modeEntry.stages[activeGlucoseStage];
  if (!stageEntry) {
    return;
  }

  glucoseStageButtons.forEach((button, idx) => {
    const active = idx === activeGlucoseStage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });

  if (glucoseStageTitle) {
    glucoseStageTitle.textContent = `${modeEntry.title}: Stage ${activeGlucoseStage + 1}`;
  }
  if (glucoseStageDetail) {
    glucoseStageDetail.textContent = stageEntry.detail;
  }
  if (glucoseStageGland) {
    glucoseStageGland.textContent = stageEntry.gland;
  }
  if (glucoseStageHormone) {
    glucoseStageHormone.textContent = stageEntry.hormone;
  }
  if (glucoseStageTarget) {
    glucoseStageTarget.textContent = stageEntry.target;
  }
  if (glucoseStageResponse) {
    glucoseStageResponse.textContent = stageEntry.response;
  }

  updateStageButtonIcons();
  updateGlucoseGraph();
}

glucoseModes.forEach((modeButton) => {
  modeButton.addEventListener("click", () => {
    activeGlucoseMode = modeButton.dataset.glucoseMode || "hyper";
    activeGlucoseStage = 0;

    glucoseModes.forEach((button) => {
      const active = button === modeButton;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    renderGlucoseLoop();
  });
});

glucoseStageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeGlucoseStage = Number(button.dataset.stageIndex || 0);
    renderGlucoseLoop();
  });
});

renderGlucoseLoop();

const matchBoard = document.getElementById("match-board");
const matchLines = document.getElementById("match-lines");
const matchStatus = document.getElementById("match-status");
const matchReset = document.getElementById("match-reset");
const matchItems = document.querySelectorAll(".match-item, .match-action");

const expectedMatches = {
  adrenal: "adrenaline",
  pancreas: "insulin-glucagon",
  thyroid: "thyroxine",
  pituitary: "fsh-lh",
  ovaries: "oestrogen-progesterone",
  testes: "testosterone"
};

if (matchBoard && matchLines && matchStatus && matchReset && matchItems.length > 0) {
  let selectedLeft = null;
  let selectedRight = null;
  let selectedAction = null;
  const matchedTriples = new Map();

  function clearSelections() {
    selectedLeft?.classList.remove("selected");
    selectedRight?.classList.remove("selected");
    selectedAction?.classList.remove("selected");
    selectedLeft = null;
    selectedRight = null;
    selectedAction = null;
  }

  function setStatus(text, complete = false) {
    matchStatus.textContent = text;
    matchStatus.classList.toggle("match-complete", complete);
  }

  function boardCoordinates(element) {
    const boardRect = matchBoard.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    return {
      x: rect.left - boardRect.left + rect.width / 2,
      y: rect.top - boardRect.top + rect.height / 2
    };
  }

  function fitLineCanvas() {
    const { width, height } = matchBoard.getBoundingClientRect();
    matchLines.setAttribute("viewBox", `0 0 ${Math.max(1, width)} ${Math.max(1, height)}`);
    matchLines.setAttribute("width", String(width));
    matchLines.setAttribute("height", String(height));
  }

  function makeCurvePath(start, end) {
    const midX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
  }

  function drawLink(startEl, endEl, state, key, persist) {
    const start = boardCoordinates(startEl);
    const end = boardCoordinates(endEl);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.classList.add("match-link", state);
    path.setAttribute("d", makeCurvePath(start, end));
    if (key) {
      path.dataset.pair = key;
    }

    matchLines.appendChild(path);

    if (!persist) {
      window.setTimeout(() => path.remove(), 520);
    }
  }

  function drawTriple(leftEl, rightEl, actionEl, state, key, persist) {
    drawLink(leftEl, rightEl, state, `${key}-lr`, persist);
    drawLink(rightEl, actionEl, state, `${key}-ra`, persist);
  }

  function redrawMatchedTriples() {
    matchLines.innerHTML = "";
    matchedTriples.forEach((entry, leftId) => {
      const leftEl = matchBoard.querySelector(`.match-item[data-side="left"][data-id="${leftId}"]`);
      const rightEl = matchBoard.querySelector(`.match-item[data-side="right"][data-id="${entry.rightId}"]`);
      const actionEl = matchBoard.querySelector(`.match-action[data-side="action"][data-id="${entry.actionId}"]`);
      if (leftEl && rightEl && actionEl) {
        drawTriple(leftEl, rightEl, actionEl, "correct", `${leftId}-${entry.rightId}-${entry.actionId}`, true);
      }
    });
  }

  function markWrong(leftEl, rightEl, actionEl) {
    leftEl.classList.add("wrong");
    rightEl.classList.add("wrong");
    actionEl.classList.add("wrong");
    drawTriple(leftEl, rightEl, actionEl, "wrong", "", false);

    window.setTimeout(() => {
      leftEl.classList.remove("wrong");
      rightEl.classList.remove("wrong");
      actionEl.classList.remove("wrong");
      clearSelections();
      setStatus("Not quite. Choose a gland, hormone, and matching action that belong together.");
    }, 420);
  }

  function markCorrect(leftEl, rightEl, actionEl) {
    leftEl.classList.remove("selected");
    rightEl.classList.remove("selected");
    actionEl.classList.remove("selected");
    leftEl.classList.add("matched");
    rightEl.classList.add("matched");
    actionEl.classList.add("matched");
    leftEl.disabled = true;
    rightEl.disabled = true;
    actionEl.disabled = true;

    matchedTriples.set(leftEl.dataset.id, { rightId: rightEl.dataset.id, actionId: actionEl.dataset.id });
    redrawMatchedTriples();
    clearSelections();

    if (matchedTriples.size === Object.keys(expectedMatches).length) {
      setStatus("Excellent work. You matched all gland-hormone-action triples.", true);
    } else {
      const remaining = Object.keys(expectedMatches).length - matchedTriples.size;
      setStatus(`Correct triple. ${remaining} set${remaining === 1 ? "" : "s"} left.`);
    }
  }

  function tryMatch() {
    if (!selectedLeft || !selectedRight || !selectedAction) {
      return;
    }

    const leftId = selectedLeft.dataset.id;
    const rightId = selectedRight.dataset.id;
    const actionId = selectedAction.dataset.id;
    const isCorrect = expectedMatches[leftId] === rightId && rightId === actionId;

    if (isCorrect) {
      markCorrect(selectedLeft, selectedRight, selectedAction);
      return;
    }

    markWrong(selectedLeft, selectedRight, selectedAction);
  }

  function handleSelect(item) {
    if (item.classList.contains("matched")) {
      return;
    }

    const side = item.dataset.side;
    if (side === "left") {
      selectedLeft?.classList.remove("selected");
      selectedLeft = item;
      selectedLeft.classList.add("selected");
      setStatus("Gland selected. Choose a hormone and an action.");
    } else if (side === "right") {
      selectedRight?.classList.remove("selected");
      selectedRight = item;
      selectedRight.classList.add("selected");
      setStatus("Hormone selected. Choose a gland and an action.");
    } else {
      selectedAction?.classList.remove("selected");
      selectedAction = item;
      selectedAction.classList.add("selected");
      setStatus("Action selected. Choose a gland and a hormone.");
    }

    if (selectedLeft && selectedRight && selectedAction) {
      tryMatch();
    }
  }

  matchItems.forEach((item) => {
    item.addEventListener("pointerdown", () => handleSelect(item));
  });

  matchReset.addEventListener("click", () => {
    selectedLeft = null;
    selectedRight = null;
    selectedAction = null;
    matchedTriples.clear();
    matchLines.innerHTML = "";

    matchItems.forEach((item) => {
      item.classList.remove("selected", "matched", "wrong");
      item.disabled = false;
    });

    setStatus("Match all 6 gland-hormone-action triples correctly.");
    fitLineCanvas();
  });

  const redrawOnResize = () => {
    fitLineCanvas();
    redrawMatchedTriples();
  };

  fitLineCanvas();
  window.addEventListener("resize", redrawOnResize);
  window.addEventListener("orientationchange", redrawOnResize);
}
