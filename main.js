import {userIcon, 
    setStorage, 
    getStorage, 
    translate,
    icons,} from "./helpers.js"

//! html den gelenler
const form = document.querySelector('form');
const input = document.querySelector('form #title');
const cancelBtn = document.querySelector('form #cancel');
const noteList = document.querySelector('ul');
const expandBtn = document.querySelector('#checkbox');
const aside = document.querySelector('.wrapper');



//!ortak degiskenler
var map;
var coords = [];
var notes = getStorage('NOTES') || [];
var markerLayer = [];

//! olay izleyicileri
cancelBtn.addEventListener('click', () => {
    form.style.display = 'none';
    clearForm();
});

//Kullancinina Konumuna göre Haritayi ekrana basma
function loadMap(coords){
    //haritanin kurulumunu yapar
 map = L.map('map').setView(coords, 10);

 // haritanin nasil gozukecegini belirler
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//imlecleri tutacagimiz ayri bir katman olusturma
markerLayer = L.layerGroup().addTo(map);

//Kullanicinin bulundugu konumu gösterme
L.marker(coords, { icon: userIcon })
.addTo(map)
.bindPopup('Aktuelle Position');

//lokalden gelen notmlari ekrana bas
renderNoteList(notes);


// Haritadaki tiklnama olaylaeini izler
map.on('click', onMapClick);
};


//formun gönderilmesini izleme
form.addEventListener('submit' , (e) => {
    e.preventDefault();
//formun icindeki degerlere erisme
const title = e.target[0].value;
const date = e.target[1].value;
const status = e.target[2].value;
//notlar dizisine bu elemena ekle
notes.unshift({
    id: new Date().getTime(),
    title,
    date,
    status,
    coords,
});

// note lari listele
renderNoteList(notes);

//gönderilen elemanlari lokale kaydetme
setStorage(notes);

//formu kapat
form.style.display = 'none';
clearForm();
});

//imleci ekrana basar
function renderMarker(item){
    //imlec olustur
    L.marker(item.coords,{icon:icons[item.status]})
    //imleci katmana ekle
    .addTo(markerLayer)
    //popup ekle
    .bindPopup(item.title);

}

//note listesini ekrana basasrr 
function renderNoteList(items){
//eski elemanlari temizleme
noteList.innerHTML = '';
//eski imlecleri temizle
markerLayer.clearLayers();

// her bir elemean icn ekrana basma fonks. calistir
items.forEach((ele) => {
//li elemani olustur
const listEle = document.createElement('li');

//data-id ekleme
listEle.dataset.id = ele.id;

//icerigini belirleme
listEle.innerHTML = `
<div>
    <p>${ele.title} </p>
    <p><span>Datum:</span>${ele.date} </p>
    <p><span>Ziel:</span>${translate[ele.status]} </p>
</div>
<i id="fly" class="bi bi-airplane-fill"></i>
<i id="delete" class="bi bi-trash3-fill"></i>
`;

//html'deki listeye gönderme
noteList.appendChild(listEle);
//ekrana imlec bas
renderMarker(ele);
});
}

// Kullanici konumu isteme
navigator.geolocation.getCurrentPosition(
    //kullanici izin verirse haritayi
    //onun bulundugu konumda ac
    (e) => loadMap([e.coords.latitude, e.coords.longitude]),
    //izin vermezse vsrsayilan konumda ac
    ()=>  {
    loadMap([38.802424, 35.505317]);
});

//haritaya tiklaninca calisan fonksiyon
const onMapClick = (e) => {
//kordinatlari ortak alana aktar
coords = [e.latlng.lat, e.latlng.lng];
//formu göster
form.style.display = 'flex';
//inputa focuslama
input.focus();
};



//formu temizler
function clearForm(){
    form[0].value = '';
    form[1].value = '';
    form[2].value = 'goto';
};

//!Silme ve Ucus
noteList.addEventListener('click', (e) => {
    const found_id = e.target.closest('li').dataset.id;
  
    if (
      e.target.id === 'delete' &&
      confirm('Möchten Sie löschen ?')
    ) {
      // id'sini bildiğimi elemanı dizidem çıkarma
      notes = notes.filter((note) => note.id !== Number(found_id));
  
      // lokali güncelle
      setStorage(notes);
  
      // ekranı güncelle
      renderNoteList(notes);
    }
  
    if (e.target.id === 'fly'){
        //id sini bildiigimiz elemanin kordiantlarina erisme
        const note = notes.find((note) => note.id === Number(found_id));

        //animasyonu calistir
        map.flyTo(note.coords, 15);

        //elemanin koordiantlarinda gecici bir popeup tanimlama
        var popup = L.popup()
        .setLatLng(note.coords)
        .setContent(note.title);


        //kücük ekranlarda ucuruldugunda menüyü kapat
        if(window.innerWidth < 769){
            checkbox.checked = false;
            aside.classList.add('hide');
        }

        //popup i acma
        popup.openOn(map);
    }
});

//Gizle /Göster
checkbox.addEventListener('input', (e) => {
    const isChecked = e.target.checked;
  
    if (isChecked) {
      aside.classList.remove('hide');
    } else {
      aside.classList.add('hide');
    }
  });
