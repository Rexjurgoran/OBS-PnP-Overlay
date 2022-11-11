const CONFIG_NAME = "config";
let config = defaulConfig;

window.onload = start();

function start() {
    loadConfig();

    let rootElement = document.querySelector(':root');

    document.getElementById("class-icon").innerHTML = config.classIcon;
    $("select[name='icon']")[0].value = config.classIcon;

    document.getElementById("character-name").innerText = config.characterName;
    $("input[name='characterName']")[0].value = config.characterName;

    document.getElementById("hp-bar").value = config.hpCurrent;
    document.getElementById("hp-bar").max = config.hpMax;
    rootElement.style.setProperty('--hpMax', config.hpMax);
    $("input[name='hpMax']")[0].value = config.hpMax;

    document.getElementById("ap-bar").value = config.apCurrent;
    document.getElementById("ap-bar").max = config.apMax;
    rootElement.style.setProperty('--apMax', config.apMax);
    $("input[name='apMax']")[0].value = config.apMax;

    document.getElementById("level-number").innerText = config.level;
    $("input[name='level']")[0].value = config.level;

    rootElement.style.setProperty('--accent', config.colors.accent);
    $("input[name='accent']")[0].value = config.colors.accent;

    rootElement.style.setProperty('--accentLower', config.colors.accentLower);
    $("input[name='accentLower']")[0].value = config.colors.accentLower;

    rootElement.style.setProperty('--hp', config.colors.hp);
    $("input[name='hp']")[0].value = config.colors.hp;

    rootElement.style.setProperty('--hpLower', config.colors.hpLower);
    $("input[name='hpLower']")[0].value = config.colors.hpLower;

    rootElement.style.setProperty('--ap', config.colors.ap);
    $("input[name='ap']")[0].value = config.colors.ap;

    rootElement.style.setProperty('--apLower', config.colors.apLower);
    $("input[name='apLower']")[0].value = config.colors.apLower;

    let statContainer = "";
    let settingsContainer = "";
    for (const pair of config.stats) {
        statContainer = statContainer + "<div class='pair'><div class='stat'>" + pair.stat + "</div><div class='value'>" + pair.value + "</div></div>"
        settingsContainer = settingsContainer +
            "<div class='pair'>" +
            "<label for='" + pair.stat + "'>" + pair.stat + "</label>" +
            "<input type='text' name='" + pair.stat + "' value='" + pair.value + "' oninput='changeSetting(this)'/>" +
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
function downloadConfig() {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(config)));
    element.setAttribute('download', 'config.json');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function uploadConfig(button) {
    button.children[1].click();
}
function getConfigFromFile(input) {
    for (let file of input.files) {
        if (file.name.toLowerCase().indexOf(".json") === -1) {
            continue;
        }
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            config = JSON.parse(reader.result);
            saveConfig();
            start();
        }, false);
        reader.readAsText(file, "UTF-8");
    }
    input.files = null;
}
function resetConfig() {
    config = defaulConfig;
    saveConfig();
    start();
}
function changeSetting(input) {
    switch (input.name) {
        case 'icon':
            config.classIcon = input.value;
            break;
        case 'characterName':
            config.characterName = input.value;
            break;
        case 'level':
            config.level = input.value;
            break;
        case 'hpMax':
            config.hpMax = input.value;
            break;
        case 'apMax':
            config.apMax = input.value;
            break;
        case 'accent':
            config.colors.accent = input.value;
            break;
        case 'accentLower':
            config.colors.accentLower = input.value;
            break;
        case 'hp':
            config.colors.hp = input.value;
            break;
        case 'hpLower':
            config.colors.hpLower = input.value;
            break;
        case 'ap':
            config.colors.ap = input.value;
            break;
        case 'apLower':
            config.colors.apLower = input.value;
            break;
        default:
            for (let stat of config.stats) {
                if (stat.stat == input.name) {
                    stat.value = input.value;
                    break;
                }
            }
    };
    saveConfig();
    start();
}