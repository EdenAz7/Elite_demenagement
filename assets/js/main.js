document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAVBAR SCROLL
  ========================== */

  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - navbarHeight,
          behavior: "smooth"
        });
      }
    });
  });


  /* =========================
     FORM SEND TO GOOGLE SHEETS
  ========================== */

  const form = document.getElementById("form");
  const messageBox = document.getElementById("message");
  const submitBtn = document.getElementById("submit-button");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4hvoOO8m9F0zn4RN5TTEBgr9u0qWV2R-EqpzPj57I7rj_0r542x9Fnr89d_5a357o/exec";

  if (form) {

    form.addEventListener("submit", async (e) => {

      e.preventDefault();

      submitBtn.disabled = true;

      if (messageBox) {
        messageBox.style.display = "block";
        messageBox.innerHTML = "Envoi en cours...";
      }

      try {

        const formData = new FormData(form);

        await fetch(SCRIPT_URL, {
          method: "POST",
          body: formData
        });

        // הצלחה → מעבר לדף תודה
        window.location.href = "merci.html";

      } catch (error) {

        console.error(error);

        if (messageBox) {
          messageBox.innerHTML = "Erreur lors de l'envoi.";
        }

        submitBtn.disabled = false;
      }

    });

  }


  /* =========================
     DATE MIN TODAY
  ========================== */

  const dateInput = document.getElementById("date");

  if (dateInput) {

    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }


  /* =========================
     NAVBAR FIXED ON SCROLL
  ========================== */

  if (navbar) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 50) {

        navbar.classList.add("fixed","shrink");
        document.body.style.paddingTop = navbar.offsetHeight + "px";

      } else {

        navbar.classList.remove("fixed","shrink");
        document.body.style.paddingTop = "0";

      }

    });

  }

});
/* =========================
   MOBILE NAVBAR DRAWER
========================== */

const burger = document.querySelector("[data-burger]");
const drawer = document.querySelector("[data-drawer]");
const closeBtn = document.querySelector("[data-close]");

if (burger && drawer) {

  burger.addEventListener("click", () => {
    drawer.classList.add("open");
  });

}

if (closeBtn && drawer) {

  closeBtn.addEventListener("click", () => {
    drawer.classList.remove("open");
  });

}
