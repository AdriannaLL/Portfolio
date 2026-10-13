// ---------- projects section ----------

const projects = [{
        title: "FSC Valet",
        tagline: "Campus parking, simplified",
        description: "Desktop valet parking management app developed as a team project for Farmingdale State College using Java, JavaFX, Spring Boot, Firebase, CSS, Maven, GitHub, and Figma. Focused on frontend development, UI design, navigation, styling, original hand-drawn visual assets and logos, testing, debugging, and integration.",
        tags: ["Java", "JavaFX", "Spring Boot", "Firebase", "Figma"],
        image: "",
        live: "",
        code: ""
    },
    {
        title: "EZ Healthcare",
        tagline: "Health management made easy",
        description: "Developing a user-friendly healthcare management app for older adults, people with disabilities, and less tech-savvy users, with a focus on accessibility, simple navigation, readable interfaces, and greater independence in managing health information.",
        tags: ["UX", "Programming", "Documentation", "React Native", "Expo", "Android Studio", "Figma"],
        image: "",
        live: "",
        code: ""
    },
    {
        title: "Aligned",
        tagline: "Faith and growth in one place",
        description: "A faith-based mobile app for daily inspiration, goals, and personal growth. Built with React Native and Expo.",
        tags: ["React Native", "Expo", "Firebase"],
        image: "",
        live: "",
        code: ""
    },
    {
        title: "Chopped",
        tagline: "Just for the fun of it",
        description: "No big mission, just a reminder not to take life too seriously. Built with React Native.",
        tags: ["React Native", "Expo", "Firebase"],
        image: "",
        live: "",
        code: ""
    }
];

const projectwrap = document.getElementById("projectwrap");

function makeImage(project) {
    if (project.image !== "") {
        return `<img src="${project.image}" alt="${project.title}">`;
    }
    return "";
}

function makeTags(tagList) {
    let html = "";
    for (let i = 0; i < tagList.length; i++) {
        html += `<span class="tag">${tagList[i]}</span>`;
    }
    return html;
}

function makeNumber(index) {
    if (index < 9) {
        return "0" + (index + 1);
    }
    return "" + (index + 1);
}

for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    const card = document.createElement("div");
    card.className = "project_box";

    card.innerHTML = `
        <div class="slate project_img">${makeImage(project)}</div>
        <div class="project_info">
            <div class="project_top">
                <p class="project_num">${makeNumber(i)}</p>
                <p class="project_arrow">&rarr;</p>
            </div>
            <h3>${project.title}</h3>
            <p class="project_tagline">${project.tagline}</p>
            <div class="tagwrap">${makeTags(project.tags)}</div>
        </div>
    `;

    card.addEventListener("click", function() {
        openPopup(i);
    });

    projectwrap.appendChild(card);
}


// Project Popup 

const popup = document.getElementById("popup");

function openPopup(index) {
    const project = projects[index];

    document.getElementById("popupImg").innerHTML = makeImage(project);
    document.getElementById("popupNumber").textContent = "Project " + makeNumber(index);
    document.getElementById("popupTitle").textContent = project.title;
    document.getElementById("popupTagline").textContent = project.tagline;
    document.getElementById("popupDescription").textContent = project.description;
    document.getElementById("popupTags").innerHTML = makeTags(project.tags);

    let links = "";
    if (project.live !== "") {
        links += `<a href="${project.live}" target="_blank" class="button">Live Site</a>`;
    }
    if (project.code !== "") {
        links += `<a href="${project.code}" target="_blank" class="button outline">View Code</a>`;
    }
    if (links === "") {
        links = `<p class="soon">Links coming soon ✦</p>`;
    }
    document.getElementById("popupLinks").innerHTML = links;

    popup.classList.add("show");
}

function closePopup() {
    popup.classList.remove("show");
}

document.getElementById("popupClose").addEventListener("click", closePopup);

popup.addEventListener("click", function(event) {
    if (event.target === popup) {
        closePopup();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closePopup();
    }
});


//  tech carousel 

const carousel = document.getElementById("techCarousel");

// copy the items so the carousel can loop forever
carousel.innerHTML += carousel.innerHTML;

let position = 0;
let speed = 0.5;
let boost = 0;
let paused = false;
let dragging = false;
let startX = 0;
let startScroll = 0;

function moveCarousel() {
    const half = carousel.scrollWidth / 2;

    if (!paused && !dragging) {
        position += speed + boost;
        boost = boost * 0.9;

        if (position >= half) {
            position -= half;
        }
        if (position < 0) {
            position += half;
        }

        carousel.scrollLeft = position;
    } else {
        position = carousel.scrollLeft;
    }

    requestAnimationFrame(moveCarousel);
}

requestAnimationFrame(moveCarousel);

// stop moving when hovering so you can see the zoom
carousel.addEventListener("mouseenter", function() {
    paused = true;
});

carousel.addEventListener("mouseleave", function() {
    paused = false;
    dragging = false;
    carousel.classList.remove("grabbing");
});

// drag with the mouse
carousel.addEventListener("mousedown", function(event) {
    dragging = true;
    startX = event.pageX;
    startScroll = carousel.scrollLeft;
    carousel.classList.add("grabbing");
});

window.addEventListener("mousemove", function(event) {
    if (!dragging) {
        return;
    }

    const half = carousel.scrollWidth / 2;
    let next = startScroll - (event.pageX - startX);

    if (next >= half) {
        next -= half;
        startScroll -= half;
    }
    if (next < 0) {
        next += half;
        startScroll += half;
    }

    carousel.scrollLeft = next;
});

window.addEventListener("mouseup", function() {
    dragging = false;
    carousel.classList.remove("grabbing");
});

// phones can swipe it, so pause while touching
carousel.addEventListener("touchstart", function() {
    paused = true;
});

carousel.addEventListener("touchend", function() {
    paused = false;
});

// arrow buttons give it a push
document.getElementById("techLeft").addEventListener("click", function() {
    boost = -15;
});

document.getElementById("techRight").addEventListener("click", function() {
    boost = 15;
});