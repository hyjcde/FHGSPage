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

    if (slider && sliderControl && slideImage) {
      // 设置第一张原始图像为 3DGS 图像
      slideImage.alt = "3DGS Feature Image";

      // 添加图片加载错误处理
      slideImage.onerror = function () {
        console.error("Error loading first image:", this.src);
        // 尝试不同的路径
        this.src = window.location.origin + "/images/paper/compare1.png";
      };

      // 创建比较图像（FHGS图像）
      const comparisonImage = document.createElement("img");
      comparisonImage.src = "images/paper/compare2.png"; // 使用相对路径尝试
      comparisonImage.alt = "FHGS Feature Image";
      comparisonImage.classList.add("slide-image", "comparison-image");
      comparisonImage.style.clipPath = "inset(0 50% 0 0)";

      // 添加图片加载错误处理
      comparisonImage.onerror = function () {
        console.error("Error loading comparison image:", this.src);
        // 尝试不同的路径
        this.src = window.location.origin + "/images/paper/compare2.png";
      };

      slider.appendChild(comparisonImage);

      // 添加分隔线
      const divider = document.createElement("div");
      divider.className = "slider-divider";
      slider.appendChild(divider);

      // 添加滑动控制手柄
      const handle = document.createElement("div");
      handle.className = "slider-handle";
      // 添加左右箭头图标到手柄
      handle.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>';
      slider.appendChild(handle);

      // 添加标签
      const leftLabel = document.createElement("div");
      leftLabel.className = "slider-label left-label";
      leftLabel.textContent = "3DGS";
      slider.appendChild(leftLabel);

      const rightLabel = document.createElement("div");
      rightLabel.className = "slider-label right-label";
      rightLabel.textContent = "FHGS";
      slider.appendChild(rightLabel);

      // 监听滑块变化
      sliderControl.addEventListener("input", function () {
        const position = this.value + "%";
        comparisonImage.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
        divider.style.left = position;
        handle.style.left = position;

        // 根据滑块位置调整标签透明度
        const value = parseFloat(this.value);
        leftLabel.style.opacity = (100 - value) / 100;
        rightLabel.style.opacity = value / 100;
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
        // 添加活跃状态类
        slider.classList.add("active-sliding");
      }

      function drag(e) {
        if (!isDragging) return;

        const rect = slider.getBoundingClientRect();
        let x;

        if (e.clientX) {
          x = e.clientX - rect.left;
        } else if (e.touches && e.touches[0]) {
          x = e.touches[0].clientX - rect.left;
        } else {
          return;
        }

        const position = Math.max(0, Math.min(100, (x / rect.width) * 100));

        sliderControl.value = position;
        sliderControl.dispatchEvent(new Event("input"));
      }

      function endDrag() {
        isDragging = false;
        // 移除活跃状态类
        const sliders = document.querySelectorAll(".slider");
        sliders.forEach((s) => s.classList.remove("active-sliding"));
      }

      // 添加交互提示
      const overlay = slider.querySelector(".slider-overlay");
      if (overlay) {
        // 点击开始交互
        slider.addEventListener("click", function () {
          overlay.style.opacity = "0";
          setTimeout(() => {
            overlay.style.display = "none";
          }, 500);
        });

        // 滑块移动也隐藏提示
        sliderControl.addEventListener("input", function () {
          overlay.style.opacity = "0";
          setTimeout(() => {
            overlay.style.display = "none";
          }, 500);
        });
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
