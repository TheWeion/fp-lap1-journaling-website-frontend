//
// ─── REACTION POPOVER ───────────────────────────────────────────────────────────
//

$(document).ready(function(){
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
  });


