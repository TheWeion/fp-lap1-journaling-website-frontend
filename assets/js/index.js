//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    
import { pipelineTopicExpression } from '@babel/types';
import { createPicker } from 'picmo';

//
// ─── GLOBALS ────────────────────────────────────────────────────────────────────
//

    
let htmlCode = ``;

//
// ─── INITIALISE JSON AND UX PROCESSING ──────────────────────────────────────────
//

    
function init(){
    getAllMessages();
    emojiWidget();
    gifWidget();
    charLimit();
}

//
// ─── HELPER: CHARACTER LIMITER ──────────────────────────────────────────────────
//

// BUG: Defect in place since [commit: d6f35050a299373adcc601d31c21aee20b325b35]

function charLimit(){
    const charLimitTip = document.getElementById('char-count');
    const charLen = 280;
    const input = document.getElementById('message');
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

// function gifWidget(){
//     let gifPicker = document.querySelector('#gif-picker');
//     const btnGif =  document.querySelector('#btn-emoji');
//     const btnCloseWidget =  document.querySelector('.btn-gif-close');
//     gifPicker.hidden = true;
//     btnCloseWidget.hidden = true;

//     btnGif.addEventListener('click', () => {
//         gifPicker.hidden = false;
//         btnCloseWidget.hidden = false;
//     });

//     btnCloseWidget.addEventListener('click', () => {
//         gifWidget();
//     });
// }

//
// ─── HELPER: EMOJI WIDGET CONSTRUCTOR USING PICMO API ───────────────────────────────────────────
//

 
function emojiWidget() {
    let msgInput = document.querySelector('#message');
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

//
// ─── API: GIPHY ─────────────────────────────────────────────────────────────────
//

let apiKey = "b9sS2zu1yWj2MBP18CydijPEgIiybHNl";

// you will need to get your own API KEY
// https://developers.giphy.com/dashboard/

document.addEventListener("DOMContentLoaded", gifInit);
function gifInit() {
    document.getElementById("btn-search").addEventListener("click", e => {
        e.preventDefault(); //to stop the page reload
        let gifLimit = 12;
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${gifLimit}&q=`;
        let str = document.getElementById("txt-gif-search").value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(content => {
                //  data, pagination, meta

                console.log(content.data);
                console.log("META", content.meta);
                for (let i = 0; i < gifLimit; i++) {
                    let fig = document.createElement("figure");
                    let img = document.createElement("img");
                    let fc = document.createElement("figcaption");
                    img.id = `gif-${str}-${content.data[i].id}`;
                    img.classList.add('gif-img');
                    img.src = content.data[i].images.original.url;
                    img.alt = content.data[i].title;
                    fc.textContent = content.data[i].title;
                    fig.appendChild(img);
                    let out = document.querySelector(".gif-container");
                    out.insertAdjacentElement("afterbegin", fig);
                    gifSelect(img.id);
                }
                document.querySelector("#txt-gif-search").value = "";
            })
            .catch(err => {
              console.error(err);
            });
        });
      }

//
// ─── HELPER: GIF SELECTOR ───────────────────────────────────────────────────────
//

    
let gifUrl = ''
function gifSelect(imgId){
    document.getElementById(imgId).addEventListener("click", e => {
        let url = e.target.src.split('giphy.gif')[0]+'giphy.gif';
        console.log(url);
        gifUrl = url;
    });
    return;
}

//
// ─── EVENT: SUBMIT POST ─────────────────────────────────────────────────────────
//

const submitForm = document.querySelector('#frm-compose-post');

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const postData = {
        post: e.target.message.value,
        gif: gifUrl,
    }

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch('https://ctrl-alt-elite-java-journal.herokuapp.com/', options)
        .then(r => r.json())
        .catch(console.warn)
})

function getAllMessages(){
    fetch('https://ctrl-alt-elite-java-journal.herokuapp.com/status')
        .then(r => r.json())
        .then(appendMessages)
        .catch(console.warn)
};

function appendMessages(e){
    e.forEach(function(msgObj){
        htmlCode += `
            <div class="col my-4" id="">
                <article class="card h-100 p-3">
                    <img class="card-img-top" src="${msgObj.gif}" alt="">
                    <div class="card-body">
                        <p class="card-text">${msgObj.post}</p>
                        <p class="timestamp">${msgObj.date}</p>
                        <div class="reacts rounded-3 d-flex justify-content-between">
                            <div class="react-like">${msgObj.reaction.thumb}</div>
                            <div class="react-heart">${msgObj.reaction.heart}</div>
                            <div class="react-java">${msgObj.reaction.java}</div>
                        </div>
                    </div>
                    <hr>
                    <div class="text-center">
                        <button class="btn btn-outline-primary bi-chat-dots" type="button" role="button" title="View Post" onclick="window.open('status.html?id=${msgObj.id}')">
                            <i class="comment-count">${msgObj.comments.length}</i>
                        </button>
                        <!-- TODO: Add Reaction GIF API and log to JSON  -->
                        <button class="btn-react btn btn-outline-primary bi-emoji-heart-eyes" type="button" role="button" title="React" onclick=""></button>
                    </div>
                </article>
            </div>
        `;

        const postCards = document.querySelector('#post-list');
        postCards.innerHTML = htmlCode;
    });
    ReactConstructor();
};

//
// ─── HELPER: REACTION POPOVER CONSTRUCTOR ───────────────────────────────────────
//

    
function ReactConstructor() {
    $('.btn-react').popover({
        html        : true, 
        placement   : 'auto',
        title       : 'React to this post.',
        content     : `
        <button type="button" role="button" title="Like React" onclick="" class="btn btn-reactLike btn-outline-secondary"></button>
            
        <button type="button" role="button" title="Heart React" onclick="" class="btn btn-reactHeart btn-outline-secondary"></button>
    
        <button type="button" role="button" title="Coffee React" onclick="" class="btn btn-reactJava btn-outline-secondary"></button>
        `,

        sanitize    : false
    })
}

init();
