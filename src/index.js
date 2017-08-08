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
        VK.Auth.getLoginStatus(result => {
            if (result.status !== 'connected') {
                VK.Auth.login((r) => {
                    if (r.session) {
                        resolve();
                    } else {
                        reject()
                    }
                }, PHOTOS_ACCSESS_PERMISSION);
            } else {
                resolve();
            }
        });
    });
}


function callAPI(method, params) {
    return new Promise(function (resolve, reject) {
        VK.api(method, params, function (result) {
            if (result.error) {
                reject();
            } else {
                resolve(result.response);
            }
        });
    });
}

function render(data) {
    let items = data.items;
    let html = '';

    items.forEach(item => {
        let values = {
            src: item.photo_130,
            likes: item.likes.count,
            reposts: item.reposts.count,
            comments: item.comments.count
        };

        html += itemRenderFn(values);
    });
    photosList.innerHTML = html;
}

login()
    .then(() => callAPI('photos.get', {v: 5.67, album_id: 'profile', extended: 1}))
    .then(result => render(result))
    .catch(() => alert('не удалось получить данные из VK'));