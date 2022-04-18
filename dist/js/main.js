//Remove animations on load
window.onload = function () {
    document.querySelector("body").classList.remove("perf-no-animation");
};

//Check webp support
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support === true) {
        document.querySelector("body").classList.add("webp");
    } else {
        document.querySelector("body").classList.add("no-webp");
    }
});

//100vh hack
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
window.addEventListener("resize", function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
});

//Mobile menu init
function mobileMenu() {
    var toggle = document.querySelector(".header-burger .burger");
    var menu = document.querySelector(".mobileMenu");
    var body = document.querySelector("body");

    this.onOpen = function () {
        toggle.classList.add("open");
        menu.classList.add("opened");
        body.classList.add("mobile");
        return true;
    };

    this.onClose = function () {
        toggle.classList.remove("open");
        menu.classList.remove("opened");
        body.classList.remove("mobile");
    };
}

var mobile = new mobileMenu();

var navLinks = document.querySelectorAll(".mobileMenu-nav__ul li a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        mobile.onClose();
    });
}

//Browser-level image lazy-loading
if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img[loading=\"lazy\"]");
    for (var i = 0; i < images.length; i++) {
        images[i].src = images[i].dataset.src;
    }
}
else {
    const script = document.createElement("script");
    script.src = "/js/lazysizes.min.js";
    document.body.appendChild(script);
}

//Load scripts after page load
window.addEventListener("load", function () {

    var aos = document.createElement("script");
    aos.src = "/js/aos.min.js";
    aos.onload = function (){
        AOS.init({
            offset: 130,
            easing: 'ease',
            once: true,
        });
        window.addEventListener('scroll', function (){
            AOS.refresh();
        })
    };
    document.body.appendChild(aos);

    var splide = document.createElement("script");
    splide.src = "/js/splide.min.js";
    splide.onload = initSliders;
    document.body.appendChild(splide);

    if(document.querySelector('select')){
        var select = document.createElement("script");
        select.src = "/js/select.min.js";
        select.onload = function () {
            const selectCustom = new customSelect({
                selector: "select"
            });
            selectCustom.init();
        };
        document.body.appendChild(select);
    }

    if(document.querySelector('[data-fslightbox]')){
        var fs = document.createElement('script');
        fs.src = "/js/fslightbox.min.js";
        fs.onload = function (){
            refreshFsLightbox();
        }
        document.body.appendChild(fs);
    }

});

function initSliders(){

    var methods = new Splide( '.homeMethods-slider', {
        arrows: false,
        pagination: false,
        perPage: 3,
        gap: 140,
        breakpoints: {
            1366: {
                gap: 24,
            },
            991: {
                gap: 24,
                perPage: 2,
            },
            600: {
                gap: 24,
                focus: "center",
                drag   : "free",
                perPage: 1.5,
            },
            480: {
                gap: 24,
                focus: "center",
                drag   : "free",
                perPage: 1.25,
            }
        }
    });
    methods.mount();

    var resume = new Splide( '.homeResume-slider', {
        arrows: false,
        pagination: false,
        perPage: 3,
        gap: 140,
        breakpoints: {
            1366: {
                gap: 24,
            },
            991: {
                gap: 24,
                perPage: 2,
            },
            600: {
                gap: 24,
                focus: "center",
                drag   : "free",
                perPage: 1.5,
            },
            480: {
                gap: 24,
                focus: "center",
                drag   : "free",
                perPage: 1.25,
            }
        }
    });
    resume.mount();

    var gallery = new Splide( '.homeGallery-slider', {
        arrows: false,
        pagination: false,
        perPage: 4,
        gap: 24,
        focus: "center",
        breakpoints: {
            1152: {
                perPage: 3,
            },
            700: {
                perPage: 2,
            },
            600: {
                drag   : "free",
                perPage: 1.5,
            },
            480: {
                drag   : "free",
                perPage: 1.25,
            }
        }
    });
    gallery.mount();

    var reviews = new Splide( '.homeReviews-slider', {
        arrows: false,
        pagination: false,
        perPage: 3,
        gap: 24,
        breakpoints: {
            991: {
                perPage: 2,
            },
            600: {
                focus: "center",
                drag   : "free",
                perPage: 1.5,
            },
            480: {
                focus: "center",
                drag   : "free",
                perPage: 1.25,
            }
        }
    });
    reviews.mount();
}

function initMaska(){
    var maska = document.createElement('script');
    maska.src = "/js/maska.min.js";
    maska.onload = function (){
        Maska.create('input[type="tel"]', {
            mask: '+7 (###) ###-##-##'
        });
        window.removeEventListener("click", initMaska);
    }
    document.body.appendChild(maska);
}

function initMap(){
    var mapDiv = document.querySelector('#map');
    var map = document.createElement('script');
    map.src = "//api-maps.yandex.ru/2.1/?apikey=9668e796-b908-4f5d-87f4-9a0ea4dbdfdc&lang=ru_RU";
    map.onload = function (){
        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [mapDiv.getAttribute('data-x'),mapDiv.getAttribute('data-y')],
                zoom: 17,
                controls: [],
            });

            var myPlacemark = new ymaps.Placemark([mapDiv.getAttribute('data-x'),mapDiv.getAttribute('data-y')], {}, {
                iconLayout: 'default#image',
                iconImageHref: '/img/common/marker.svg',
                iconImageSize: [60, 92],
            });

            myMap.geoObjects.add(myPlacemark);
        }
    }
    document.body.appendChild(map);
    window.removeEventListener('scroll', initMap);
}

window.addEventListener('scroll', initMap);
window.addEventListener('click', initMaska);

//open popup
var popupLink = document.querySelectorAll("a[data-popup]");
popupLink.forEach(function (element){
    element.addEventListener("click", function (e){
    });
});

//close popups
var popupClose = document.querySelectorAll(".popup__wrp");
popupClose.forEach(function (element){
    element.addEventListener("click", function (e){
        if(e.target !== e.currentTarget)
        {
            console.log("clicked on popup");
        }
        else{
            console.log("clicked on popup wrapper");
            window.location.href="#close";
        }
    });
});

var showMore = document.querySelectorAll('.showMore-btn');
showMore.forEach(function (elem){
    elem.addEventListener('click', function (){
        var parent = elem.parentNode;
        var hidden = parent.querySelectorAll('.hidden');
        hidden.forEach(function (el){
            el.classList.toggle('visible-now');
        })
        elem.style.display = "none";
    })
})
