let slides = document.querySelector(".slides"),
  slide = document.querySelectorAll(".slides li"),
  currentIdx = 0,
  slideCount = slide.length,
  slideWidth = window.innerWidth,
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next");

makeClone();

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  //index 번호 4번은 슬라이드 05임
  //  slideCount -1 초기값
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // 원래 있던 내용 앞에 추가해야함(요소의 앞)
    slides.prepend(cloneSlide);
  }

  updateWidth();
  setinit();
  setTimeout(function () {
    slides.classList.add("animated");
  }, 100);
}

// 전체 너비를 구해서 ul의 너비를 지정하는 함수
function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides li");
  let newSlideCount = currentSlides.length;

  let newWidth = slideWidth * newSlideCount + "px";
  slides.style.width = newWidth;
}

//초기 위치 잡는 함수
function setinit() {
  // 왼쪽으로 움직일거니까 ( - )붙임
  // 이동할 변수
  let TranslateValue = -slideWidth * slideCount;
  slides.style.transform = "translateX(" + TranslateValue + "px)";
}

nextBtn.addEventListener("click", function () {
  // 지금 보고있는 슬라이드 수 +1 로 이동
  moveSlide(currentIdx + 1);
});
prevBtn.addEventListener("click", function () {
  // 지금 보고있는 슬라이드 수 +1 로 이동
  moveSlide(currentIdx - 1);
});

// 숫자가 넘어와야 함수가 작동 하도럭
// next 누를수록 왼쪽으로 translate left 값이 거리만큼 이동해야함
// 전체가 슬라이드 너비+여백 만큼 이동해야지?
function moveSlide(num) {
  // 원래는 0이었는데 사용자가 이동하면 index가 1로 바뀌어있어야 함
  slides.style.left = -num * slideWidth + "px";
  //이동한 다음에는 currentIdx를 반드시 슬라이드가 최종적으로 보고있는 num 숫자만큼 바껴있어야 함.
  currentIdx = num;
  console.log(currentIdx, slideCount);
  // 마지막이면 1번으로 다시 돌리기

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

//포토폴리오 팝업

// 쿠키 가져오기
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
// 쿠키 설정하기
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
// 쿠키 삭제하기 (테스트용)
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
// 테스트용: 브라우저 콘솔에서 deletePopupCookie() 호출로 쿠키 삭제 가능
window.deletePopupCookie = () => deleteCookie("hidePopup");
// 페이지 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", function () {
  // 이미 오늘 다시 보지 않기 설정이 되어 있다면 팝업을 띄우지 않음
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
        setCookie("hidePopup", "true", 1); // 하루 동안 유지
      }
      overlay.remove();
      popup.remove();
    });

    document.body.append(overlay, popup);
  }
});
$(document).ready(function () {
  // 더블 클릭 방지 기능을 추가할 요소를 선택합니다.
  // 예를 들어, 버튼에 대한 더블 클릭 방지 기능을 추가하려면 아래와 같이 작성할 수 있습니다.
  $("button").on("dblclick", function (e) {
    // 더블 클릭 이벤트를 취소합니다.
    e.preventDefault();
  });
});
