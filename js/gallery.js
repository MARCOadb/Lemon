var overlay = document.querySelector('.jl-overlay');
var frameImage = document.querySelector('.jl-gallery-frame-image');
var frameContainer = document.querySelector('.jl-gallery-frame-container');
var galleryImages = document.querySelectorAll('.jl-thumb-box');
var closeGallery = document.querySelectorAll('.jl-toggle-gallery');
var btnNext = document.querySelector ('.jl-item-next');
var btnPrev = document.querySelector ('.jl-item-prev');
var currCounter = document.querySelector('.jl-current-slide');
var totalCounter = document.querySelector('.jl-total-slide');
var skeletonLoading = document.querySelector('.jl-skeleton-loading')

var postGallery = document.querySelector('.jl-post-gallery');
var postGalleryHeight = postGallery.clientHeight;
postGallery.style.height = (postGalleryHeight - 270) + 'px';

//Counter formater
var counterFormatter = function(n){
    if(n < 10){
        return '0' + n;
    } else {
        return n;
    }
}

totalCounter.innerHTML = counterFormatter(galleryImages.length);

//Skeleton Loading
const skeletonAnim = function(imagem){
    var myImage = new Image();
        myImage.src = imagem;
        myImage.addEventListener('load', function(){
            skeletonLoading.classList.add('jl-fade-out');
            setTimeout(function(){
                skeletonLoading.style.display = 'none';
            }, 2000);
        });
}

//Open Gallery Modal
const getImageSrc = function(){
    for (var i = 0; i < galleryImages.length; i++){
        galleryImages[i].addEventListener('click', function(){
            var imageSrc = this.querySelector('img').getAttribute('data-src');
            var itemNum = this.querySelector('img').getAttribute('data-item');

            frameImage.setAttribute('src', imageSrc);
            frameImage.setAttribute('data-index', itemNum);

            overlay.classList.add('jl-is-open');
            frameContainer.classList.add('jl-is-open');

            currCounter.innerHTML = counterFormatter(itemNum);

            skeletonAnim(imageSrc);
        });
    }
}
getImageSrc();


for (var i = 0; i < closeGallery.length; i++){
    closeGallery[i].addEventListener('click', function(){
        overlay.classList.remove('jl-is-open');
            frameContainer.classList.remove('jl-is-open');
    });
}

const nextItem = function(){

   //Identificamos o item atual no frame
   var curItemNum = frameImage.getAttribute('data-index');

    //Definimos o num do prox item
    var nextItemtNum = parseInt(curItemNum) + 1;

    //Famos o loop e identificamos qual item faz maatch com o numero do proximo item
    for (var i = 0; i < galleryImages.length; i++){
        var item = galleryImages[i].querySelector('img');
        var itemNum = parseInt(item.getAttribute('data-item'));

        if (itemNum === nextItemtNum) {
            //Campturamos o data-src 
            var nextSrc = item.getAttribute('data-src');
            var nextIndex = item.getAttribute('data-item'); 

            skeletonLoading.style.display = 'flex';

            //Passamos o data-src para a tag de img no frame 
            frameImage.setAttribute('src', nextSrc);
            frameImage.setAttribute('data-index', nextIndex)

            currCounter.innerHTML = counterFormatter(nextIndex);

            skeletonAnim(nextSrc);
        }
    }  
}

const prevItem = function(){

    //Identificamos o item atual no frame
    var curItemNum = frameImage.getAttribute('data-index');
 
     //Definimos o num do prox item
     var prevItemNum = parseInt(curItemNum) - 1;
 
     //Famos o loop e identificamos qual item faz maatch com o numero do proximo item
     for (var i = 0; i < galleryImages.length; i++){
         var item = galleryImages[i].querySelector('img');
         var itemNum = parseInt(item.getAttribute('data-item'));
 
         if (itemNum === prevItemNum) {
             //Campturamos o data-src 
             var prevSrc = item.getAttribute('data-src');
             var prevIndex = item.getAttribute('data-item'); 

             skeletonLoading.style.display = 'flex';
 
             //Passamos o data-src para a tag de img no frame 
             frameImage.setAttribute('src', prevSrc);
             frameImage.setAttribute('data-index', prevIndex)

             currCounter.innerHTML = counterFormatter(prevIndex);

             skeletonAnim(prevSrc);
         }
     }  
 }

btnNext.addEventListener('click', function(){
    nextItem();
});

btnPrev.addEventListener('click', function(){
    prevItem();
});