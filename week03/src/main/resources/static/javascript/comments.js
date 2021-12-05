let MemoId;

$(document).ready(function () {
    getMemosComments()
    drawComments(MemoId);
})

function findIndex(query) {
    for (let i = 0; i < query.length; i++) {
        if (query[i] === '=') {
            return i;
        }
    }
}

function getMemosComments() {
    const IdAndValue = window.location.search
    const index = findIndex(IdAndValue);
    const id = IdAndValue.substring(index + 1,);
    MemoId = id;
    const memoBlock = document.querySelector('.memo-block');

    $.ajax({
        type: "GET",
        url: `/api/memos/${id}`,
        contentType: 'application/json',
        success: function (res) {
            let data = {
                id: res.id,
                title: res.title,
                contents: res.contents,
                createdAt: res.createdAt,
                modifiedAt: res.modifiedAt
            }
            memoBlock.innerHTML = "";
            memoBlock.innerHTML = `
        <div class="${data.id}-memo-template memo-template ${data.createdAt}">
            <div class="${data.id}-memo-header memo-header">                        
                <div class='${data.id}-memo-time create-time'>${data.createdAt}</div>
            </div>
            <div class='${data.id}-memo-title memo-title'>${data.title}</div>
            <div class='${data.id}-memo-contents memo-content'>${data.contents}</div>                        
        </div>`;
        }
    })
}

function closeComments() {
    let commentsModal = document.querySelector('.comments-modal');
    commentsModal.classList.add('hide');
}

function deleteComments(comments_id, memo_id ) {
    console.log(`memo_id: ${memo_id}`);
    $.ajax({
        type: "DELETE",
        url: `/api/comments/${comments_id}`,
        success: function(response) {
            console.log(`comments id ${response} is deleted`);
        }
    })
    window.location.reload();
}

function openEditComments(comments_id) {
    console.log(comments_id);
    let commentsContent = document.getElementsByClassName(`${comments_id}-comments-content`)[0];
    let commentsFix  = document.getElementsByClassName(`${comments_id}-comments-fix`)[0];
    let commentsFixButton = document.getElementsByClassName(`${comments_id}-comments-fix-button`)[0];

    commentsContent.classList.add('hide');
    commentsFix.classList.remove('hide');
    commentsFixButton.classList.remove('hide');
}

function editComments(comments_id, memo_id) {
    let commentsContent = document.getElementsByClassName(`${comments_id}-comments-content`)[0];
    let commentsFix  = document.getElementsByClassName(`${comments_id}-comments-fix`)[0];
    let commentsFixButton = document.getElementsByClassName(`${comments_id}-comments-fix-button`)[0];
    let commentsFixTextArea = document.getElementsByClassName(`${comments_id}-comments-fix-textarea`)[0];

    let fixedComments = commentsFixTextArea.value;

    console.log(`fixedComments의 값: ${fixedComments}`);

    $.ajax({
        type: "PUT",
        url: `/api/comments/${comments_id}`,
        contentType: "application/json",
        data: JSON.stringify({
            comments: `${fixedComments}`
        }),
        success: function(response) {
            console.log(`comments id: ${response} 가 성공적으로 업데이트되었습니다.`);
        }
    })

    commentsContent.classList.remove('hide');
    commentsFix.classList.add('hide');
    commentsFixButton.classList.add('hide');

    window.location.reload();
}

function drawComments(id) {
    let commentsList = document.getElementsByClassName("comments-block")[0];
    commentsList.innerHTML = "";

    $.ajax({
        type: "GET",
        url: `/api/comments/${id}`,
        contentType: "application/json",
        success: function(response) {
            console.log(response.length);
            console.log(response);
            for(let i = 0; i < response.length; i++) {
                let template = `
                    <div class="comments-id">
                        <div class="comments-host">
                            <div>
                                <div class="comments-upper">
                                <i class="far fa-user"></i>
                                    <span class="comments-writer">작성자</span>
                                    <span>${response[i].createdAt}</span>
                                </div>
                            </div>
                            <i class="far fa-edit" onclick="openEditComments(${response[i].id})"></i>                            
                            <i class="far fa-trash-alt" onclick="deleteComments(${response[i].id}, ${id})"></i>
                        </div>
                    <div class="${response[i].id}-comments-content">${response[i].comment}</div>
                    <div class="${response[i].id}-comments-fix hide"><textarea class="${response[i].id}-comments-fix-textarea" cols="30" rows="5">${response[i].comment}</textarea></div>
                    <button class="${response[i].id}-comments-fix-button hide" onclick="editComments(${response[i].id}, ${id})">수정하기</button>
                    </div>
                `
                commentsList.innerHTML += template;
            }
        }
    })
}

function putComments(id) {
    let commentsValue = document.getElementsByClassName(`${id}-m-comments`)[0].value;
    if (commentsValue === '') {
        alert("내용을 입력해주세요.")
        return
    }

    $.ajax({
        type: "POST",
        url: `/api/comments/${id}`,
        contentType: "application/json",
        data: JSON.stringify({
            comments: `${commentsValue}`
        }),
        success: function(response) {
            console.log(response);
            drawComments(id);
        }
    })
}

function makeComments() {
    let id = MemoId;
    let commentsModal = document.querySelector('.comments-modal');
    let commentsContent = document.querySelector('.comments-modal-content');

    commentsContent.innerHTML = `
        <div class="m-textarea"><textarea placeholder="Write a comments ..."  class="${id}-m-comments" id='comments-textarea' cols="25" rows="10"></textarea></div>
        <span class="edit-close-button" onclick="closeComments()">✖</span>
        <span class="edit-button" onclick="putComments(${id})"><i class="far fa-edit"></i></span>`;
    commentsModal.classList.remove('hide');
}