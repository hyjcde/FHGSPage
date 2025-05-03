document.addEventListener("DOMContentLoaded", function () {
  // 页面加载完成后隐藏加载动画
  setTimeout(function () {
    const pageLoader = document.querySelector(".page-loader");
    if (pageLoader) {
      pageLoader.classList.add("fade-out");
    }
  }, 800);

  // 初始化滑块控制
  initSlider();

  // 初始化返回顶部按钮
  initBackToTop();
});

function initSlider() {
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach((container) => {
    const slider = container.querySelector(".slider");
    const sliderControl = container.querySelector(".slider-control");
    const slideImage = container.querySelector(".slide-image");

    if (slider && sliderControl) {
      // 创建比较图像（克隆原始图像）
      const comparisonImage = document.createElement("img");
      comparisonImage.src = "images/feature_slider_comparison.jpg"; // 需要替换为实际的比较图像
      comparisonImage.classList.add("slide-image");
      comparisonImage.style.clipPath = "inset(0 50% 0 0)";
      slider.appendChild(comparisonImage);

      // 添加分隔线
      const divider = document.createElement("div");
      divider.style.position = "absolute";
      divider.style.top = "0";
      divider.style.bottom = "0";
      divider.style.width = "2px";
      divider.style.left = "50%";
      divider.style.backgroundColor = "white";
      divider.style.zIndex = "10";
      slider.appendChild(divider);

      // 添加滑动控制手柄
      const handle = document.createElement("div");
      handle.style.position = "absolute";
      handle.style.top = "50%";
      handle.style.left = "50%";
      handle.style.width = "40px";
      handle.style.height = "40px";
      handle.style.borderRadius = "50%";
      handle.style.backgroundColor = "white";
      handle.style.transform = "translate(-50%, -50%)";
      handle.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
      handle.style.zIndex = "11";
      handle.style.cursor = "ew-resize";
      slider.appendChild(handle);

      // 监听滑块变化
      sliderControl.addEventListener("input", function () {
        const position = this.value + "%";
        comparisonImage.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
        divider.style.left = position;
        handle.style.left = position;
      });

      // 初始化滑块位置
      sliderControl.dispatchEvent(new Event("input"));

      // 添加拖动功能
      let isDragging = false;

      handle.addEventListener("mousedown", startDrag);
      handle.addEventListener("touchstart", startDrag);

      document.addEventListener("mousemove", drag);
      document.addEventListener("touchmove", drag);

      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchend", endDrag);

      function startDrag(e) {
        isDragging = true;
        e.preventDefault();
      }

      function drag(e) {
        if (!isDragging) return;

        const rect = slider.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const position = Math.max(0, Math.min(100, (x / rect.width) * 100));

        sliderControl.value = position;
        sliderControl.dispatchEvent(new Event("input"));
      }

      function endDrag() {
        isDragging = false;
      }
    }
  });
}

// 页面滚动动画
window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".method-item, .comparison-item");

  elements.forEach((element) => {
    const position = element.getBoundingClientRect();

    // 检查元素是否在视口中
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add("fade-in");
    }
  });
});

// 添加淡入效果的CSS类
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        .method-item, .comparison-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`
);

// 顶部导航栏滚动效果
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 添加滚动导航栏效果的CSS类
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        header {
            transition: padding 0.3s ease;
        }
        
        header.scrolled {
            padding: 1.5rem 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    </style>
`
);

// 初始化所有方法项和比较项为可见状态
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const elements = document.querySelectorAll(
      ".method-item, .comparison-item"
    );
    elements.forEach((element) => {
      element.classList.add("fade-in");
    });
  }, 300);
});

// 返回顶部按钮功能
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    // 监听滚动事件
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });

    // 点击事件
    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
