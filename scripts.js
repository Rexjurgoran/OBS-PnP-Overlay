const CONFIG_NAME = "config";

window.onload = start();

function start() {
    loadConfig();

    document.getElementById("class-icon").innerHTML = config.classIcon;

    document.getElementById("character-name").innerText = config.characterName;
    $("input[name='characterName']")[0].value = config.characterName;

    document.getElementById("hp-bar").value = config.hpCurrent;
    document.getElementById("hp-bar").max = config.hpMax;
    $("input[name='hpMax']")[0].value = config.hpMax;

    document.getElementById("ap-bar").value = config.apCurrent;
    document.getElementById("ap-bar").max = config.apMax;
    $("input[name='apMax']")[0].value = config.apMax;

    document.getElementById("level-number").innerText = config.level;
    $("input[name='level']")[0].value = config.level;

    let statContainer = "";
    let settingsContainer = "";
    for (const pair of config.stats) {
        statContainer = statContainer + "<div class='pair'><div class='stat'>" + pair.stat + "</div><div class='value'>" + pair.value + "</div></div>"
        settingsContainer = settingsContainer +
            "<div class='pair'>" +
            "<label for='" + pair.stat + "'>" + pair.stat + "</label>" +
            "<input type='text' name='" + pair.stat + "' value='" + pair.value + "'/>" +
            "</div>";
    }
    document.getElementById("stat-container").innerHTML = statContainer;
    document.getElementById("stat-settings").innerHTML = settingsContainer;

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
function saveSettings() {
    config.characterName = $("input[name='characterName']")[0].value;
    config.hpMax = $("input[name='hpMax']")[0].value;
    config.apMax = $("input[name='apMax']")[0].value;
    config.level = $("input[name='level']")[0].value;
    const statSettings = $("#stat-settings").children();
    for (let stat of config.stats) {
        for (let setting of statSettings) {
            if (stat.stat == setting.children[1].name) {
                stat.value = setting.children[1].value;
                break;
            }
        }
    }

    saveConfig();
    start();
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