"use strict";

// ... 既存のコード ...

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    loop: false,
    spaceBetween: 12,
    width: 300,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

const slideBtns = document.querySelectorAll(".section__stalls-btn");
if (slideBtns) {
  slideBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

//back to topボタンの作り、logoとnavのfixed効果
const menuBtn = document.querySelector(".menu_icon");
const menuLinea = document.querySelector(".linea");
const menuLineb = document.querySelector(".lineb");
const menuLinec = document.querySelector(".linec");
const nav = document.querySelector(".phone-nav");

menuBtn.addEventListener("click", function () {
  menuLinea.classList.toggle("open");
  menuLineb.classList.toggle("open");
  menuLinec.classList.toggle("open");
  nav.classList.toggle("open");
}); //スマホナビゲーションの動き
const fixedBox = document.createElement("div");
fixedBox.className = "fixedbox";
document.body.appendChild(fixedBox);
window.addEventListener("scroll", function () {
  const scrollPosition = window.pageYOffset;
  const backToTop = document.querySelector(".backtotop");
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const logo = document.querySelector(".header-logo");

  if (scrollPosition > 800) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }); //backtotop機能
  if (window.innerWidth > 640) {
    if (scrollPosition > 300) {
      fixedBox.style.display = "block"; // ボックスを表示
    } else {
      fixedBox.style.display = "none"; // ボックスを非表示
    }
  }

  if (window.innerWidth <= 640) {
    if (scrollPosition / documentHeight > 0.9) {
      menuBtn.style.display = "none";
      logo.style.display = "none";
    } else {
      menuBtn.style.display = "flex";
      logo.style.display = "block";
    } //スマホの場合はフッターに近づくと表示を消える
    if (scrollPosition > 300 && scrollPosition / documentHeight < 0.9) {
      fixedBox.style.display = "block"; // ボックスを表示
    } else {
      fixedBox.style.display = "none"; // ボックスを非表示
    }
  }

  backToTop.addEventListener("mouseover", function () {
    backToTop.classList.add("hovered");
    setTimeout(() => {
      backToTop.src = "../img/btn_sp_hover.png";
      backToTop.classList.remove("hovered");
    }, 300); // 0.5秒後に画像を変更
  });
  backToTop.addEventListener("mouseleave", function () {
    backToTop.classList.add("hovered");
    setTimeout(() => {
      backToTop.src = "../img/btn-white.png";
      backToTop.classList.remove("hovered");
    }, 300); // 0.5秒後に画像を変更
  });
});

//footer hplinkのhover
const hpbtn = document.querySelector(".hpbtn");
hpbtn.addEventListener("mouseover", function () {
  hpbtn.src = "../img/hpbtnhover.svg";
});
hpbtn.addEventListener("mouseleave", function () {
  hpbtn.src = "../img/hpbtn.svg";
});
//backtotopボタンのhover
//******************************* 以上は共通部分*******************************/

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  //memberページ飾りの動き
  if (path.includes("/member")) {
    const decoChange = [...document.querySelectorAll(".member-deco1")];
    let currentImage = 0;

    setInterval(() => {
      const nextImage = (currentImage + 1) % decoChange.length;
      decoChange[currentImage].classList.add("deco-hidden");
      decoChange[nextImage].classList.remove("deco-hidden");
      currentImage = nextImage;
    }, 2000); //二つの画像を切り替える

    const decoBilibili = document.querySelector(".member-deco2");
    setInterval(() => {
      decoBilibili.classList.toggle("deco-active");
    }, 1000); //拡大縮小

    //でんちゃんの制作担当の切り替え機能

    const switches = [...document.querySelectorAll(".member-switch")];
    const infos = [...document.querySelectorAll(".member_info3")];
    const slide = document.querySelector(".member_infoslide");
    let timereset;
    function switchTo1() {
      switches[0].classList.add("active");
      switches[1].classList.remove("active");
      infos[0].classList.add("info-active");
      infos[1].classList.remove("info-active");
    }
    function switchTo2() {
      switches[0].classList.remove("active");
      switches[1].classList.add("active");
      infos[0].classList.remove("info-active");
      infos[1].classList.add("info-active");
    }
    reset();
    let currentIndex = 0;

    function reset() {
      clearInterval(timereset);
      timereset = setInterval(() => {
        if (currentIndex === 0) {
          switchTo1(); // 1枚目に切り替え
          currentIndex = 1;
        } else {
          switchTo2(); // 2枚目に切り替え
          currentIndex = 0;
        }
      }, 8000);
    }

    switches[0].addEventListener("click", switchTo1, reset);
    switches[1].addEventListener("click", switchTo2, reset);
    //でんちゃんの制作担当の切り替え機能

    const minDis = 100;
    let startX = 0;
    let endX = 0;

    slide.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
    });
    slide.addEventListener("touchmove", (e) => {
      endX = e.changedTouches[0].pageX;
    });
    slide.addEventListener("touchend", (e) => {
      const distanceX = Math.floor(endX - startX);
      console.log(distanceX);
      if (distanceX > minDis) {
        switchTo2();
        reset();
      } else if (distanceX < -minDis) {
        switchTo1();
        reset();
      } else {
        return;
      }
    });
    //スワイプで切り替える機能（スマホのみ有効）
  } //greetingページの動き↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  else if (path.includes("/greeting")) {
    const texts = [...document.querySelectorAll(".greeting_text")];
    const photos = [...document.querySelectorAll(".greeting_img")];
    //テキストのスパン化
    texts.forEach((element) => {
      const fullText = element.textContent; // 元のテキストを取得
      element.innerHTML = ""; // 元の内容を消去

      // 各文字をスパンでラップ
      for (let char of fullText) {
        if (char === " ") {
          element.innerHTML += " "; // 空白の場合はそのまま追加
        } else if (char === "\n") {
          element.innerHTML += "<br>"; // 改行の場合は<br>を追加
        } else {
          const span = document.createElement("span"); // 新しいスパン要素を作成
          span.textContent = char; // スパン要素に文字を設定
          element.appendChild(span); // スパンをテキスト要素に追加
        }
      }
    });
    //textboxに入ってるかどうかチェック。
    window.addEventListener("scroll", () => {
      texts.forEach((x, y) => {
        const rect = x.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          textPrint(y);
        } else {
          reset(y);
        }
      });
    });
    //画面外の部分をreset
    function reset(x) {
      console.log("要素が画面外です。", x);
      const spans = texts[x].querySelectorAll("span");
      spans.forEach((span) => {
        span.style.color = "white";
      });
    }
    //画面内の部分を動きを付ける
    function textPrint(x) {
      console.log("要素が画面内に入っています。", x);
      const spans = texts[x].querySelectorAll("span"); //全部のspanを配列化
      const totalSpans = spans.length; //文字数
      const scrollTop = window.scrollY; //今のスクロールの位置取得
      const text = texts[x];
      let textTop;
      if (window.innerWidth <= 640) {
        textTop = text.offsetTop + text.offsetHeight - 1200;
      } else {
        textTop = text.offsetTop + text.offsetHeight - 1000;
      } //スマホとpcのスピード調整

      const viewportHeight = window.innerHeight; //viewport取得
      const scrollPercent = Math.min((scrollTop - textTop) / viewportHeight, 1); //パーセント計算
      const readCount = Math.floor(totalSpans * scrollPercent); //今読んでる部分を確認
      const readingChars = 7;

      spans.forEach((span, index) => {
        if (index < readCount) {
          span.style.color = "rgb(247,247,247)"; //既読部分は白
        } else if (index < readCount + readingChars) {
          const colors = [
            "rgb(238,238,238)",
            "rgb(228,228,228)",
            "rgb(213,213,214)",
            "rgb(195,195,196)",
            "rgb(172,173,174)",
            "rgb(146,146,147)",
            "rgb(81,82,84)",
          ]; //読んでる部分の7文字の色調整
          span.style.color = colors[index - readCount] || "gray"; //範囲外回避
        } else {
          span.style.color = "rgb(47,48,50)"; //未読部分は灰色
        }
      });
    }
  }
});
