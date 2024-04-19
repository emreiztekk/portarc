const loadPlaces = function (coords) {
    const method = 'apis';

    const PLACES = [
        {
            name: "İzq",
            imageURL: "./map-marker.png",
            URL: "https://www.google.com/search?q=izq",
            location: {
                lat: 38.42651897376231,
                lng: 27.132658844068313,
            }
        },
        {
            name: "Uçkıuyular",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=uckuyular",
            location: {
                lat: 38.405675209865336,
                lng: 27.06935935250486,
            }
        },
        {
            name: "Göztepe",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=goztepe",
            location: {
                lat: 38.399571991405416,
                lng: 27.083436202065336,
            }
        },
        {
            name: "Karantina",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=karantina",
            location: {
                lat: 38.40826637555396,
                lng: 27.106606027145318,
            }
        },
        {
            name: "Konak",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=konak",
            location: {
                lat: 38.418826366849444,
                lng: 27.125208834874005,
            }
        },
        {
            name: "Pasaport",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=pasaport",
            location: {
                lat: 38.42892199253736,
                lng: 27.13228407441726,
            }
        },
        {
            name: "Alsancak",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=alsancak",
            location: {
                lat: 38.43897576759363,
                lng: 27.140762959439844,
            }
        },
        {
            name: "Karşıyaka",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=karsiyaka",
            location: {
                lat: 38.454830076318316,
                lng: 27.12052045655903,
            }
        },
        {
            name: "Bostanlı",
            imageURL: "https://images.adsttc.com/media/images/642e/bdcb/400a/e301/7ce2/a832/newsletter/izq-innovation-center-ofisvesaire_1.jpg?1680784917",
            URL: "https://www.google.com/search?q=bostanlı",
            location: {
                lat: 38.45202997017321,
                lng: 27.09778594157115,
            }
        },
    ];
    return Promise.resolve(PLACES);
};
window.onload = () => {
    const scene = document.querySelector('a-scene');
    return navigator.geolocation.getCurrentPosition(function (position) {
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    const _URL = place.URL;

                    const icon = document.createElement('a-image');
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('name', place.name);
                    // icon.setAttribute('src', place.imageURL);
                    icon.setAttribute('src', 'map-marker.png');

                    icon.setAttribute('scale', '20, 20');

                    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

                    const clickListener = function (ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const name = ev.target.getAttribute('name');


                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            container.setAttribute('id', 'place-label');
                            
                            const anchor = document.createElement('a');
                            anchor.setAttribute('href', _URL);
                            anchor.setAttribute('target', '_blank'); // Opens the link in a new tab
                            anchor.innerText = name;
                        
                            label.appendChild(anchor);
                            container.appendChild(label);
                            document.body.appendChild(container);
                        
                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 1500);
                        }
                        // window.location.replace(_URL);
                    };
                    icon.addEventListener('click', clickListener);
                    scene.appendChild(icon);
                });
            })
    },
        (err) => console.error('Konum alma hatası', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};