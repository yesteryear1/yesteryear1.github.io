// Function to fetch JSON data from external file
function fetchJSON() {
    fetch('./news/news.json')
    .then(response => response.json())
    .then(data => renderNews(data))
    .catch(error => console.error('Error fetching JSON:', error));
}

// Function to render news items
function renderNews(jsonData) {
    var container = document.getElementById('news-container');
    jsonData.forEach(function(newsItem) {
        var item = document.createElement('div');
        item.classList.add('news-item');
        var mediaElement = newsItem.media.endsWith('.mp4') ? `
        <video controls>
            <source src="${"./news/assets/" + newsItem.media}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        ` : `
            <img src="${"./news/assets/" +newsItem.media}">
        `;
        if (newsItem.mediaLink != "") {
            mediaElement = `
            <a href="${newsItem.mediaLink}" id="mediahref" target="_blank">
            ` + mediaElement + `
            </a>`;
        }
        if (newsItem.media == "") {
            mediaElement = "";
        }
        item.innerHTML = `
            <div>
                <h2>${newsItem.title}</h2>
                <p>Date: ${newsItem.date}</p>
                <div>${newsItem.content}</div>
            </div>
            ${mediaElement}
        `;
        container.appendChild(item);
    });
}

// Call the fetchJSON function to load JSON data and render news items
fetchJSON();
