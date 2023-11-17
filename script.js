document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let highestZIndex = 1;

    function updateZIndex(elmnt) {
        elmnt.style.zIndex = highestZIndex++;
    }

    body.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains('message')) {
            body.style.cursor = 'url("/images/Pointer/grab_small.png") 48 25, auto';
        }
    });

    body.addEventListener('mouseup', function () {
        body.style.cursor = 'url("/images/Pointer/point_small.png") 47 12, auto';
    });

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.querySelector(`.${elmnt.classList[0]}header`)) {
            document.querySelector(`.${elmnt.classList[0]}header`).onmousedown = dragMouseDown;
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

            // Calculate the new position
            let newTop = elmnt.offsetTop - pos2;
            let newLeft = elmnt.offsetLeft - pos1;

            // Check boundaries to prevent moving outside the screen
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
        }
    }

    dragElement(document.querySelector("#messageBox01"));
    dragElement(document.querySelector("#messageBox02"));
    dragElement(document.querySelector("#messageBox03"));
    dragElement(document.querySelector("#messageBox04"));
    dragElement(document.querySelector("#messageBox05"));
    dragElement(document.querySelector("#messageBox06"));
});
