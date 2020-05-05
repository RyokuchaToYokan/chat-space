$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `
        <div class="main-chat__message-list__box">
          <div class="main-chat__message-list__box__upload">
            <div class="main-chat__message-list__box__upload__name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__box__upload__date">
              ${message.created_at}
            </div>
          </div>
        <div class="main-chat__message-list__message">
          <p class="main-chat__message-list__message">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } else {
      var html =
       `
          <div class="main-chat__message-list__box">
            <div class="main-chat__message-list__box__upload">
              <div class="main-chat__message-list__box__upload__name">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__box__upload__date">
                ${message.created_at}
              </div>
            </div>
          <div class="main-chat__message-list__message">
            <p class="main-chat__message-list__message">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".main-chat__message-list").append(html);         //※注：appendは送るデータをどこの要素(boxレベル)に入れるか指定
      $("form")[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});   // 反映先viewを指定
      $('.main-chat__message-form__send-box').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  })
});