$(document).ready(function() {
    var envelope = $("#envelope");
    var btn_open = $("#open");
    var btn_reset = $("#reset");

    envelope.click(function() {
        open();
    });
    btn_open.click(function() {
        open();
    });
    btn_reset.click(function() {
        close();
    });

    function open() {
        envelope.addClass("open")
            .removeClass("close");
    }

    function close() {
        envelope.addClass("close")
            .removeClass("open");
    }

})

const letter = document.querySelector('.letter');

let isDown = false;
let startY;
let scrollTop;

letter.addEventListener('mousedown', (e) => {
    isDown = true;
    letter.classList.add('active');
    startY = e.pageY - letter.offsetTop;
    scrollTop = letter.scrollTop;
    letter.style.cursor = 'grabbing';
});

letter.addEventListener('mouseleave', () => {
    isDown = false;
    letter.style.cursor = 'grab';
});

letter.addEventListener('mouseup', () => {
    isDown = false;
    letter.style.cursor = 'grab';
});

letter.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - letter.offsetTop;
    const walk = (y - startY) * 2; // Scroll speed
    letter.scrollTop = scrollTop - walk;
});