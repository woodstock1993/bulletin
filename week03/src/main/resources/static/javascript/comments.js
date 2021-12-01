let MemoId;

$(document).ready(function () {
    getMemosComments();
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

function deleteComments(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/memos/${id}`,
        success: function(response) {
            getMemos();
            console.log(`id ${response} is deleted`);
        }
    })
}

function drawComments(id) {
    let commentsList = document.getElementsByClassName("comments-block")[0];
    console.log(commentsList);

    commentsList.innerHTML = "";

    $.ajax({
        type: "GET",
        url: `/api/comments/${id}`,
        contentType: "application/json",
        success: function(response) {
            console.log(response.length);
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
                            <i class="far fa-trash-alt" onclick="deleteComments(${response[i].id}"></i>
                        </div>
                    <div class="comments-content">${response[i].comment}</div>
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