function init(){
    charLimit();
}

function charLimit(){
    const charLimitTip = document.getElementById('char-count');
    const charLen = 280;
    const input = document.getElementById('txt-message');
    const btnPost = document.getElementById('btn-post');

    charLimitTip.textContent = `0 / ${charLen}`;

    input.addEventListener('input', function(){
        let charCount = input.value.length;
        charLimitTip.textContent = `${charCount} / ${charLen}`;
        if (charCount > charLen){
            input.style.borderColor = '#ff2851';
            charLimitTip.style.color = '#ff2851';
            btnPost.classList.add('disabled');
        } else {
            input.style.borderColor = '#31821b';
            charLimitTip.style.color = '#31821b';
            btnPost.classList.remove('disabled');
        }
    })
}

init();
