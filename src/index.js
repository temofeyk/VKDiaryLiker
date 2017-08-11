require('../src/css/normalize.css');
require('./css/items.css');

let photosList = document.querySelector('#photos');
let itemRenderFn = require('./item.hbs');

function login() {
    const PHOTOS_ACCSESS_PERMISSION = 4;  // https://vk.com/dev/permissions

    return new Promise(function (resolve, reject) {
        VK.init({
            apiId: 5900739
        });

        VK.Auth.login((r) => {
            if (r.session) {
                resolve();
            } else {
                reject()
            }
        }, PHOTOS_ACCSESS_PERMISSION);
    });
}

function callAPI(method, params) {
    params.v = 5.67;

    return new Promise((resolve, reject) => {
        VK.api(method, params, function (result) {
            if (result.error) {
                reject();
            } else {
                resolve(result.response);
            }
        });
    });
}

function getAlbums() {

    return callAPI('photos.getAlbums', {need_system: 1});

}

function getPhotos(albums) {

    let p = [];

    albums.forEach(item => {
        p.push(callAPI('photos.get', {album_id: item.id, extended: 1}));
    });

    return Promise.all(p);
}

function render(photos) {
    let html = '';

    photos.forEach(data => {
        let items = data.items;

        items.forEach(item => {
            let values = {
                src: item.photo_75,
                likes: item.likes.count,
                reposts: item.reposts.count,
                comments: item.comments.count
            };

            html += itemRenderFn(values);
        });
    });
    photosList.innerHTML = html;
}

login()
    .then(() => getAlbums())
    .then(albums => getPhotos(albums.items))
    .then(photos => render(photos))
    .catch(() => alert('не удалось получить данные из VK'));