const FILES_TO_CACHE = [
  'css/style.css',
  'index.html',
  'app/app.js',
  // Images
  'images/0.png',
  'images/1.png',
  'images/2.png',
  'images/3.png',
  'images/4.png',
  'images/5.png',
  'images/6.png',
  'images/7.png',
  'images/8.png',
  'images/9.png',
  'images/10.png',
  'images/11.png',
  'images/12.png',
  'images/13.png',
  'images/14.png',
  'images/dj_alt.jpg',
  'images/dj.jpg',
  'images/scrobbling.gif',
  'images/4chon.ico'
]

const CACHE_NAME = 'shinobu-cache-v5'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})

// Remove cache entries that aren't expected
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key)
        })
      )
    )
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      return fetch(event.request)
    })
  )
})
