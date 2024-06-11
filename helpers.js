//gönderilen verileri lokale kaydeder
export const setStorage = (data) => {
    //gelen veriyi stringe cevirme
    const strData = JSON.stringify(data);

    //lokale kaydetme
    localStorage.setItem('NOTES', strData);
};

//value'lara karsilik gelen icerikler icin
export const translate = {
    goto : 'Verreisen',
    home : 'Heim',
    job : 'Arbeit',
    park : 'Parken',
};


//lokalden eleman alir ve geriye döndürür
export const getStorage = (key) => {
    //lokalden string veriyi alma
    const strData = localStorage.getItem(key);

    //veriyi js objesine cevirme
    return JSON.parse(strData);
};

export var userIcon = L.icon({
    iconUrl: '/images/Person.png',
    iconSize: [50, 50],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
});

 var homeIcon = L.icon({
    iconUrl: '/images/Home_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],

});
 var jobIcon = L.icon({
    iconUrl: '/images/Briefcase_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
    

});
 var gotoIcon = L.icon({
    iconUrl: '/images/Aeroplane_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],

});
 var parkIcon = L.icon({
    iconUrl: '/images/Parking_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -20],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],

});

//value'lara karilik gelen icerikler icin
export const icons = {
    goto : gotoIcon,
    home : homeIcon,
    job : jobIcon,
    park : parkIcon,
};

//const deger = 'job';

//console.log(translate[deger]);

