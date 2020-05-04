const CACHE = 'school-CI-cache';

const urlsToCache = [
  '/',
  '/favicon.ico',
  '/images/calendar_icon.svg',
  '/images/clear-icon.svg',
  '/images/clock_icon.svg',
  '/images/code-commit_icon.svg',
  '/images/done_icon.svg',
  '/images/fail_icon.svg',
  '/images/logo.svg',
  '/images/play_icon.svg',
  '/images/rebuild_icon.svg',
  '/images/settings_icon.svg',
  '/images/stopwatch_icon.svg',
  '/images/user_icon.svg',
  '/static/js/0.chunk.js',
  '/static/js/1.chunk.js',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  'http://yastatic.net/islands/_/PyVcRbwHetz0gOVWLonWH7Od8zM.woff2',
  'http://yastatic.net/islands/_/bIx8jOfCEfR-mECoDUEZywDBuHA.woff',
  'http://yastatic.net/islands/_/7_GKBdKFbUPzKlghJRv55xgz0FQ.woff2',
  'http://yastatic.net/islands/_/SmqPmIMEXrW4lOY8QrhTUVDbrro.woff',
  'http://yastatic.net/islands/_/6Roy0LCd05cK4nNCipgzheYcNVU.woff2',
  'http://yastatic.net/islands/_/KtHQR1erf3spayoIM4M4ngg0e2E.woff',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  if (
    event.request.method !== 'GET' ||
    event.request.url.indexOf('/api') !== -1 ||
    event.request.url.indexOf('chrome-extension') !== -1
  ) {
      return;
  }

  event.respondWith(useCacheOrNetwork(event.request));
})


async function useCacheOrNetwork(request) {
  try {
    const cache = await caches.open(CACHE);
    const response = await cache.match(request, { ignoreSearch: true });
  
    if (response) {
      console.log('Cache was used to serve url:\n', request.url)
      return response;
    }
  
    const fetchResponse = await fetch(request.clone());
  
    if (!fetchResponse || fetchResponse.status !== 200) {
      return fetchResponse;
    }
  
    await cache.put(request, fetchResponse.clone());
  
    console.log('Fetch was used to serve url:\n', request.url)
    return fetchResponse;
  } catch(error) {
    console.warn(error.message);
  }

}
