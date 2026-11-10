// Lab 7: XMLHttpRequest, Fetch with Promises, Fetch with Async/Await
const apiKeyInput = document.getElementById('apiKey');
const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');
const statusText = document.getElementById('status');
const xhrButton = document.getElementById('xhrButton');
const promisesButton = document.getElementById('promisesButton');
const asyncButton = document.getElementById('asyncButton');
const buttons = [xhrButton, promisesButton, asyncButton];
let latestRequest = 0;

function searchSettings() {
  const key = apiKeyInput.value.trim();
  const query = searchInput.value.trim();
  if (!key) throw new Error('Please enter your Unsplash Access Key first.');
  if (!query) throw new Error('Please enter a search word.');
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=8&content_filter=high`;
  return { url, key };
}

function setBusy(busy) {
  buttons.forEach(button => button.disabled = busy);
}
function showStatus(message, error = false) {
  statusText.textContent = message;
  statusText.classList.toggle('error', error);
}
function startSearch() {
  const requestId = ++latestRequest;
  gallery.replaceChildren();
  showStatus('Searching photos...');
  setBusy(true);
  return requestId;
}
function finishSearch(requestId, payload) {
  if (requestId !== latestRequest) return;
  renderPhotos(payload.results || []);
  showStatus(payload.results && payload.results.length
    ? `Found ${payload.total ?? payload.results.length} results. Showing ${payload.results.length} photos.`
    : 'No photos found. Try another search word.');
  setBusy(false);
}
function failSearch(requestId, error) {
  if (requestId !== latestRequest) return;
  gallery.replaceChildren();
  showStatus(error.message || 'Unable to load photos.', true);
  setBusy(false);
}
function checkResponse(response) {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) throw new Error('Access denied. Check your Unsplash Access Key and API permissions.');
    if (response.status === 429) throw new Error('Too many requests. Try again later.');
    throw new Error(`Unsplash request failed (HTTP ${response.status}).`);
  }
  return response.json();
}

// Dynamically build HTML elements using DOM API
function renderPhotos(photos) {
  gallery.replaceChildren();
  photos.forEach(photo => {
    if (!photo.urls || !photo.urls.small) return;
    const card = document.createElement('figure');
    card.className = 'photo-card';
    const image = document.createElement('img');
    image.src = photo.urls.small; // Unsplash requires using their image URL
    image.alt = photo.alt_description || photo.description || 'Unsplash photo';
    image.loading = 'lazy';
    const caption = document.createElement('figcaption');
    caption.append('Photo by ');
    const photographer = document.createElement('a');
    photographer.textContent = photo.user?.name || 'Unknown photographer';
    const profile = photo.user?.links?.html || 'https://unsplash.com/';
    const separator = profile.includes('?') ? '&' : '?';
    photographer.href = `${profile}${separator}utm_source=lab7_ajax_demo&utm_medium=referral`;
    photographer.target = '_blank';
    photographer.rel = 'noopener noreferrer';
    caption.appendChild(photographer);
    caption.append(' on ');
    const source = document.createElement('a');
    source.textContent = 'Unsplash';
    source.href = 'https://unsplash.com/?utm_source=lab7_ajax_demo&utm_medium=referral';
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    caption.appendChild(source);
    card.append(image, caption);
    gallery.appendChild(card);
  });
}

// 1. Search using XMLHttpRequest (XHR)
function searchUsingXHR() {
  let settings;
  try { settings = searchSettings(); } catch (err) { showStatus(err.message, true); return; }
  const requestId = startSearch();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', settings.url, true);
  xhr.setRequestHeader('Authorization', `Client-ID ${settings.key}`);
  xhr.setRequestHeader('Accept-Version', 'v1');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      try { finishSearch(requestId, JSON.parse(xhr.responseText)); }
      catch { failSearch(requestId, new Error('The server returned invalid JSON.')); }
    } else {
      failSearch(requestId, new Error(xhr.status === 401 || xhr.status === 403
        ? 'Access denied. Check your Unsplash Access Key.'
        : `Unsplash request failed (HTTP ${xhr.status}).`));
    }
  };
  xhr.onerror = function () { failSearch(requestId, new Error('Network error. Check your connection.')); };
  xhr.send();
}

// 2. Search using Fetch with Promises (.then / .catch)
function searchUsingPromises() {
  let settings;
  try { settings = searchSettings(); } catch (err) { showStatus(err.message, true); return; }
  const requestId = startSearch();
  fetch(settings.url, { headers: { Authorization: `Client-ID ${settings.key}`, 'Accept-Version': 'v1' } })
    .then(checkResponse)
    .then(data => finishSearch(requestId, data))
    .catch(error => failSearch(requestId, error));
}

// 3. Search using Fetch with Async/Await
async function searchUsingAsyncAwait() {
  let settings;
  try { settings = searchSettings(); } catch (err) { showStatus(err.message, true); return; }
  const requestId = startSearch();
  try {
    const response = await fetch(settings.url, {
      headers: { Authorization: `Client-ID ${settings.key}`, 'Accept-Version': 'v1' }
    });
    const data = await checkResponse(response);
    finishSearch(requestId, data);
  } catch (error) {
    failSearch(requestId, error);
  }
}

// Mouse events: clicks on buttons
xhrButton.addEventListener('click', searchUsingXHR);
promisesButton.addEventListener('click', searchUsingPromises);
asyncButton.addEventListener('click', searchUsingAsyncAwait);

// Keyboard event: Enter searches using Async/Await
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') searchUsingAsyncAwait();
});
