const CONFIG_NAME = "config";
let config = defaulConfig;

window.onload = init;

function init() {
    window.addEventListener("storage", start);
    start();
}
function start() {
    loadConfig();

    document.getElementById("class-icon").innerHTML = config.classIcon;
    document.getElementById("character-name").innerText = config.characterName;
    document.getElementById("hp-bar").value = config.hpCurrent;
    document.getElementById("hp-bar").max = config.hpMax;
    document.getElementById("ap-bar").value = config.apCurrent;
    document.getElementById("ap-bar").max = config.apMax;
    document.getElementById("level-number").innerText = config.level;

    setCSSProperties();

    let statContainer = "";
    for (const pair of config.stats) {
        statContainer = statContainer + "<div class='pair'><div class='stat'>" + pair.stat + "</div><div class='value'>" + pair.value + "</div></div>"
    }
    document.getElementById("stat-container").innerHTML = statContainer;

}

function setCSSProperties() {
    let rootElement = document.querySelector(':root');
    rootElement.style.setProperty('--lpMax', config.hpMax);
    rootElement.style.setProperty('--apMax', config.apMax);
    rootElement.style.setProperty('--accent', config.colors.accent);
    rootElement.style.setProperty('--accentLower', config.colors.accentLower);
    rootElement.style.setProperty('--hp', config.colors.hp);
    rootElement.style.setProperty('--hpLower', config.colors.hpLower);
    rootElement.style.setProperty('--ap', config.colors.ap);
    rootElement.style.setProperty('--apLower', config.colors.apLower);
}

function loadConfig() {
    const configString = localStorage.getItem(CONFIG_NAME);
    if (configString) {
        config = JSON.parse(configString);
    } else {
        saveConfig();
    }
}
function saveConfig() {
    localStorage.setItem(CONFIG_NAME, JSON.stringify(config));
}
function toggleSection(button, id) {
    if (document.getElementById(id).style.display == "none") {
        $("section#" + id).slideDown();
    } else {
        $("section#" + id).slideUp();
    }
    if (button.children[0].id == "angle") {
        button.children[0].classList.toggle("fa-angle-down");
        button.children[0].classList.toggle("fa-angle-up");
    } else {
        button.classList.toggle("active");
    }
}

function removeProgress(bar) {
    const element = document.getElementById(bar + "-bar");
    if (element.value > 0) {
        element.value -= 1;
    }
    saveBarState(bar, element);
}

function addProgress(bar) {
    const element = document.getElementById(bar + "-bar");
    if (element.max != element.value) {
        element.value += 1;
    }
    saveBarState(bar, element);
}

function saveBarState(bar, element) {
    switch (bar) {
        case "hp":
            config.hpCurrent = element.value;
            break;
        case "ap":
            config.apCurrent = element.value;
            break;
    }
    saveConfig();
}

function showStatContainer() {
    if (document.getElementById("stat-container").style.display == "none") {
        $("#stat-container").animate({ width: 'toggle' });
        $("#moreIcon").removeClass("fa-angle-right");
        $("#moreIcon").addClass("fa-angle-left");
    } else {
        $("#stat-container").animate({ width: 'toggle' });
        document.getElementById("stat-container").style.display = 'grid';
        $("#moreIcon").removeClass("fa-angle-left");
        $("#moreIcon").addClass("fa-angle-right");
    }
}