window.onload = start();

function start(){
    document.getElementById("character-name").innerText = characterName;   
    document.getElementById("class-icon").innerHTML = classIcon;
    document.getElementById("hp-bar").value = hpCurrent;
    document.getElementById("hp-bar").max = hpMax;
    document.getElementById("ap-bar").value = apCurrent;
    document.getElementById("ap-bar").max = apMax;

    let statContainer = "";
    for(const pair of stats){
        statContainer = statContainer + "<div class='pair'><div class='stat'>"+pair.stat+"</div><div class='value'>"+pair.value+"</div></div>"
    }
    document.getElementById("stat-container").innerHTML = statContainer;

    let levelContainer = "";
    for(let i = 0; i < level; i++) {
        levelContainer = levelContainer + "<i class='fas fa-dice-d20'></i>";
    }
    document.getElementById("level").innerHTML = levelContainer;
}

function hideCard() {
    if (document.getElementById("card").style.display == "none") {
        $("#card").slideDown();
    } else {
        $("#card").slideUp();
    }
}

function damage(bar) {
    document.getElementById(bar+"-bar").value += -1;
}

function health(bar) {
    document.getElementById(bar+"-bar").value += 1;
}

function showStatContainer(){
    if (document.getElementById("stat-container").style.display == "none") {
        $("#stat-container").animate({width: 'toggle'});
        $("#moreIcon").removeClass("fa-angle-right");
        $("#moreIcon").addClass("fa-angle-left");
    } else {
        $("#stat-container").animate({width: 'toggle'});
        $("#moreIcon").removeClass("fa-angle-left");
        $("#moreIcon").addClass("fa-angle-right");
    }
}