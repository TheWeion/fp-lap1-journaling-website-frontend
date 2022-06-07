import { pipelineTopicExpression } from '@babel/types';
import { createPicker } from 'picmo';

function init(){
    charLimit();
    emojiWidget();
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

function emojiWidget() {
    let msgInput = document.querySelector('#txt-message');
    const btnEmoji =  document.querySelector('#btn-emoji');
    const btnCloseWidget =  document.querySelector('#btn-close-widget');
    // The picker must have a root element to insert itself into
    const rootElement = document.querySelector('#emoji-picker');
    const picker = createPicker({ rootElement });

    rootElement.hidden = true;
    btnCloseWidget.hidden = true;

    btnEmoji.addEventListener('click', () => {
        rootElement.hidden = false;
        btnCloseWidget.hidden = false;
        picker.addEventListener('emoji:select', (selection) => {
            msgInput.value += selection.emoji;
        });
    })

    btnCloseWidget.addEventListener('click', () => {
        picker.destroy();
        emojiWidget();
    });

}

init();
