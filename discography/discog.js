fetch('./discography/discography.json')
    .then(response => response.json())
    .then(data => {
        const albumCoversContainer = document.querySelector('#album-covers');
        const albumDetailsBody = document.querySelector('#album-details-body');
        const predefinedTypes = ['lp', 'ep', 'single','mixtape'];
        const albumsByType = {};
        data.forEach(album => {
            if (!albumsByType[album.type]) {
                albumsByType[album.type] = [];
            }
            albumsByType[album.type].push(album);
        });

        const sortedTypes = Object.keys(albumsByType).sort((a, b) => {
            // Check if a and b are in predefined types
            const indexA = predefinedTypes.indexOf(a);
            const indexB = predefinedTypes.indexOf(b);

            if (indexA === -1 && indexB === -1) {
                // If both are not in predefined types, sort alphabetically
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            } else if (indexA === -1) {
                // If only a is not in predefined types, put b first
                return 1;
            } else if (indexB === -1) {
                // If only b is not in predefined types, put a first
                return -1;
            } else {
                // If both are in predefined types, sort based on their order in predefinedTypes
                return indexA - indexB;
            }
        });

        // Iterate over each group of albums
        sortedTypes.forEach(type => {
            const typeDiv = document.createElement('div');
            typeDiv.classList.add('album-type');

            // Add type text at the top
            const typeText = document.createElement('p');
            typeText.textContent = type;
            typeDiv.appendChild(typeText);

            // Create and append album covers inside each group div
            albumsByType[type].forEach(album => {
                const coverImg = document.createElement('img');
                coverImg.src = "./discography/" + album.cover;
                coverImg.width = 75;
                coverImg.title = album.title;
                coverImg.addEventListener('mouseover', () => {
                    playSound();
                    coverImg.style.filter = "brightness(0.8)";
                });
                coverImg.addEventListener('mouseleave', () => {
                    coverImg.style.filter = "brightness(1)";
                });
                coverImg.addEventListener('click', () => {
                    renderAlbumDetails(album);
                    playSoundClick();
                });
                typeDiv.appendChild(coverImg);
            });

            albumCoversContainer.appendChild(typeDiv);
        });

        function renderAlbumDetails(album) {
            albumDetailsBody.innerHTML = '';

            if (!album) {
                const row = document.createElement('tr');
                const messageCell = document.createElement('td');
                messageCell.colSpan = 2;
                messageCell.textContent = 'The products listed here may not be released. Early albums will not be released upon inquiry.';
                messageCell.style.textAlign = 'center'; // Center the text
                messageCell.style.border = '0px solid'; // Set border color to black
                row.appendChild(messageCell);
                albumDetailsBody.appendChild(row);
                return;
            }

            const details = [
                { name: '', content: `<img src="./discography/${album.cover}" alt="${album.title}" style="max-width: 200px;">` },
                { name: 'title', content: album.title },
                { name: 'listen', content: renderListenLinks(album.listen)}, // Display "unreleased" if listen property is blank
                { name: 'tracks', content: album.tracks.map((track, index) => `${index + 1}. ${track}`).join('<br>') }, // Numbering the tracks
                { name: 'notes', content: album.notes ? album.notes : '' } // Display notes if available, otherwise display a dash
            ];

            details.forEach(detail => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = detail.name;
                row.appendChild(nameCell);
                const contentCell = document.createElement('td');
                contentCell.innerHTML = detail.content;
                row.appendChild(contentCell);
                if (detail.name === 'notes' && !album.notes) {
                    row.style.display = 'none';
                }
                albumDetailsBody.appendChild(row);
            });
        }

        function renderListenLinks(listen) {
            if (!listen || listen.length === 0) {
                return 'unreleased';
            }
        
            let links = '';
            listen.forEach(link => {
                links += `<span style="display: inline-block;"><a href="${link.url}" target="_blank">${link.label}</a></span>&nbsp;`;
            });
            return links;
        }

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

        renderAlbumDetails(null);
    })
    .catch(error => console.error('Error fetching data:', error));
