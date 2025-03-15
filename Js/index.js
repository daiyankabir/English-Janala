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


        lessonButton.addEventListener("click", function () {

            lessonButton.classList.add("btn-nav-hover");
            const allButtons = document.querySelectorAll("button");
            allButtons.forEach((button) => {
                if (button !== lessonButton) {
                    button.classList.remove("btn-nav-hover");
                }
            });

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
            if (lesson.meaning === null || lesson.meaning === "") {
                lesson.meaning = "Not Available";
            }
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

            const detailsLink = document.createElement("a");
            detailsLink.id = "details";
            detailsLink.href = "#"; // You can set the desired href
            detailsLink.classList.add("bg-blue-100", "px-4", "py-2", "rounded-lg");

            // Create the icon for the details link
            const detailsIcon = document.createElement("i");
            detailsIcon.classList.add("fa-solid", "fa-circle-exclamation");

            // Append the icon to the details link
            detailsLink.appendChild(detailsIcon);

            // Create the second link element with class "bg-blue-200"
            const volumeLink = document.createElement("a");
            volumeLink.href = "#"; // You can set the desired href
            volumeLink.classList.add("bg-blue-200", "px-4", "py-2", "rounded-lg");

            // Create the icon for the volume link
            const volumeIcon = document.createElement("i");
            volumeIcon.classList.add("fa-solid", "fa-volume-high");

            // Append the icon to the volume link
            volumeLink.appendChild(volumeIcon);

            // Append the links to the actionButtons container
            actionButtons.appendChild(detailsLink);
            actionButtons.appendChild(volumeLink);

            lessonItem.appendChild(lessonDetails);
            lessonItem.appendChild(actionButtons);


            lessonGrid.appendChild(lessonItem);
        }
    }
    else {
        lessonContent.style.display = "flex";
        lessonGrid.style.display = "none";
        lessonContent.innerHTML = `<img src="../English-Janala/assets/alert-error.png" alt="" srcset=""><h1 class="text-xl font-bold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1><h1 class="text-4xl font-bold">নেক্সট Lesson এ যান</h1>`;
    }
}


