const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=9';

const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites'

const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_q9tdhdfKEd05O3VQCgbzkzU2oq3N2tKPi0bEi6mopRW10GrbHrJcFzu1XGaGZCK9`

const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'

const spanError = document.getElementById('error');

async function loadRandomDogs() {
    const res = await fetch(API_URL_RANDOM, {
        method: 'GET',
        headers: {
            'x-api-key': 'live_q9tdhdfKEd05O3VQCgbzkzU2oq3N2tKPi0bEi6mopRW10GrbHrJcFzu1XGaGZCK9'
        }
    });
    const data = await res.json();

    console.log(data);


    if (res.status != 200) {
        spanError.innerHTML = "HUbo un error" + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');
        const img5 = document.getElementById('img5');
        const img6 = document.getElementById('img6');
        const img7 = document.getElementById('img7');
        const img8 = document.getElementById('img8');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
        const btn4 = document.getElementById('btn4');
        const btn5 = document.getElementById('btn5');
        const btn6 = document.getElementById('btn6');
        const btn7 = document.getElementById('btn7');
        const btn8 = document.getElementById('btn8');
        const img9 = document.getElementById('img9');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        img5.src = data[4].url;
        img6.src = data[5].url;
        img7.src = data[6].url;
        img8.src = data[7].url;
        img9.src = data[8].url;

        btn1.onclick = () => saveFavoriteDogs(data[0].id);
        btn2.onclick = () => saveFavoriteDogs(data[1].id);
        btn3.onclick = () => saveFavoriteDogs(data[2].id);
        btn4.onclick = () => saveFavoriteDogs(data[3].id);
        btn5.onclick = () => saveFavoriteDogs(data[4].id);
        btn6.onclick = () => saveFavoriteDogs(data[5].id);
        btn7.onclick = () => saveFavoriteDogs(data[6].id);
        btn8.onclick = () => saveFavoriteDogs(data[7].id);
    }



};

async function loadFavorites() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'live_q9tdhdfKEd05O3VQCgbzkzU2oq3N2tKPi0bEi6mopRW10GrbHrJcFzu1XGaGZCK9'
        }
    });
    const data = await res.json();

    if (res.status != 200) {
        spanError.innerHTML = "HUbo un error" + res.status + data.message;
    } else {
        const section = document.getElementById('favoritesDogs')

        section.innerHTML = "";
        data.forEach(dog => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btntext = document.createTextNode('Sacar al perro de favoritos');

            btn.appendChild(btntext);
            img.src = dog.image.url;
            img.style.width = "400px";
            img.style.height = "400px";
            btn.onclick = () => deleteFavoriteDogs(dog.id)
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
            btn.classList.add('main__btn_delete');
            article.classList.add('item_favorites');
            section.classList.add('favorites_container');

        });
    }

};

async function saveFavoriteDogs(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'live_q9tdhdfKEd05O3VQCgbzkzU2oq3N2tKPi0bEi6mopRW10GrbHrJcFzu1XGaGZCK9'
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await res.json();
    loadFavorites();

    if (res.status != 200) {
        spanError.innerHTML = "HUbo un error" + res.status + data.message;
    }

}
async function deleteFavoriteDogs(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.status != 200) {
        spanError.innerHTML = "HUbo un error" + res.status + data.message;
    } else {
        loadFavorites();
    }

}





async function uploadPetPhoto() {
    const form = document.getElementById('uploadForm')
    const formData = new FormData(form);

    console.log(formData.get('file'))


    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-api-key': 'live_q9tdhdfKEd05O3VQCgbzkzU2oq3N2tKPi0bEi6mopRW10GrbHrJcFzu1XGaGZCK9'
        },
        body: formData,
    });
    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    } else {
        console.log("Foto de michi cargada :)");
        const data = await res.json();
        console.log(data.url);
        saveFavoriteDogs(data.id) //para agregar el michi cargado a favoritos.
    }

}






loadRandomDogs();
loadFavorites();