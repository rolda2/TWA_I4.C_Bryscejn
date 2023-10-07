let textInput = document.getElementById('textInput');
let stav = document.getElementById('stav');

textInput.addEventListener('input', function() {
    if (textInput.value.trim() === '') {
        document.body.style.backgroundColor = 'white';
        stav.innerText = 'Čeká na vstup';
    } else {
        document.body.style.backgroundColor = 'red';
        stav.innerText = 'Ukládání';
    

        if (window.timer) {
            clearTimeout(window.timer);
        }

        window.timer = setTimeout(function () {
            document.body.style.backgroundColor = 'green';
            stav.innerText = 'Uloženo';
        }, 5000)
    }
});