document.querySelectorAll('.menu a').forEach(a => {
    a.addEventListener('click', function (e) {
        e.preventDefault();

        let targetId = this.getAttribute('href').slice(1);
        let targetElement = document.getElementById(targetId);

        if (targetElement) {
            let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo(0, targetPosition);
        }
    });
});


let lastScrollY = window.scrollY;
let menu = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        menu.style.top = '-100%';
    } else {
        if (window.scrollY > 100) {
            menu.classList.add('fixed');
            menu.style.top = '0';
        } else {
            menu.classList.remove('fixed');
            menu.style.top = '0';
        }
    }
    lastScrollY = window.scrollY;
});

// ======================== scroll ===========================

let header_bg = document.querySelector("header")
let banner = document.querySelector(".banner")

function parallax(element) {
    let height = element.offsetHeight
    if (window.scrollY > element.offsetTop - height * 3) {
        // console.log(`-${window.scrollY / 5}px`)
        element.style.backgroundPositionY = `-${window.scrollY / 5}px`
    }
}

window.onscroll = () => {
    parallax(header_bg)
    parallax(banner)
}

// ===================== burger menu ==========================

let burger_button = document.querySelector(".burger-menu-button")
let burger_menu = document.querySelector(".menu")
let menuLinks = burger_menu.querySelectorAll('a')

burger_button.onclick = burgerMenu
function burgerMenu() {
    burger_button.classList.toggle("active")
    burger_menu.classList.toggle("active")
    document.body.classList.toggle("menu-active")
}

let loginPopup = document.querySelector(".login_popup")
let loginPopupCancel = document.querySelector(".cancel")
let getStartedButton = document.querySelector(".get_started")

document.addEventListener('click', function (e) {
    if (!burger_menu.contains(e.target) && !burger_button.contains(e.target)) {
        burger_menu.classList.remove('active')
        burger_button.classList.remove('active')
        document.body.classList.remove('menu-active')
    }
    if (!loginPopup.contains(e.target) && !getStartedButton.contains(e.target)) {
        loginPopup.classList.remove("active")
        document.body.classList.remove("popup-active")
    }
})

menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        burger_menu.classList.remove('active')
        burger_button.classList.remove('active')
        document.body.classList.remove('menu-active')
    })
})

// =================== scroll animation ====================

const animatedElements = document.querySelectorAll('.animate');

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollTop;
        const sectionBottom = sectionTop + element.offsetHeight;

        if (scrollTop + windowHeight > sectionTop && scrollTop < sectionBottom) {
            element.classList.remove('animate');
        }
    });
});



// ================== login popup scroll ===================

let isPopupActive = false;
let scrollPosition = 0;

loginPopupCancel.onclick = togglePopup;
getStartedButton.onclick = togglePopup;

function togglePopup() {
    if (!isPopupActive) {
        scrollPosition = window.scrollY;
        window.addEventListener("scroll", blockScroll);
    } else {
        window.removeEventListener("scroll", blockScroll);
        window.scrollTo(0, scrollPosition);
    }
    loginPopup.classList.toggle("active");
    isPopupActive = !isPopupActive;
}

function blockScroll(e) {
    e.preventDefault();
    window.scrollTo(0, scrollPosition);
}

// ================== login popup ===================

let logInName = document.querySelector(".log_in_name"),
    welcomeText = document.querySelector("h1"),
    logInPassword = document.querySelector(".logInPassword"),
    logInButton = document.querySelector(".log_in_button")

const users = [
    { name: "JohnDoe", password: "password123" },
    { name: "JaneSmith", password: "abc12345" },
    { name: "Alice", password: "securepass" }
];

logInButton.addEventListener("click", () => {
    const user = users.find(user => user.name === logInName.value && user.password === logInPassword.value);

    if (user) {
        localStorage.setItem("name", user.name);
        welcomeText.innerHTML = "Welcome to STARTUP, " + localStorage.getItem("name");
        togglePopup();
    } else {
        alert("Incorrect username or password!");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("name") != null) {
        welcomeText.innerHTML = "Welcome to STARTUP, " + localStorage.getItem("name");
    }
});


// ================== triple click ==================

let servicesSvg = document.querySelectorAll(".svg")
let servicesSvgTitle = document.querySelectorAll(".servicesSvgTitle")

let servicesCenterSvg = document.querySelector(".services_center")
let clickCount = 0
let clickTimer

function tripleClick() {
    servicesSvg.forEach(svg => {
        svg.style = "animation: fadeScale 0.4s infinite"
    })
    servicesSvgTitle.forEach(servicesTitle => {
        servicesTitle.innerHTML = "Туц туц туц!"
    })
}

servicesCenterSvg.addEventListener('click', function () {
    clickCount++

    if (clickCount === 1) {
        clickTimer = setTimeout(function () {
            clickCount = 0
        }, 400)
    }

    if (clickCount === 3) {
        tripleClick()
        clearTimeout(clickTimer)
        clickCount = 0
    }
})

// ==================================== slider about us ===================================

const peopleSlider = document.querySelector('.slider.about_us_slider'),
    btnBack = document.querySelector('.arrow.back'),
    btnForward = document.querySelector('.arrow.forward')
let currentPosition = 0,
    sliderBlock = document.querySelector(".about_us_slider>div"),
    sliderBlockAll = document.querySelectorAll(".about_us_slider>div"),
    sliderGap = parseInt(window.getComputedStyle(peopleSlider, null).getPropertyValue("gap").slice(0, 2)),
    slideWidth = sliderBlock.clientWidth + sliderGap,
    slidePosition = 0,
    sliderBlockCount = 0,
    peopleCurrentSlide = 0

sliderBlockAll.forEach(sliderBlock => {
    sliderBlockCount++
})

window.addEventListener("resize", () => {
    slidePosition = 0
    peopleSlider.style.transform = "translateX(" + slidePosition + "px)"
    slideWidth = sliderBlock.clientWidth + sliderGap
})


function moveLastToFirst() {
    const lastSlide = peopleSlider.lastElementChild;
    peopleSlider.insertBefore(lastSlide, peopleSlider.firstElementChild);
    slidePosition -= slideWidth;
    peopleSlider.style.transition = "none";
    peopleSlider.style.transform = "translateX(" + slidePosition + "px)";
    setTimeout(() => {
        peopleSlider.style.transition = "0.4s";
    }, 0);
}

function moveFirstToLast() {
    const firstSlide = peopleSlider.firstElementChild;
    peopleSlider.appendChild(firstSlide);
    slidePosition += slideWidth;
    peopleSlider.style.transition = "0s";
    peopleSlider.style.transform = "translateX(" + slidePosition + "px)";
    setTimeout(() => {
        peopleSlider.style.transition = "0.4s";
    }, 100);
}

btnForward.addEventListener("click", forwardPeopleSlide)

function forwardPeopleSlide() {
    btnForward.removeEventListener("click", forwardPeopleSlide)
    sliderTimeout = setTimeout(function () {
        btnForward.addEventListener("click", forwardPeopleSlide)
    }, 400)
    if (peopleCurrentSlide < 0) {
        peopleCurrentSlide = 4
    }
    lastSlide = peopleSlider.firstElementChild;
    peopleCurrentSlide++
    slidePosition -= slideWidth
    peopleSlider.style.transition = "0.4s"
    peopleSlider.style.transform = "translateX(" + slidePosition + "px)"
    if (peopleCurrentSlide + 4 == sliderBlockCount) {
        peopleCurrentSlide--;
        setTimeout(() => {
            moveFirstToLast();
        }, 400);
    }
}
let sliderTimeout = null

function backPeopleSlide() {
    btnBack.removeEventListener("click", backPeopleSlide)
    sliderTimeout = setTimeout(function () {
        btnBack.addEventListener("click", backPeopleSlide)
    }, 400)
    if (peopleCurrentSlide > 0) {
        peopleCurrentSlide = 0
    }
    if (peopleCurrentSlide <= 0) {
        peopleCurrentSlide--;
        moveLastToFirst();
        peopleSlider.style.transform = "translateX(" + slidePosition + "px)";
        slidePosition += slideWidth;
        peopleSlider.style.transition = "none";
        setTimeout(() => {
            peopleSlider.style.transform = "translateX(" + slidePosition + "px)";
        }, 0)
    } else {
        slidePosition += slideWidth;
        peopleSlider.style.transition = "0.4s";
        peopleSlider.style.transform = "translateX(" + slidePosition + "px)";
    }
    peopleCurrentSlide--;
}

let swipeStartX,
    swipeEndX


btnBack.addEventListener("click", backPeopleSlide)

// peopleSlider.addEventListener("touchstart", function (e) {
//     swipeStartX = e.touches[0].pageX
// })
// peopleSlider.addEventListener("touchmove", function (e) {
//     swipeEndX = e.touches[0].pageX
// })

// peopleSlider.addEventListener('touchend', function () {
//     const swipeDistance = swipeEndX - swipeStartX;
//     if (swipeDistance > 50) {
        
//         backPeopleSlide();
//     } else if (swipeDistance < -50) {
//         forwardPeopleSlide();
//     }
//     swipeStartX = 0;
//     swipeEndX = 0;
// });

// ======================================== filter =======================================

let filtersRadio = document.getElementsByName("filter");
let filtersBranding = document.querySelectorAll(".branding");
let filtersSmart = document.querySelectorAll(".smart");
let filtersRest = document.querySelectorAll(".rest");
let filtersPaper = document.querySelectorAll(".paper");

function filter() {
    filtersRadio.forEach(filterRadio => {
        if (filterRadio.id === "filter_all" && filterRadio.checked) {
            localStorage.setItem("filterCheck", "filterAll")
            filtersBranding.forEach(filterBranding => {
                filterBranding.style.display = "block";
            });

            filtersSmart.forEach(filterSmart => {
                filterSmart.style.display = "block";
            });

            filtersRest.forEach(filterRest => {
                filterRest.style.display = "block";
            });

            filtersPaper.forEach(filterPaper => {
                filterPaper.style.display = "block";
            });
        } else if (filterRadio.id === "filter_branding" && filterRadio.checked) {
            localStorage.setItem("filterCheck", "filterBranding")

            filtersSmart.forEach(filterSmart => {
                filterSmart.style.display = "none";
            });

            filtersRest.forEach(filterRest => {
                filterRest.style.display = "none";
            });

            filtersPaper.forEach(filterPaper => {
                filterPaper.style.display = "none";
            });

            filtersBranding.forEach(filterBranding => {
                filterBranding.style.display = "block";
            });

        } else if (filterRadio.id === "filter_smart" && filterRadio.checked) {
            localStorage.setItem("filterCheck", "filterSmart")
            filtersBranding.forEach(filterBranding => {
                filterBranding.style.display = "none";
            });

            filtersRest.forEach(filterRest => {
                filterRest.style.display = "none";
            });

            filtersPaper.forEach(filterPaper => {
                filterPaper.style.display = "none";
            });

            filtersSmart.forEach(filterSmart => {
                filterSmart.style.display = "block";
            });

        } else if (filterRadio.id === "filter_paper" && filterRadio.checked) {
            localStorage.setItem("filterCheck", "filterPaper")

            filtersBranding.forEach(filterBranding => {
                filterBranding.style.display = "none";
            });

            filtersSmart.forEach(filterSmart => {
                filterSmart.style.display = "none";
            });

            filtersRest.forEach(filterRest => {
                filterRest.style.display = "none";
            });

            filtersPaper.forEach(filterPaper => {
                filterPaper.style.display = "block";
            });

        } else if (filterRadio.id === "filter_rest" && filterRadio.checked) {
            localStorage.setItem("filterCheck", "filterRest")
            filtersBranding.forEach(filterBranding => {
                filterBranding.style.display = "none";
            });

            filtersSmart.forEach(filterSmart => {
                filterSmart.style.display = "none";
            });

            filtersPaper.forEach(filterPaper => {
                filterPaper.style.display = "none";
            });

            filtersRest.forEach(filterRest => {
                filterRest.style.display = "block";
            });
        }

    });
}

filtersRadio.forEach(filterRadio => {
    filterRadio.addEventListener("change", () => {
        filter();
    });
});

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("filterCheck") == "filterAll") {
        document.getElementById("filter_smart").checked = false
        document.getElementById("filter_branding").checked = false
        document.getElementById("filter_paper").checked = false
        document.getElementById("filter_rest").checked = false
        document.getElementById("filter_all").checked = true

    } else if (localStorage.getItem("filterCheck") == "filterBranding") {
        document.getElementById("filter_all").checked = false
        document.getElementById("filter_smart").checked = false
        document.getElementById("filter_paper").checked = false
        document.getElementById("filter_rest").checked = false
        document.getElementById("filter_branding").checked = true

    } else if (localStorage.getItem("filterCheck") == "filterSmart") {
        document.getElementById("filter_all").checked = false
        document.getElementById("filter_branding").checked = false
        document.getElementById("filter_paper").checked = false
        document.getElementById("filter_rest").checked = false
        document.getElementById("filter_smart").checked = true

    } else if (localStorage.getItem("filterCheck") == "filterPaper") {
        document.getElementById("filter_all").checked = false
        document.getElementById("filter_smart").checked = false
        document.getElementById("filter_branding").checked = false
        document.getElementById("filter_rest").checked = false
        document.getElementById("filter_paper").checked = true

    } else if (localStorage.getItem("filterCheck") == "filterRest") {
        document.getElementById("filter_paper").checked = false
        document.getElementById("filter_all").checked = false
        document.getElementById("filter_smart").checked = false
        document.getElementById("filter_branding").checked = false
        document.getElementById("filter_rest").checked = true

    }
    filter();
});

// =========================== card ============================

const cardButton = document.querySelector(".card-button"),
    cencelCard = document.querySelector(".basket_cancel"),
    basket = document.querySelector(".basket"),
    basketS = document.querySelector(".summary");

let basketAnimation = basket.querySelectorAll(".basketItem");

cencelCard.addEventListener("click", basketActive);
cardButton.addEventListener("click", basketActive);

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let buttonState = JSON.parse(localStorage.getItem('buttonState')) || {};

function basketActive() {
    burger_menu.classList.remove('active');
    burger_button.classList.remove('active');
    document.body.classList.remove('menu-active');
    basketS.classList.toggle("active");
    basket.classList.toggle("active");
}

function addToCart(name, price, img, button) {
    const product = { name, price: parseFloat(price), img };

    const productExists = cart.some(item => item.name === name);
    if (!productExists) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        // button.outerHTML = `<p class="in-cart" data-name="${name}" class="view">Already in cart</p>`;

        buttonState[name] = true;
        localStorage.setItem('buttonState', JSON.stringify(buttonState));
    }
    renderCart();
}

function removeFromCart(index) {
    const removedProduct = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();

    const inCartElement = document.querySelector(`p.in-cart[data-name="${removedProduct.name}"]`);
    if (inCartElement) {
        inCartElement.outerHTML = `<button onclick="addToCart('${removedProduct.name}', '${removedProduct.price}', '${removedProduct.img}', this)" class="view" data-name="${removedProduct.name}">Add to cart</button>`;

        buttonState[removedProduct.name] = false;
        localStorage.setItem('buttonState', JSON.stringify(buttonState));
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
        <div class="basketItem">
            <div class="basketItemDetails">
                <img src="img/gallery/${item.img}.jpg" alt="${item.name}">
                <div class="flex">
                    <span>${item.name} - ${item.price}$</span>
                    <button class="remove-button" data-index="${index}">Видалити</button>
                    <input type="hidden" value="${item.name}, ${item.price}" name="item[]">
                </div>
            </div>
        </div>`;
    });

    totalPriceElement.textContent = total;
    if (cart.length === 0) {
        document.querySelector(".send-cart").style.display = "none";
    } else {
        document.querySelector(".send-cart").style.display = "inline";

    }
}
if (cart.length === 0) {
    document.querySelector(".send-cart").style.display = "none";
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-button')) {
        const index = event.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

function restoreButtonState() {
    const buttonStates = JSON.parse(localStorage.getItem('buttonState')) || {};
    for (const name in buttonStates) {
        const inCart = buttonStates[name];
        if (!inCart) {
            const buttonElement = document.querySelector(`button[data-name="${name}"]`);
            if (buttonElement) {
                buttonElement.outerHTML = `<p class="in-cart" data-name="${name}">Already in cart</p>`;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    restoreButtonState();
});




// ========================= read more ==========================

let recentBlockIdeas = document.querySelector(".recent_ideas_button"),
    recentBlockInterface = document.querySelector(".recent_interface_button"),
    textIdeas = document.querySelector(".text_ideas"),
    fullTextIdeas = document.querySelector(".full_text_ideas"),
    fullTextInterface = document.querySelector(".full_text_interface"),
    textInterface = document.querySelector(".text_interface")

recentBlockIdeas.onclick = (e) => {
    e.preventDefault()
    textIdeas.classList.toggle("active")
    if (textIdeas.classList.contains("active")) {
        recentBlockIdeas.innerHTML = "Hide text"
        textIdeas.style.marginBottom = "unset"
    } else {
        recentBlockIdeas.innerHTML = "Read more"
        textIdeas.style.marginBottom = "36px"
    }
    fullTextIdeas.classList.toggle("active")
}

recentBlockInterface.onclick = (e) => {
    e.preventDefault()
    textInterface.classList.toggle("active")
    if (textInterface.classList.contains("active")) {
        recentBlockInterface.innerHTML = "Hide text"
        textInterface.style.marginBottom = "unset"
    } else {
        recentBlockInterface.innerHTML = "Read more"
        textInterface.style.marginBottom = "36px"
    }
    fullTextInterface.classList.toggle("active")
}

// ====================== quote slider ============================

document.addEventListener('DOMContentLoaded', () => {
    let slideInterval = setInterval(nextSlide, 3000);
    let slides = Array.from(document.querySelectorAll('.slides_quote_container > div')).filter(div => div.querySelector('p.quotes'));
    let controlsContainer = document.querySelector('.slider_link');
    let currentSlide = 0;

    controlsContainer.innerHTML = '';

    slides.forEach((_, index) => {
        let dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.setAttribute('data-slide', index);
        controlsContainer.appendChild(dot);
    });

    let dots = document.querySelectorAll('.dot');

    function updateSlidePosition() {
        let offset = -currentSlide * 100;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function goToSlide(n) {
        dots[currentSlide].classList.remove('active');
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        updateSlidePosition();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(dot.getAttribute('data-slide'));
            slideInterval = setInterval(nextSlide, 4500);
        });
    });

    let slider = document.querySelector('.quotes_section .slides_quote_container');
    slider.addEventListener('mouseenter', (e) => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', (e) => {
        slideInterval = setInterval(nextSlide, 4500);
    });
});

// ====================== accept form =======================

const accept_form = document.querySelector(".accept_form")
const accept_button = document.querySelector(".accept_button")

document.addEventListener('click', function (e) {
    if (!accept_form.contains(e.target) && !accept_button.contains(e.target)) {
        accept_form.classList.remove('active')
    }
})

function form_active() {
    accept_form.classList.toggle("active")
    accept_button.classList.toggle("active")
}


const footerForm = document.querySelector(".footer_form"),
    inputContact = document.querySelector(".input_contact"),
    inputEmail = document.querySelector(".input_email"),
    inputSubject = document.querySelector(".input_subject"),
    inputCompanyName = document.querySelector(".input_company_name"),
    textareaMessage = document.querySelector(".textarea_message")

accept_button.onclick = checkEmail


document.addEventListener('DOMContentLoaded', () => {

    footerForm.addEventListener("submit", () => {
        localStorage.setItem("inputContact", inputContact.value)
        localStorage.setItem("inputEmail", inputEmail.value)
        localStorage.setItem("inputSubject", inputSubject.value)
        localStorage.setItem("inputCompanyName", inputCompanyName.value)
        localStorage.setItem("inputMessage", textareaMessage.value)
    })

    inputContact.value = localStorage.getItem("inputContact")
    inputEmail.value = localStorage.getItem("inputEmail")
    inputSubject.value = localStorage.getItem("inputSubject")
    inputCompanyName.value = localStorage.getItem("inputCompanyName")
    textareaMessage.value = localStorage.getItem("inputMessage")
})

const customeAlert = document.querySelector(".alert");
const errorText = document.querySelector(".errorText");
const errorTime = document.querySelector(".timeLine");

function startPosition() {
    errorTime.style.transition = 0 + "s";
    errorTime.style.transition = 5 + "s";
    customeAlert.style.right = 20 + "px";
    errorTime.style.width = 0;
    setTimeout(() => {
        customeAlert.style.right = -100 + "%";
        errorTime.style.width = 100 + "%";
    }, 5000);
}

function checkEmail() {
    let email = inputEmail.value
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let dot = 0;

    for (let i = 0; i < email.length; i++) {
        if (email[i] == ".") {
            dot++
        }
    }
    try {
        if (!reg.test(email) || dot > 2) {
            throw "Введіть електрону пошту коректно"
        }
    } catch (e) {
        errorText.innerHTML = e;
        startPosition()
    } finally {
        if (reg.test(email) && dot <= 2) {
            form_active()
        }
    }
}