const CONFIG_NAME = "config";
let config = defaulConfig;

window.onload = init;

function init() {
    start();
}
function start() {
    loadConfig();
    setSettingValues();
    setCSSProperties();
    rebuildStatContainer();
}

function setSettingValues() {
    $("select[name='icon']")[0].value = config.classIcon;
    $("input[name='characterName']")[0].value = config.characterName;
    $("input[name='hpMax']")[0].value = config.hpMax;
    $("input[name='apMax']")[0].value = config.apMax;
    $("input[name='level']")[0].value = config.level;
    $("input[name='accent']")[0].value = config.colors.accent;
    $("input[name='accentLower']")[0].value = config.colors.accentLower;
    $("input[name='hp']")[0].value = config.colors.hp;
    $("input[name='hpLower']")[0].value = config.colors.hpLower;
    $("input[name='ap']")[0].value = config.colors.ap;
    $("input[name='apLower']")[0].value = config.colors.apLower;
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

function rebuildStatContainer() {
    let settingsContainer = "";
    for (const pair of config.stats) {
        settingsContainer = settingsContainer +
            "<div class='pair'>" +
            "<label for='" + pair.stat + "'>" + pair.stat + "</label>" +
            "<input type='text' name='" + pair.stat + "' value='" + pair.value + "' oninput='changeSetting(this)'/>" +
            "</div>";
    }
    document.getElementById("stat-settings").innerHTML = settingsContainer;
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
    setCSSProperties();
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

function copyTextToClipboard(button) {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = JSON.stringify(config);

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        button.children[0].classList.toggle('fa-clipboard');
        button.children[0].classList.toggle('fa-clipboard-check');
        const timeout = setTimeout(function () {
            button.children[0].classList.toggle('fa-clipboard');
            button.children[0].classList.toggle('fa-clipboard-check');
        }, 1000);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
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