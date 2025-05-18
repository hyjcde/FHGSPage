document.addEventListener("DOMContentLoaded", function () {
  // 添加页面入场动画
  document.body.classList.add("loaded");

  // 页面加载完成后隐藏加载动画
  setTimeout(function () {
    const pageLoader = document.querySelector(".page-loader");
    if (pageLoader) {
      pageLoader.classList.add("fade-out");
      setTimeout(() => {
        pageLoader.style.display = "none";
      }, 800);
    }
  }, 800);

  // 初始化所有滑块控制
  initMainSlider();
  initSceneSliders();

  // 初始化返回顶部按钮
  initBackToTop();

  // 初始化滚动动画
  initScrollAnimations();

  // 初始化视差效果
  initParallaxEffects();

  // 给按钮添加悬浮效果
  initButtonHoverEffects();
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
        // 从左侧裁剪，值越大，左侧图片显示越多
        comparisonImage.style.clipPath = `inset(0 0 0 ${this.value}%)`;
        const divider = slider.querySelector(".slider-divider");
        const handle = slider.querySelector(".slider-handle");
        if (divider) divider.style.left = position;
        if (handle) handle.style.left = position;

        // 根据滑块位置调整标签透明度
        const leftLabel = slider.querySelector(".left-label");
        const rightLabel = slider.querySelector(".right-label");
        const value = parseFloat(this.value);
        if (leftLabel) leftLabel.style.opacity = value / 100;
        if (rightLabel) rightLabel.style.opacity = (100 - value) / 100;
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
        // 从左侧裁剪，值越大，左侧FHGS显示越多，右侧Feature3DGS被裁剪越多
        comparisonImage.style.clipPath = `inset(0 0 0 ${this.value}%)`;
        const divider = slider.querySelector(".slider-divider");
        const handle = slider.querySelector(".slider-handle");
        if (divider) divider.style.left = position;
        if (handle) handle.style.left = position;

        // 根据滑块位置调整标签透明度
        const leftLabel = slider.querySelector(".left-label");
        const rightLabel = slider.querySelector(".right-label");
        const value = parseFloat(this.value);
        if (leftLabel) leftLabel.style.opacity = value / 100;
        if (rightLabel) rightLabel.style.opacity = (100 - value) / 100;
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

// 初始化滚动动画
function initScrollAnimations() {
  // 创建一个Intersection Observer实例
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // 如果已经显示，不需要再观察
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // 使用视口作为根
      threshold: 0.15, // 当元素15%进入视口时触发
      rootMargin: "0px 0px -100px 0px", // 底部给100px的提前量
    }
  );

  // 选择要观察的元素
  const animatedElements = document.querySelectorAll(
    ".method-item, .comparison-item, .comparison-scene, h2, .abstract p, .main-feature-container, .citation-box"
  );

  // 对每个元素添加初始类并开始观察
  animatedElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    el.style.animationDelay = `${index * 0.1}s`; // 级联动画效果
    observer.observe(el);
  });

  // 添加滚动样式
  document.head.insertAdjacentHTML(
    "beforeend",
    `
      <style>
          .animate-on-scroll {
              opacity: 0;
              transform: translateY(30px);
              transition: opacity 0.8s ease, transform 0.8s ease;
          }
          
          .animate-on-scroll.visible {
              opacity: 1;
              transform: translateY(0);
          }
          
          .loaded section {
              animation: fadeIn 0.8s ease-out forwards;
          }
          
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
      </style>
    `
  );
}

// 初始化视差效果
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".shape, .header-bg");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrollPosition * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  });

  // 给header背景元素添加视差属性
  document.querySelectorAll(".header-bg .shape").forEach((shape, index) => {
    shape.dataset.speed = (0.2 + index * 0.1).toFixed(1);
  });
}

// 初始化按钮悬停效果
function initButtonHoverEffects() {
  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", function (e) {
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;

      const buttonWidth = this.offsetWidth;
      const buttonHeight = this.offsetHeight;

      const xPos = (x / buttonWidth) * 100;
      const yPos = (y / buttonHeight) * 100;

      this.style.background = `radial-gradient(circle at ${xPos}% ${yPos}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%), rgba(255,255,255,0.9)`;
    });

    button.addEventListener("mouseleave", function () {
      this.style.background = "rgba(255,255,255,0.9)";
    });
  });
}

// 初始化返回顶部按钮
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop");

  if (!backToTopButton) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// 添加页面过渡效果
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
      body {
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
      }
      
      body.loaded {
        opacity: 1;
      }
      
      .container {
        transition: transform 0.5s ease-out, opacity 0.5s ease-out;
      }
      
      section:hover .container {
        transform: translateY(-5px);
      }
      
      h2, h3 {
        position: relative;
      }
      
      a:not(.button) {
        position: relative;
        overflow: hidden;
      }
      
      a:not(.button)::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--accent-color);
        transition: width 0.3s ease;
      }
      
      a:not(.button):hover::after {
        width: 100%;
      }
    </style>
  `
);
