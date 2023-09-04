//Declaramdno variáveis do slider
var sliderContainer = document.querySelector('.jl-slider-container');
var sliderList = document.querySelector('.jl-slider-list');
var sliderItem = document.querySelectorAll('.jl-portfolio-item');
const sliderTotalItems = sliderItem.length
var sliderListWidth = null
var prevItem = document.querySelector('.jl-item-prev');
var nextItem = document.querySelector('.jl-item-next');
var sliderPos = 0;
var currentSlide = document.querySelector('.jl-current-slide');
var totalSlide = document.querySelector('.jl-total-slide');
var currentCounter = 1;
var navItems = document.querySelectorAll('.jl-item-navigator a');
var navCounter = document.querySelector ('.jl-navigator-counter span');

//Capturando larguras individuais
if (window.innerWidth < 992){
    var containerWidth = sliderContainer.parentElement.offsetWidth - 30;
} else {
    var containerWidth = sliderContainer.parentElement.offsetWidth;
}


//Passando larguras dinâmicas
sliderContainer.style.width = containerWidth + 'px';

for(var i = 0; i < sliderItem.length; i++) {
    sliderItem[i].style.width = containerWidth + 'px';
    var sliderItemWidth = sliderItem[i].offsetWidth;

    sliderListWidth += sliderItemWidth;
}
sliderList.style.width = sliderListWidth + 'px';


//Fazendo Animação do Slider onClick

//HANDLERS

//Next Slide Animação

var nextSliderAnim = function(){
    var lastItem = sliderListWidth - containerWidth;

    if(-1*(sliderPos) === lastItem){
        return;
    }

    sliderPos -= containerWidth

    anime({
       targets: sliderList,
       translateX: sliderPos,
       easing: 'cubicBezier(0,1.01,.32,1)'
    });
}

//Prev Slide Animação

var prevSlideAnim = function(){
    if(sliderPos === 0){
        return;
    }

    sliderPos += containerWidth

    anime({
       targets: sliderList,
       translateX: sliderPos,
       easing: 'cubicBezier(0,1.01,.32,1)'
    });
}

//Counter Formater
var counterFormater = function(n){
    if(n < 10){
        return '0' + n;
    } else {
        return n;
    }
}

//Counter Add
var counterAdd = function(){
    if(currentCounter >= 0 && currentCounter < sliderTotalItems){
        currentCounter++;
        currentSlide.innerHTML = counterFormater(currentCounter);
        navCounter.innerHTML = counterFormater(currentCounter);
    }   
}

//Counter Remove
var counterRemove = function(){
    if(currentCounter > 1 && currentCounter <= sliderTotalItems){
        currentCounter--;
        currentSlide.innerHTML = counterFormater(currentCounter);
        navCounter.innerHTML = counterFormater(currentCounter);
    }   
}

//Set Active Nav
var setAtiveNav = function(){
    for (var i = 0; i < navItems.length; i++){
        let myNavNum = parseInt(navItems[i].getAttribute('data-nav'))

        if(myNavNum === currentCounter){
            navItems[i].classList.add('jl-item-active');

            anime({
                targets: '.jl-item-active',
                width: 90 
            });
        }
    }
}

//Set Active Slide
var setAtiveSlide = function(){
    for (var i = 0; i < sliderItem.length; i++){
        let mySlideNum = parseInt(sliderItem[i].getAttribute('data-slide'))

        if(mySlideNum === currentCounter){
            sliderItem[i].classList.add('jl-slide-active');
            sliderItem[i].querySelector('.jl-portfolio-item-box').classList.add('jl-scale-right');
            sliderItem[i].querySelector('.jl-portfolio-item-thumb img').classList.add('jl-scale-up');
            sliderItem[i].querySelector('.jl-portfolio-item-info').classList.add('jl-fade-from-left');
        }
    }
}

var changeActive = function(){
    for (var i = 0; i < navItems.length; i++){
        navItems[i].classList.remove('jl-item-active');
        anime({
            targets: navItems[i],
            width: 20 
        });
    }

    for (var i = 0; i < sliderItem.length; i++){
        sliderItem[i].classList.remove('jl-slide-active');
        sliderItem[i].querySelector('.jl-portfolio-item-box').classList.remove('jl-scale-right');
        sliderItem[i].querySelector('.jl-portfolio-item-thumb img').classList.remove('jl-scale-up');
        sliderItem[i].querySelector('.jl-portfolio-item-info').classList.remove('jl-fade-from-left');
    }

    setAtiveNav();
    setAtiveSlide();
}


//ACTIONS

totalSlide.innerHTML = counterFormater(sliderTotalItems);

anime({
    targets: '.jl-item-active',
    width: 90 
});



nextItem.addEventListener('click', function () {
    nextSliderAnim();
    counterAdd();
    changeActive();
});

prevItem.addEventListener('click', function () {
    prevSlideAnim();
    counterRemove();
    changeActive();
});