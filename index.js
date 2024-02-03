const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function checkEmpty() {
  if (
    fullName.value === "" ||
    email.value === "" ||
    subject.value === "" ||
    message.value === ""
  ) {
    alert("Please fill in all fields");
    return true;
  }
  return false;
}

function checkForBlank() {

  const inputs = [
    { id: "name", class: ".contact-name .check-blank" },
    { id: "email", class: ".contact-email .check-blank" },
    { id: "subject", class: ".contact-subject .check-blank" },
    { id: "message", class: ".contact-message .check-blank" },
  ];

  inputs.forEach((input) => {
    const { id, class: className } = input;
    const inputValue = document.getElementById(id).value;

    if (inputValue === "") {
      document.querySelector(className).style.display = "block";
      document.addEventListener("click", function () {
        document.querySelector(className).style.display = "none";
      });
    }
  });
}

function sendEmail() {
  const bodyMessage =
    "Full Name: " +
    fullName.value +
    "<br><br> Email:  " +
    email.value +
    "<br><br> Subject:  " +
    subject.value +
    "<br><br> Message:  " +
    message.value;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "yigitomerasd@gmail.com",
    Password: "x",
    To: "yigitomerasd@gmail.com",
    From: "yigitomerasd@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then(() => alert("Your message has been sent successfully"));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkForBlank();
  if (!checkEmpty()) {
    sendEmail();
    form.reset();
  }
});

const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const links = document.querySelectorAll(
  ".portfolio-item .img-overlay #magnifying-glass"
);

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    lightbox.classList.add("active");
    const img = document.createElement("img");
    const cancel = document.createElement("button");
    const buttonImg = document.createElement("img");
    buttonImg.src = "images/cancel2-svgrepo-com.svg";
    img.src = link.parentElement.parentElement.previousElementSibling.src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }

    cancel.appendChild(buttonImg);
    lightbox.appendChild(cancel);
    lightbox.appendChild(img);

    lightbox.addEventListener("click", (e) => {
      if (e.target !== img) {
        lightbox.classList.remove("active");
      } else {
        lightbox.classList.add("active");
      }
    });
  });
});

// this is for intersection observer

const navs = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar .navbar-nav ul li a");
const navbarImages = document.querySelectorAll(".navbar .navbar-nav a img");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const targetId = entry.target.id;
        const navbarLink = document.querySelector(`.navbar .navbar-nav ul li a[href="#${targetId}"]`);
        const navbarImage = document.querySelector(`.navbar .navbar-nav a[href="#${targetId}"] img`);

        if (entry.isIntersecting) {
            navbarLink.style.color = "#fff";
            navbarImage.style.filter = "invert(48%) sepia(65%) saturate(638%) hue-rotate(154deg) brightness(95%) contrast(95%)";
        } else {
            navbarLink.style.color = "";
            navbarImage.style.filter = "";
        }
    });
},
{
    threshold: 0.6
}
)

navs.forEach((nav) => {
    observer.observe(nav);
});
