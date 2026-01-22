document.addEventListener("DOMContentLoaded", () => {
  const navBtn = document.querySelector(".nav-btn");
  const menu = document.querySelector("nav ul");
  const icon = navBtn.querySelector("i");

  navBtn.addEventListener("click", () => {
    menu.classList.toggle("active");

    // 아이콘 변경
    if (menu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
});
