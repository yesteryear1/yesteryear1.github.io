document.addEventListener('DOMContentLoaded', () => {
    let currentAudio = null;
    const nowPlayingElement = document.getElementById('now-playing');

    fetch('./samples/samples.json')
        .then(response => response.json())
        .then(data => {
            const samplesContainer = document.getElementById('samples-container');
            data.samples.forEach(sample => {
                const sampleBox = document.createElement('div');
                sampleBox.classList.add('sample-box');

                const sampleIcon = document.createElement('img');
                sampleIcon.classList.add('sample-icon');
                sampleIcon.src = './samples/picture/' + sample.icon;
                sampleBox.appendChild(sampleIcon);

                const sampleInfo = document.createElement('div');
                sampleInfo.classList.add('sample-info');
                sampleInfo.innerHTML = `<p><strong>Track:</strong> ${sample.name}</p>
                                        <p><strong>Album:</strong> ${sample.album}</p>`;
                sampleBox.appendChild(sampleInfo);

                const audioPlayer = document.createElement('audio');
                audioPlayer.classList.add('custom-audio-player');
                audioPlayer.controls = false;
                const source = document.createElement('source');
                source.src = './samples/audio/' + sample.audio;
                audioPlayer.appendChild(source);
                sampleBox.appendChild(audioPlayer);

                const playBtn = document.createElement('button');
                playBtn.classList.add('play-pause-btn');
                playBtn.textContent = '⏵'; // Unicode play icon
                sampleBox.appendChild(playBtn);
                
                playBtn.addEventListener("mouseover",() => {
                    playSound();
                });

                playBtn.addEventListener('click', () => {
                    playSoundClick();
                    if (audioPlayer.paused) {
                        // Pause any other playing audio
                        if (currentAudio && currentAudio !== audioPlayer) {
                            currentAudio.pause();
                            currentAudio.currentTime = 0;
                            const currentPlayBtn = currentAudio.parentElement.querySelector('.play-pause-btn');
                            if (currentPlayBtn) {
                                currentPlayBtn.textContent = '⏵';
                            }
                        }
                        currentAudio = audioPlayer;

                        audioPlayer.play();
                        playBtn.textContent = '⏸'; // Unicode pause icon
                        nowPlayingElement.textContent = `Now Playing: ${sample.name}`;
                        nowPlayingElement.style.display = 'block';

                        // Reset play button text when audio finishes
                        audioPlayer.addEventListener('ended', () => {
                            playBtn.textContent = '⏵'; // Unicode play icon
                            nowPlayingElement.style.display = 'none';
                        });
                    } else {
                        audioPlayer.pause();
                        audioPlayer.currentTime = 0;
                        playBtn.textContent = '⏵'; // Unicode play icon
                        nowPlayingElement.style.display = 'none';
                    }
                });

                samplesContainer.appendChild(sampleBox);
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
        })
        .catch(error => console.error('Error fetching samples:', error));
});
