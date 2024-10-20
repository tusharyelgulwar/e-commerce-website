document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close, #close-btn');

    modal.style.display = 'block';

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        sessionStorage.clear();
    });
});
