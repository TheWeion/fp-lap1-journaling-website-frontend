(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


},{}],2:[function(require,module,exports){
"use strict";

// import "../css/style.css";
let htmlCode = ``;

function init() {
  charLimit();
  getAllMessages();
}

function charLimit() {
  const charLimitTip = document.getElementById('char-count');
  const charLen = 280;
  const input = document.getElementById('txt-message');
  const btnPost = document.getElementById('btn-post');
  charLimitTip.textContent = `0 / ${charLen}`;
  input.addEventListener('input', function () {
    let charCount = input.value.length;
    charLimitTip.textContent = `${charCount} / ${charLen}`;

    if (charCount > charLen) {
      input.style.borderColor = '#ff2851';
      charLimitTip.style.color = '#ff2851';
      btnPost.classList.add('disabled');
    } else {
      input.style.borderColor = '#31821b';
      charLimitTip.style.color = '#31821b';
      btnPost.classList.remove('disabled');
    }
  });
}

function getAllMessages() {
  fetch('https://ctrl-alt-elite-java-journal.herokuapp.com/status').then(r => r.json()).then(appendMessages).catch(console.warn);
}

;

function appendMessages(e) {
  e.forEach(function (msgObj) {
    htmlCode += `
            <div class="col my-4">
                <article class="card h-100 p-3">
                    <img src="${msgObj.gif}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${msgObj.post}</p>
                        <div class="reacts rounded-3 d-flex justify-content-between">
                            <div class="react-like"></div>
                            <div class="react-heart"></div>
                            <div class="react-java"></div>
                        </div>
                    </div>
                    <hr>
                    <div class="text-center">
                        <button class="btn btn-outline-primary bi-chat-dots" type="button" role="button" title="View Post" onclick="window.open('status.html')">
                            <i class="comment-count"></i>
                        </button>
                        <!-- TODO: Add Reaction GIF API and log to JSON  -->
                        <button class="btn-react btn btn-outline-primary bi-emoji-heart-eyes" type="button" role="button" title="React" onclick=""></button>
                    </div>
                </article>
            </div>
        `; // console.log(htmlCode)

    const postCards = document.querySelector('#post-list');
    postCards.innerHTML = htmlCode;
  });
  ReactConstructor();
}

;

function ReactConstructor() {
  $('.btn-react').popover({
    html: true,
    placement: 'auto',
    title: 'React to this post.',
    content: `
        <button type="button" role="button" title="Like React" onclick="" class="btn btn-reactLike btn-outline-secondary"></button>
            
        <button type="button" role="button" title="Heart React" onclick="" class="btn btn-reactHeart btn-outline-secondary"></button>
    
        <button type="button" role="button" title="Coffee React" onclick="" class="btn btn-reactJava btn-outline-secondary"></button>
        `,
    sanitize: false
  });
}

init();

},{}]},{},[2,1]);
