document.addEventListener("DOMContentLoaded", function () {
  // 页面加载完成后隐藏加载动画
  setTimeout(function () {
    const pageLoader = document.querySelector(".page-loader");
    if (pageLoader) {
      pageLoader.classList.add("fade-out");
    }
  }, 800);

  // 初始化所有滑块控制
  initMainSlider();
  initSceneSliders();

  // 初始化返回顶部按钮
  initBackToTop();
});

// 初始化主滑块
function initMainSlider() {
  const sliders = document.querySelectorAll(
    ".slider-container:not(.scene-slider-container)"
  );

  sliders.forEach((container) => {
    const slider = container.querySelector(".slider");
    const sliderControl = container.querySelector(".slider-control");
    const slideImage = container.querySelector(".slide-image");
    const comparisonImage = container.querySelector(".comparison-image");

    if (slider && sliderControl && slideImage && comparisonImage) {
      // 处理图片加载错误
      handleImageErrors(slideImage);
      handleImageErrors(comparisonImage);

      // 监听滑块变化
      sliderControl.addEventListener("input", function () {
        const position = this.value + "%";
        comparisonImage.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
        const divider = slider.querySelector(".slider-divider");
        const handle = slider.querySelector(".slider-handle");
        if (divider) divider.style.left = position;
        if (handle) handle.style.left = position;

        // 根据滑块位置调整标签透明度
        const leftLabel = slider.querySelector(".left-label");
        const rightLabel = slider.querySelector(".right-label");
        const value = parseFloat(this.value);
        if (leftLabel) leftLabel.style.opacity = (100 - value) / 100;
        if (rightLabel) rightLabel.style.opacity = value / 100;
      });

      // 初始化滑块位置
      sliderControl.dispatchEvent(new Event("input"));

      // 添加拖动功能
      enableDragging(slider, sliderControl);

      // 添加交互提示
      handleOverlay(slider, sliderControl);
    }
  });
}

// 初始化场景滑块
function initSceneSliders() {
  const sceneContainers = document.querySelectorAll(".scene-slider-container");

  sceneContainers.forEach((container) => {
    const slider = container.querySelector(".scene-slider");
    const sliderControl = container.querySelector(".scene-slider-control");
    const slideImage = container.querySelector(".scene-slide-image");
    const comparisonImage = container.querySelector(".scene-comparison-image");

    if (slider && sliderControl && slideImage && comparisonImage) {
      // 处理图片加载错误
      handleImageErrors(slideImage);
      handleImageErrors(comparisonImage);

      // 监听滑块变化
      sliderControl.addEventListener("input", function () {
        const position = this.value + "%";
        comparisonImage.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
        const divider = slider.querySelector(".slider-divider");
        const handle = slider.querySelector(".slider-handle");
        if (divider) divider.style.left = position;
        if (handle) handle.style.left = position;

        // 根据滑块位置调整标签透明度
        const leftLabel = slider.querySelector(".left-label");
        const rightLabel = slider.querySelector(".right-label");
        const value = parseFloat(this.value);
        if (leftLabel) leftLabel.style.opacity = (100 - value) / 100;
        if (rightLabel) rightLabel.style.opacity = value / 100;
      });

      // 初始化滑块位置
      sliderControl.dispatchEvent(new Event("input"));

      // 添加拖动功能
      enableDragging(slider, sliderControl);
    }
  });
}

// 处理图片加载错误
function handleImageErrors(imgElement) {
  if (!imgElement) return;

  imgElement.onerror = function () {
    console.error("Error loading image:", this.src);
    // 尝试替代路径
    const currentPath = this.src;
    let newPath = currentPath;

    if (currentPath.includes("/images/compare/")) {
      // 尝试不同路径变化
      if (!currentPath.startsWith("/")) {
        newPath = "/" + currentPath;
      }
    }

    if (newPath !== currentPath) {
      this.src = newPath;
    }
  };
}

// 启用拖动功能
function enableDragging(slider, sliderControl) {
  let isDragging = false;
  const handle = slider.querySelector(".slider-handle");

  if (handle) {
    handle.addEventListener("mousedown", startDrag);
    handle.addEventListener("touchstart", startDrag);
  }

  slider.addEventListener("mousedown", startDrag);
  slider.addEventListener("touchstart", startDrag);

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
    if (!isDragging) return;
    isDragging = false;
    // 移除活跃状态类
    slider.classList.remove("active-sliding");
  }
}

// 处理覆盖提示
function handleOverlay(slider, sliderControl) {
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

// 页面滚动动画
window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(
    ".method-item, .comparison-item, .comparison-scene"
  );

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
        .method-item, .comparison-item, .comparison-scene {
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
      ".method-item, .comparison-item, .comparison-scene"
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
