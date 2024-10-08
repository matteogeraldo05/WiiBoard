document.addEventListener("DOMContentLoaded", function () {
    setTimeout(fadeOutOverlay, 1000); // Adjust the delay to control when the fadeout starts
    setInterval(updateClock, 1000); // Update the clock every second

    fetchMessages(); // Fetch existing messages from the server
});

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    hours = hours % 12 || 12;

    const digitImages = [
        "0.png", "1.png", "2.png", "3.png", "4.png",
        "5.png", "6.png", "7.png", "8.png", "9.png"
    ];

    const hourDigitFilename = digitImages[parseInt(hours / 10)];
    const hourDigitFilenameOnes = digitImages[hours % 10];
    const minuteDigitFilename = digitImages[parseInt(minutes / 10)];
    const minuteDigitFilenameOnes = digitImages[minutes % 10];

    const semicolonFilename = "semi_colon.png";

    const htmlContent = `
    <img src="images/Menu/${hourDigitFilename}" alt="${hours / 10}">
    <img src="images/Menu/${hourDigitFilenameOnes}" alt="${hours % 10}">
    <img src="images/Menu/${semicolonFilename}" alt=":">
    <img src="images/Menu/${minuteDigitFilename}" alt="${minutes / 10}">
    <img src="images/Menu/${minuteDigitFilenameOnes}" alt="${minutes % 10}">
`;

    clockElement.innerHTML = htmlContent;
}

function fadeOutOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.opacity = 0; // Set opacity to 0 for fading effect
    setTimeout(() => {
        overlay.style.display = 'none'; // Hide the overlay after the transition
    }, 1500); // Adjust the duration to match the transition duration
}

function fetchMessages() {
    fetch('http://localhost:3000/messages')
        .then(response => response.json())
        .then(data => {
            data.forEach(msg => {
                const messageBox = document.querySelector(`#messageBox${msg.id}`);
                if (messageBox) {
                    messageBox.querySelector('.textarea').value = msg.text;
                    messageBox.style.top = `${msg.top}px`;
                    messageBox.style.left = `${msg.left}px`;
                }
            });
        });
}

function saveMessage(id, text, top, left) {
    const message = { id, text, top, left };
    fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    })
    .then(response => response.json())
    .then(data => console.log('Message saved:', data));
}

document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let highestZIndex = 1;

    function updateZIndex(elmnt) {
        elmnt.style.zIndex = highestZIndex++;
    }

    body.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains('message')) {
            body.style.cursor = 'url("images/Pointer/grab_small.png") 20 20, auto';
        }
    });

    body.addEventListener('mouseup', function () {
        body.style.cursor = 'url("images/Pointer/point_small.png") 20 8, auto';
    });

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = document.querySelector(`.${elmnt.classList[0]}header`);

        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            if (e.target.classList.contains('textarea')) {
                return;
            }
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            updateZIndex(elmnt);
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            let newTop = elmnt.offsetTop - pos2;
            let newLeft = elmnt.offsetLeft - pos1;

            if (newTop >= 0 && newTop + elmnt.clientHeight <= window.innerHeight) {
                elmnt.style.top = newTop + "px";
            }

            if (newLeft >= 0 && newLeft + elmnt.clientWidth <= window.innerWidth) {
                elmnt.style.left = newLeft + "px";
            }
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;

            // Save the position and content after dragging
            const id = elmnt.id.replace('messageBox', '');
            const text = elmnt.querySelector('.textarea').value;
            const top = elmnt.offsetTop;
            const left = elmnt.offsetLeft;
            saveMessage(id, text, top, left);
        }
    }

    // Initialize drag for each message box
    dragElement(document.querySelector("#messageBox01"));
    dragElement(document.querySelector("#messageBox02"));
    dragElement(document.querySelector("#messageBox03"));
    dragElement(document.querySelector("#messageBox04"));
    dragElement(document.querySelector("#messageBox05"));
    dragElement(document.querySelector("#messageBox06"));
});

function playSecondAudio() {
    document.getElementById('firstAudio').style.display = 'none';
    document.getElementById('secondAudio').style.display = 'block';
}
