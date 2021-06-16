self.addEventListener('install', function (evt) {
    console.log('The service worker is being installed.');
});

self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');

    evt.respondWith(fromNetwork(evt.request, 5000).catch(function () {
      return fromCache(evt.request);
    }));    
});

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {

        var timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open("EXAMPLE-WORKER").then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}