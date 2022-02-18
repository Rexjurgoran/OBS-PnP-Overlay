function hideCard() {
    if (document.getElementById("card").style.display == "none") {
        $("#card").slideDown();
    } else {
        $("#card").slideUp();
    }
}
function damage(barId) {
    document.getElementById(barId).value += -1;
}
function health(barId) {
    document.getElementById(barId).value += 1;
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