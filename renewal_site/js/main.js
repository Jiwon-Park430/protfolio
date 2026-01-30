$(function(){

  /* 햄버거 메뉴 */
  $(".hamburger-menu").on("click", function(){
    $(".headB").addClass("active");
  });

  $(".menu-close").on("click", function(){
    $(".headB").removeClass("active");
  });

  /* PC 드롭다운 */
  $("nav .container>ul>li").hover(
    function(){
      $(this).children("ul").stop(true, true).slideDown(300);
    },
    function(){
      $(this).children("ul").stop(true, true).slideUp(300);
    }
  );

  /* 메인 슬라이드 */
  const $slide = $("#slide ul");
  const slideCount = $slide.children("li").length;
  const slideWidth = 1200;
  let timer;
  let currentIndex = 0;
  let isAnimating = false;


  for(let i = 0; i < slideCount; i++){
    $(".pager").append("<span></span>");
  }
  $(".pager span").eq(0).addClass("active");

  function updatePager(){
    $(".pager span").removeClass("active");
    $(".pager span").eq(currentIndex).addClass("active");
  }

  function nextSlide(){
    if(isAnimating) return;
    isAnimating = true;

    $slide.animate({ left: -slideWidth }, 600, function(){
      $slide.append($slide.children("li").first());
      $slide.css("left", 0);
      currentIndex = (currentIndex + 1) % slideCount;
      updatePager();
      isAnimating = false;
    });
  }

  function prevSlide(){
    if(isAnimating) return;
    isAnimating = true;

    $slide.prepend($slide.children("li").last());
    $slide.css("left", -slideWidth);
    $slide.animate({ left: 0 }, 600, function(){
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updatePager();
      isAnimating = false;
    });
  }

  function startAuto(){
    timer = setInterval(nextSlide, 3000);
  }

  function stopAuto(){
    clearInterval(timer);
  }

  startAuto();

  $(".next").on("click", function(){
    stopAuto();
    nextSlide();
    startAuto();
  });

  $(".prev").on("click", function(){
    stopAuto();
    prevSlide();
    startAuto();
  });

  $(".pager span").on("click", function(){
    const target = $(this).index();
    if(target === currentIndex || isAnimating) return;

    stopAuto();
    target > currentIndex ? nextSlide() : prevSlide();
    startAuto();
  });


  // 메인페이지 제품 슬라이드
  $(".products-wrap").each(function(){

    let index = 0;
    let isAnimating = false;

    const $wrap = $(this);
    const $list = $wrap.find(".product-list");
    const $items = $wrap.find(".product");
    const count = $items.length;

    function moveSlide(){
      if(isAnimating) return;
      isAnimating = true;

      const itemWidth = $items.eq(0).outerWidth(true);

      $list.stop().animate({
        left: -(itemWidth * index)
      }, 400, function(){
        isAnimating = false;
      });
    }

    $wrap.find(".p-next").on("click", function(){
      if(index < count - 1){
        index++;
        moveSlide();
      }
    });

    $wrap.find(".p-prev").on("click", function(){
      if(index > 0){
        index--;
        moveSlide();
      }
    });

    $(window).on("resize", function(){
      if($(window).width() < 768){
        index = 0;
        $list.css("left", 0);
      } else {
        $list.css("left", 0);
      }
    }).trigger("resize");

  }); 


});




/* buy.html 슬라이드 */
$(function () {

  if (!$(".product-slider").length) return;

  const $slider = $(".product-slider");
  const $track  = $slider.find(".slider-track");
  const $slides = $track.find("img");

  const slideCount = $slides.length;
  const duration = 500;  
  const delay = 5000;     

  let index = 0;
  let timer = null;
  let isAnimating = false;

  function sliderWidth() {
    return $slider.outerWidth();
  }

  function moveSlide() {
    isAnimating = true;

    $track.css({
      transition: `transform ${duration}ms ease`,
      transform: `translateX(-${index * sliderWidth()}px)`
    });

    setTimeout(() => {
      isAnimating = false;
    }, duration);
  }

  function nextSlide() {
    if (isAnimating) return;

    index = (index + 1) % slideCount;
    moveSlide();
  }

  function prevSlide() {
    if (isAnimating) return;

    index = (index - 1 + slideCount) % slideCount;
    moveSlide();
  }

  function startAuto() {
    timer = setInterval(nextSlide, delay);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  $slider.find(".slider-btn.next").on("click", function () {
    stopAuto();
    nextSlide();
    startAuto();
  });

  $slider.find(".slider-btn.prev").on("click", function () {
    stopAuto();
    prevSlide();
    startAuto();
  });

  $slider.on("mouseenter", stopAuto);
  $slider.on("mouseleave", startAuto);

  $(window).on("resize", function () {
    moveSlide();
  });

  startAuto();


  $(document).ready(function() {
    $('.sub-nav ul li a').click(function(e) {
      e.preventDefault();
      $('.sub-nav ul li').removeClass('on');
  
      $(this).parent('li').addClass('on');
  
      const target = $(this).attr('href'); 
      const offset = $(target).offset().top - 60; 
  
      $('html, body').animate({
        scrollTop: offset
      }, 500);
    });
  });
});
