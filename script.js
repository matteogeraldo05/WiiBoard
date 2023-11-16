document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let highestZIndex = 1;

    function updateZIndex(elmnt) {
        elmnt.style.zIndex = highestZIndex++;
    }

    body.addEventListener('mousedown', function (e) {
        if (e.target.tagName.toLowerCase() !== 'textarea') {
            body.style.cursor = 'url("/images/Pointer/grab_small.png") 48 25, auto';
        }
    });

    body.addEventListener('mouseup', function () {
        body.style.cursor = 'url("/images/Pointer/point_small.png") 47 12, auto';
    });

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            if (e.target.tagName.toLowerCase() === 'textarea') {
                return;
            }
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            updateZIndex(elmnt); // Update z-index when element is clicked
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    dragElement(document.getElementById("envelope"));
    dragElement(document.getElementById("message"));
});
