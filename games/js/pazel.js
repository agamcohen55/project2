const puzzlePieces = document.querySelectorAll('.puzzle-piece');

puzzlePieces.forEach(piece => {
    piece.addEventListener('mousedown', startDrag);
    piece.addEventListener('touchstart', startDrag);
});

let activePiece = null;
let initialX, initialY;

function startDrag(e) {
    if (e.type === 'touchstart') {
        e.preventDefault();
        activePiece = e.target;
        initialX = e.touches[0].clientX - activePiece.getBoundingClientRect().left;
        initialY = e.touches[0].clientY - activePiece.getBoundingClientRect().top;
        activePiece.style.zIndex = 1;

        document.addEventListener('touchmove', dragPiece);
        document.addEventListener('touchend', stopDrag);
    } else {
        activePiece = e.target;
        initialX = e.clientX - activePiece.getBoundingClientRect().left;
        initialY = e.clientY - activePiece.getBoundingClientRect().top;
        activePiece.style.zIndex = 1;

        document.addEventListener('mousemove', dragPiece);
        document.addEventListener('mouseup', stopDrag);
    }
}

function dragPiece(e) {
    if (!activePiece) return;

    if (e.type === 'touchmove') {
        const newX = e.touches[0].clientX - initialX;
        const newY = e.touches[0].clientY - initialY;
        activePiece.style.transform = `translate(${newX}px, ${newY}px)`;
    } else {
        const newX = e.clientX - initialX;
        const newY = e.clientY - initialY;
        activePiece.style.transform = `translate(${newX}px, ${newY}px)`;
    }
}

function stopDrag() {
    if (!activePiece) return;

    activePiece.style.zIndex = 0;
    document.removeEventListener('mousemove', dragPiece);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', dragPiece);
    document.removeEventListener('touchend', stopDrag);
    activePiece = null;
}
