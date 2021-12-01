$(document).ready(function() {
    getMemos();
})


function showMemoBox() {
    let memoWholeField = document.querySelector('.memo-whole-field');
    if (memoWholeField.style.display === '' || memoWholeField.style.display === 'none') {
        memoWholeField.style.display = 'block';
    } else if (memoWholeField.style.display === 'block') {
        memoWholeField.style.display = 'none';
    }
}

function sendMemoData() {
    let memoTitle = document.getElementById('memos-title').value;
    let memoContent = document.getElementById('memos-content').value;

    $.ajax({
        type: "POST",
        url: "/api/memos",
        contentType: 'application/json',
        data: JSON.stringify({
            title: `${memoTitle}`,
            contents: `${memoContent}`,
        }),
        success: function (res) {
            window.location.reload();
        }
    })
}

function makeMemos(res) {
    let memoPostField = document.querySelector('.memo-list');
    let data = {
        id: res.id,
        title: res.title,
        contents: res.contents,
        createdAt: res.createdAt,
        modifiedAt: res.modifiedAt
    }
    let template = `
        <div class="${data.id}-memo-template memo-template ${data.createdAt}">
            <div class="${data.id}-memo-header memo-header">                        
                <div class='${data.id}-memo-time create-time'>${data.createdAt}</div>
                <div>
                    <i class="far fa-trash-alt" onclick="deleteMemo(${data.id})"></i>
                    <i class="far fa-edit" onclick="openEditMemo(${data.id})"></i>
                    <a href="html/comments.html?id=${data.id}"><i class="far fa-comment"></i></a>
                </div>
            </div>
            <div class='${data.id}-memo-title memo-title'>${data.title}</div>
            <div class='${data.id}-memo-contents memo-content'>${data.contents}</div>                        
        </div>
    `
    memoPostField.innerHTML += template
}

function getMemos() {
    let memoPostField = document.querySelector('.memo-list');
    memoPostField.innerHTML = ''
    $.ajax({
        type: "GET",
        url: "/api/memos",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                makeMemos(response[i])
            }
        }
    })
}

function memoBoxValidationCheck() {
    let memoTitle = document.getElementById('memos-title').value;
    let memoContent = document.getElementById('memos-content').value;

    if (memoTitle === '' || memoContent === '') {
        alert('제목 또는 내용을 입력해주세요.');
        return false;
    }
    return true;
}

function putMemoTitleAndContent() {
    if (memoBoxValidationCheck() === true) {
        sendMemoData();
    }
}

function openEditMemo(id) {
    let modal = document.querySelector('.edit-modal');
    let modalContent = document.querySelector('.edit-modal-content')
    let title = document.getElementsByClassName(`${id}-memo-title`)[0].textContent;
    let content = document.getElementsByClassName(`${id}-memo-contents`)[0].textContent;

    modalContent.innerHTML =
        `<input type="text" value='${title}' class="${id}-m-title" id='m-title'>
            <div class="m-textarea"><textarea placeholder="Write a content ..."  class="${id}-m-content" id='m-textarea' cols="25" rows="10">${content}
            </textarea></div>
            <span class="edit-close-button" onclick="closeEditMemo()">✖</span>
            <span class="edit-button" onclick="editMemo(${id})"><i class="far fa-edit"></i></span>`;

    modal.classList.remove("hidden");
}

function editMemo(id) {
    let title = document.getElementsByClassName(`${id}-m-title`)[0].value;
    let content = document.getElementsByClassName(`${id}-m-content`)[0].value;
    let data = {'title': title, 'contents': content};

    $.ajax({
        type: "PUT",
        url: `/api/memos/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(res) {
            window.location.reload();
            console.log(`id: ${res}번 게시물이 수정되었습니다.`);
        }
    });
}

function closeEditMemo() {
    let modal = document.querySelector('.edit-modal');
    modal.classList.add('hidden');
    getMemos();
}

function deleteMemo(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/memos/${id}`,
        success: function(response) {
            getMemos();
            console.log(`id ${response} is deleted`);
        }
    })
}
