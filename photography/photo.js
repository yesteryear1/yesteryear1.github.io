document.addEventListener("DOMContentLoaded", function () {
    const imageGrid = document.getElementById("image-grid");

    // Fetch data from JSON file
    fetch("./photography/photography.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const imageItem = document.createElement("div");
                imageItem.classList.add("image-item");
                const image = document.createElement("img");
                image.src = "./photography/photos/" + item.url;
                image.alt = item.description;
                image.style.minHeight = "100%";
                image.style.minWidth = "100%";
                image.style.flexShrink = "1";
                image.style.cursor = "pointer";
                image.addEventListener("click", function () {
                    playSoundClick();
                    showPopUp("./photography/photos/" + item.url, item.description);
                });
                image.addEventListener("mouseover", function () {
                    image.style.filter = "brightness(0.8)";
                    playSound();
                });
                image.addEventListener("mouseleave", function () {
                    image.style.filter = "brightness(1)";
                });
                imageItem.appendChild(image);
                imageGrid.appendChild(imageItem);
            });
        })
        .catch(error => console.error("Error fetching data:", error));



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


    // Show pop-up with clicked image
    function showPopUp(url, description) {
        const popUp = document.createElement("div");
        popUp.classList.add("popup");

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("close-btn");
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("mouseover", function () {
            playSound();
        });
        closeBtn.addEventListener("click", function () {
            document.body.removeChild(popUp);
            playSoundClick();
        });

        const content = document.createElement("div");
        content.classList.add("popup-content");


        const image = document.createElement("img");
        image.src = url;
        image.alt = description;

        const desc = document.createElement("div");
        desc.classList.add("description");
        desc.textContent = description;
        content.appendChild(closeBtn);
        content.appendChild(image);
        content.appendChild(desc);
        popUp.appendChild(content);

        document.body.appendChild(popUp);

        // Close pop-up when clicking outside of it
        popUp.addEventListener("click", function (event) {
            if (!event.target.closest(".popup-content")) {
                document.body.removeChild(popUp);
                playSoundClick();
            }
        });

        // Close pop-up when pressing the Escape key
        window.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                document.body.removeChild(popUp);
                playSoundClick();
            }
        });
    }
});
