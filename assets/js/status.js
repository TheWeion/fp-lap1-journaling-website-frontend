//
// ─── GLOBALS ────────────────────────────────────────────────────────────────────
//

let htmlCode = ''

// ────────────────────────────────────────────────────────────────────────────────

getMessage();

//
// ─── HELPER: GET URL PARAMS ─────────────────────────────────────────────────────
//

    
function getUrlData() {
    let url_str = window.location.href;
    let url = new URL(url_str);
    let search_params = url.searchParams; 

    let id = search_params.get('id');

    return id;
}

//
// ─── HELPER: READ JSON TO GET POST OUTPUT ───────────────────────────────────────
//

    
function getMessage(){
    fetch(`https://ctrl-alt-elite-java-journal.herokuapp.com/status/${getUrlData()}`)
        .then(r => r.json())
        .then(appendMessage)
        .catch(console.warn)
};

function appendMessage(e){
    e.forEach(function(msgObj){
        htmlCode += `
        <div class="post-render col my-4">
          <article class="card h-100 p-3">
            <img class="card-img-top" src="${msgObj.gif}" alt="">
            <div class="card-body">
              <button class="btn-back btn btn-danger bi-arrow-left-circle" type="button" role="button" title="Go Back" onclick="window.location='https://ctrl-alt-elite-java-journal.netlify.app'"></button>
              <hr>
              <p class="card-text">${msgObj.post}</p>
              <p class="timestamp">${msgObj.date}</p>
              <div class="reacts rounded-3 d-flex justify-content-between">
                <div class="react-like">${msgObj.reaction.thumb}</div>
                <div class="react-heart">${msgObj.reaction.heart}</div>
                <div class="react-java">${msgObj.reaction.java}</div>
              </div>
              <button class="btn-react btn btn-outline-primary bi-emoji-heart-eyes" type="button" role="button" title="React" onclick=""></button>
            </div>
            <hr>
            <div class="comments">
              <!-- TODO: Insert Comments Here.-->
            </div>
            <hr>
            <div class="container">
              <form id="frm-compose-reply">
                <label for="message" class="form-label">Reply</label>
                <textarea class="form-control" name="message" id="message" rows="3"></textarea>
                <p id="char-count"></p>
                <hr>
                <div id="msg-widget">
                    <button id="btn-gif" type="button" role="button" title="GIF" class="btn btn-outline-primary bi-filetype-gif"></button>
                    <button id="btn-emoji" type="button" role="button" title="Emoji" class="btn btn-outline-primary bi-emoji-laughing"></button>
                    <!-- TODO: Add GIF select API  -->
                    <button id="btn-post" type="submit" class="btn btn-primary">Submit</button>
                </div>
                <br>
                <button id="btn-close-widget" type="button" role="button" title="Close Emoji Picker" class="btn-gif-close btn btn-danger bi-x-lg"></button>
                <div id="emoji-picker"></div>
                <br>
            </form>
            </div>
            <br>
          </article>
        </div>
        `;

        const postCards = document.querySelector('.container');
        postCards.innerHTML = htmlCode;
    });
    ReactConstructor();
};

