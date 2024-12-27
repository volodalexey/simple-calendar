function onClick(e) {
    if (e.target.tagName === 'TD') {
        e.target.classList.toggle('selected')
    }
}

document.addEventListener('click', onClick)