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