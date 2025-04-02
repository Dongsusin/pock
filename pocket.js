//슬라이더
const sliderWrap = document.querySelector(".slider__wrap"); //전체 이미지 슬라이드
const sliderImg = document.querySelector(".slider__img"); //보여지는 영역
const sliderInner = document.querySelector(".slider__inner"); //움직이는 영역
const slider = document.querySelectorAll(".slider"); //이미지
const sliderBtn = document.querySelector(".slider__btn"); //버튼
const sliderBtnPrev = document.querySelector(".slider__btn .prev"); //왼쪽 버튼
const sliderBtnNext = document.querySelector(".slider__btn .next"); //오른쪽 버튼
let currentIndex = 0, //현재 이미지
  sliderLength = slider.length, //슬라이더 총 길이
  sliderWidth = slider[0].offsetWidth, //슬라이더 가로 값
  sliderFirst = slider[0], //첫번째 이미지
  sliderLast = slider[sliderLength - 1], //마지막 이미지
  cloneFirst = sliderFirst.cloneNode(true), //첫번째 이미지 복사
  cloneLast = sliderLast.cloneNode(true); //마지막 이미지 복사
sliderInner.appendChild(cloneFirst);
sliderInner.insertBefore(cloneLast, sliderFirst);
//매개변수 사용 - 5번 슬라이트 이펙트 보다 세분화 시키기
function gotoSlider(direction) {
  sliderInner.classList.add("transition");
  // 슬라이드 버튼 연속으로 누를 수 없게 하기 02
  sliderBtn.classList.add("disable");

  posInital = sliderInner.offsetLeft;
  // console.log(posInital);

  //direction이라는 매개변수에 -1이 들어온다면 왼쪽으로 이동(이전) 또한 1이라면 오른쪽으로 이동(다음)
  if (direction == -1) {
    // sliderInner.style.left = "800px"; //왼쪽으로 800만큼 움직이기
    //부모박스 offsetLeft값을 구하여 더하는 이유는? sliderWidth는 슬라이더 하나만의 가로값이기 때문에 이동시 늘어나거나 줄어드는 값을 구할 수 없다 때문에 그 슬라이더를 감싸는 부모박스의 가로값을 구하여 늘어나는 값 만큼 길이를 더하여 추가시킨 것 이다.
    sliderInner.style.left = posInital + sliderWidth + "px"; //왼쪽으로 슬라이더 가로값만큼 움직이기. 슬라이더의 부모박스의 왼쪽값을 더한 이유는?
    currentIndex--;
  } else if (direction == 1) {
    // sliderInner.style.left = "-800px";
    sliderInner.style.left = posInital - sliderWidth + "px";
    currentIndex++;
  }
}

// 순간이동 이미지 슬라이드 (무한 슬라이드)
function checkIndex() {
  //슬라이드가 끝나면 transition 클래스를 다시 지워서 transition효과가 나오지 않도록 하고 이미지 순간이동 시키기
  sliderInner.classList.remove("transition");
  // console.log(currentIndex);

  if (currentIndex == sliderLength) {
    sliderInner.style.left = -(1 * sliderWidth) + "px";
    currentIndex = 0;
  }

  if (currentIndex == -1) {
    sliderInner.style.left = -(sliderLength * sliderWidth) + "px";
    currentIndex = sliderLength - 1;
  }
}

//실행문
sliderBtnPrev.addEventListener("click", () => {
  gotoSlider(-1); //매개변수 direction에 값 주기
  setTimeout(() => {
    sliderBtn.classList.remove("disable");
  }, 1000);
});
sliderBtnNext.addEventListener("click", () => {
  gotoSlider(1); //매개변수 direction에 값 주기
  setTimeout(() => {
    sliderBtn.classList.remove("disable");
  }, 1000);
});
// 트렌지션 이벤트가 끝났을 때 일어나는 이벤트
sliderInner.addEventListener("transitionend", checkIndex);
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
