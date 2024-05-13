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
 
 
 // Function to display games
  fetch("./webgame/games.json")
  .then(response => response.json())
  .then(data => {
    games = data;
    displayGames();
  });

  function displayGames() {
    var gameList = document.getElementById("game-list");
  
    games.forEach(function(game) {
      var gameDiv = document.createElement("div");
      gameDiv.classList.add("game");
  
      var thumbnail = document.createElement("div");
      thumbnail.classList.add("game-thumbnail");
      var img = document.createElement("img");
      img.src = "./webgame/asset/" + game.thumbnail; // Assuming 'thumbnail' is a key in your JSON data
      img.alt = game.title;
      thumbnail.appendChild(img);
  
      var details = document.createElement("div");
      details.classList.add("game-details");
  
      var title = document.createElement("h3");
      title.textContent = game.title;
      title.classList.add("game-title");
  
      var playBtn = document.createElement("button");
      playBtn.textContent = "Play";
      playBtn.classList.add("play-btn");
      playBtn.onmouseover = function(){
        playSound();
      }
      playBtn.onclick = function() {
        openModal(game);
        playSoundClick();
      };
  
      details.appendChild(title);
      details.appendChild(playBtn);
  
      gameDiv.appendChild(thumbnail);
      gameDiv.appendChild(details);
      gameList.appendChild(gameDiv);
    });
  }

  // Function to open modal with game details
  function openModal(game) {
    document.getElementById("modal-title").textContent = game.title;
    document.getElementById("modal-description").textContent = game.description;
    document.getElementById("game-frame").src = "./webgame/games/" + game.url + "/index.html";
    document.getElementById("game-frame").style.background = "0";
    document.getElementById("myModal").style.display = "flex";
  }

  // Function to close modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("game-frame").src = "";
    playSoundClick();
  }

  function hoverModalExit() {
    playSound();
  }
