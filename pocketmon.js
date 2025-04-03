//슬라이더
let slides = document.querySelector(".slides"), //s슬라이더 전체
  slide = document.querySelectorAll(".slides li"), //슬라이더 1페이지
  currentIdx = 0, //현재 페이지
  slideCount = slide.length, //슬라이더 갯수
  slideWidth = window.innerWidth, //슬라이더 크기
  prevBtn = document.querySelector(".prev"), //이전 페이지 버튼
  nextBtn = document.querySelector(".next"); //다음 페이지 버튼

makeClone();
//슬라이더 복제본 생성
function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setinit();
  setTimeout(function () {
    slides.classList.add("animated");
  }, 100);
}
//슬라이더 길이 계산
function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides li");
  let newSlideCount = currentSlides.length;

  let newWidth = slideWidth * newSlideCount + "px";
  slides.style.width = newWidth;
}
//슬라이더 위치치 초기화
function setinit() {
  let TranslateValue = -slideWidth * slideCount;
  slides.style.transform = "translateX(" + TranslateValue + "px)";
}
//다음 페이지 버튼 클릭
nextBtn.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});
//이전 페이지 버튼 클릭
prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});
//페이지 이동동
function moveSlide(num) {
  slides.style.left = -num * slideWidth + "px";
  currentIdx = num;
  console.log(currentIdx, slideCount);
  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(function () {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 500);
    setTimeout(function () {
      slides.classList.add("animated");
    }, 600);
  }
}
//페이지 자동이동
setInterval(sliderEffect, 8000);
function sliderEffect() {
  moveSlide(currentIdx + 1);
}
//스크롤시 헤더 숨김
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("header").outerHeight();
//스크롤 확인
$(window).scroll(function (event) {
  didScroll = true;
});
//헤더 크기 계산
setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);
//스크롤시 헤더에 nav class 추가
function hasScrolled() {
  var st = $(this).scrollTop();
  if (Math.abs(lastScrollTop - st) <= delta) return;
  if (st > lastScrollTop && st > navbarHeight) {
    $("header").addClass("nav-up");
  } else {
    if (st + $(window).height() < $(document).height()) {
      $("header").removeClass("nav-up");
    }
  }
  lastScrollTop = st;
}
//팝업창
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
window.deletePopupCookie = () => deleteCookie("hidePopup");
document.addEventListener("DOMContentLoaded", function () {
  if (getCookie("hidePopup") !== "true") {
    const overlay = document.createElement("div");
    overlay.style = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: rgba(0, 0, 0, 0.5); z-index: 999;
        `;
    const popup = document.createElement("div");
    popup.style = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            padding: 20px; background-color: white; border: 1px solid #333;
            border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center; z-index: 1000;
        `;
    popup.innerHTML = `
            <p>이 사이트는 상업적인 용도가 아니며,<br> 포트폴리오 용도로 제작되었습니다.</p>
            <button style="
                margin-top: 12px; padding: 4px 12px; border-radius: 4px; border: none;
                background-color: #333; color: white; cursor: pointer;
            ">닫기</button>
            <br/>
            <label style="margin-top: 8px; display: block; cursor: pointer;">
                <input type="checkbox" style="margin-right: 5px;" id="noShowToday">
                오늘 다시 보지 않기
            </label>
        `;
    const closeButton = popup.querySelector("button");
    const noShowToday = popup.querySelector("#noShowToday");
    closeButton.addEventListener("click", () => {
      if (noShowToday.checked) {
      }
      overlay.remove();
      popup.remove();
    });
    document.body.append(overlay, popup);
  }
});
$(document).ready(function () {
  $("button").on("dblclick", function (e) {
    e.preventDefault();
  });
});
