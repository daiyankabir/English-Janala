const faqs = document.querySelectorAll(".faq-item");

faqs.forEach((faq) => {
    faq.addEventListener("click", () => {

        faqs.forEach((item) => {
            if (item !== faq) {
                item.querySelector(".faq-content").style.maxHeight = "0px";
                item.querySelector(".icon").textContent = "+";
            }
        });

        let content = faq.querySelector(".faq-content");
        let icon = faq.querySelector(".icon");

        if (content.style.maxHeight === "0px" || !content.style.maxHeight) {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = "−";
        } else {
            content.style.maxHeight = "0px";
            icon.textContent = "+";
        }
    });
});


const navContainer = document.getElementById("navContainer");
const coursesContainer = document.getElementById("coursesContainer");
const faqContainer = document.getElementById("faqContainer");
const nameInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');

navContainer.style.display = "none";
coursesContainer.style.display = "none";
faqContainer.style.display = "none";

function handleLogin() {
    const name = nameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name) {
        alert("Please enter your name");
        return;
    }


    if (password !== '123456') {
        alert("Incorrect password");
        return;
    }



    nameInput.value = '';
    passwordInput.value = '';
    navContainer.style.display = 'flex';
    coursesContainer.style.display = 'flex';
    faqContainer.style.display = 'flex';
    courses();
    alert("Login successful");
}


function handleLogout() {

    navContainer.style.display = "none";
    coursesContainer.style.display = "none";
    faqContainer.style.display = "none";
    alert("Logout successful");
}


// Function to load all courses
async function courses() {
    const response = await fetch('https://openapi.programming-hero.com/api/levels/all');
    const data = await response.json();
    const lessonContainer = document.getElementById("lessonContainer");


    for (const lesson of data.data) {

        const lessonButton = document.createElement("button");
        lessonButton.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}`;
        lessonButton.id = "btn-" + lesson.level_no;
        lessonButton.classList.add("flex", "justify-center", "items-center", "gap-2", "font-bold", "btn-nav");


        lessonButton.addEventListener('click', () => {
            getLesson(lesson.level_no);
        });


        lessonContainer.appendChild(lessonButton);
    }
}

async function getLesson(lessonNo) {
    const response = await fetch(`https://openapi.programming-hero.com/api/level/${lessonNo}`);
    const data = await response.json();

    const lessonContent = document.getElementById("lessonContent");
    const lessonGrid = document.getElementById("lessonGrid");


    if (data.data.length > 0) {
        lessonContent.style.display = "none";
        lessonGrid.style.display = "grid";

        lessonGrid.innerHTML = '';
        for (const lesson of data.data) {
            const lessonItem = document.createElement("div");
            lessonItem.classList.add("bg-white", "p-16", "rounded-lg", "flex", "flex-col", "justify-center", "items-center", "space-y-12");
            const lessonDetails = document.createElement("div");
            lessonDetails.classList.add("flex", "flex-col", "justify-center", "items-center", "w-full", "space-y-2");
            lessonDetails.innerHTML = `
                <h1 class="text-2xl font-bold">${lesson.word}</h1>
                <h2 class="text-lg">Meaning /Pronounciation</h2>
                <h2 class="text-lg">"${lesson.meaning}/${lesson.pronunciation}"</h2>
            `;
            const actionButtons = document.createElement("div");
            actionButtons.classList.add("flex", "justify-between", "items-center", "w-full");
            actionButtons.innerHTML = `
                <a href="http://" class="bg-blue-100 p-4 rounded-lg">
                    <i class="fa-solid fa-circle-exclamation"></i>
                </a>
                <a href="http://" class="bg-blue-200 p-4 rounded-lg">
                    <i class="fa-solid fa-volume-high"></i>
                </a>
            `;

            lessonItem.appendChild(lessonDetails);
            lessonItem.appendChild(actionButtons);


            lessonGrid.appendChild(lessonItem);
        }
    }
}


