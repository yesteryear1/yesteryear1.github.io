document.addEventListener("DOMContentLoaded", function() {
    var backButton = document.createElement("button");
    backButton.textContent = "back";
    backButton.style.position = "fixed";
    backButton.style.top = "10px";
    backButton.style.right = "10px";
    backButton.style.background = "transparent";
    backButton.style.color = "white";
    backButton.style.border = "none"; // Remove border
    backButton.style.cursor = "pointer"; // Change cursor to pointer
    backButton.addEventListener("mouseleave", function(){
        backButton.style.color = "white";
    });
    backButton.addEventListener("mouseenter", function(){
        backButton.style.color = "rgb(196, 196, 196)";
    });
    backButton.addEventListener("mouseover", function() {
        playSound();
    });    
    backButton.addEventListener("click", function() {
        playSoundClick();
        setTimeout(function(){
            window.location.href = "index.html";
        },70)
    });
    document.body.appendChild(backButton);
});

function playSound() {
    var audio = new Audio('hover.ogg');
    audio.volume = 0.35;
    audio.play();
}
function playSoundClick() {
    var audio = new Audio('click.ogg');
    audio.volume = 0.5;
    audio.play();
}
