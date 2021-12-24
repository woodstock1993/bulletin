let totalMemos = 0;
let curLoginUserId = localStorage.getItem('username');

$(document).ready(function () {
    if (getLoginHtml() === "login.html") {
        return;
    }
    if (curLoginUserId !== null) {
        console.log(curLoginUserId);
        console.log(typeof curLoginUserId);
        paintHeader();
    }
    getSomeMemos(0, 5);
    // showLoginUserInfo(curLoginUserId);
    console.log("reload 성공");
})

$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    if(localStorage.getItem('token')) {
        jqXHR.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }
});

function paintHeader() {
    let loginUserWrapper = document.querySelector('.login-user-wrapper');
    loginUserWrapper.innerHTML = "";
    let template = `        
        <div class="login-user-header">
            <div id="header-title-login-user">
            </div>
            <div class="home-btn" onclick="getSomeMemos(0,5)">Home</div>
            <div class="login-user-page" ><div onclick="showMyMemos()">My Page</div></div>
            <div class="login-text">${curLoginUserId}의 게시판</div>
            <div class="logout-text"><a class="user-logout" onclick="deleteSession()" href="index.html">로그아웃</a></div>
        </div>        
    `
    loginUserWrapper.innerHTML += template;
}

function deleteSession() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
}

function findIndex(query) {
    let cnt = 0;
    for (let i = 0; i < query.length; i++) {
        if (query[i] === '/') {
            cnt++;
        }
        if (query[i] === '/' && cnt === 3) {
            return i;
        }
    }
}

function getLoginHtml() {
    const IdAndValue = window.location.href;
    const index = findIndex(IdAndValue);
    return IdAndValue.substring(index + 1,);
}

function showLoginUserInfo(curLoginUserId) {
    let myLoginUserInfo = document.getElementsByClassName('login-text');
    console.log(myLoginUserInfo);
    console.log(myLoginUserInfo.innerHTML);
    let template = `${curLoginUserId}의 메모장`
    myLoginUserInfo.innerHTML = "";
    myLoginUserInfo.innerHTML += template;
}

function paintMemoBox() {
    let memoBox = document.querySelector('.memo-write-block');
    let template = `<button class="create-btn" onclick="showMemoBox()"><i class="fa fa-pencil"></i> 새 글 쓰기</button>`

    memoBox.innerHTML = '';
    memoBox.innerHTML += template;
}

//글상자 여닫는 함수
function showMemoBox() {
    let memoWholeField = document.querySelector('.memo-whole-field');
    if (memoWholeField.style.display === '' || memoWholeField.style.display === 'none') {
        memoWholeField.style.display = 'block';
    } else if (memoWholeField.style.display === 'block') {
        memoWholeField.style.display = 'none';
    }
}

// 글 제목과 내용을 입력하게 하는 함수
function memoBoxValidationCheck() {
    let memoTitle = document.getElementById('memos-title').value;
    let memoContent = document.getElementById('memos-content').value;

    if (memoTitle === '' || memoContent === '') {
        alert('제목 또는 내용을 입력해주세요.');
        return false;
    }
    return true;
}

function showMyMemos() {
    let memoPostField = document.querySelector('.memo-list');
    memoPostField.innerHTML = ''
    $.ajax({
        type: "GET",
        url: "/api/user/memos",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                console.log(`response.length:${response.length}`);
                makeMemos(response[i])
            }
            console.log(`totalMemos: ${totalMemos}`)
        }
    })
}

// 제목과 내용을 기입할 시 DB로 데이터를 보내는 함수
function putMemoTitleAndContent() {
    if (memoBoxValidationCheck() === true) {
        sendMemoData();
    }
}

// pagination 왼쪽 화살표
function leftArrowPagination(currentPage, pageSize, totalPages, totalMemos) {
    if (currentPage === 0) return;
    getSomeMemos(currentPage-1, pageSize)
}

// pagination 오른쪽 화살표
function rightArrowPagination(currentPage, pageSize, totalPages, totalMemos) {
    let currentTotalMemos = (currentPage + 1) * pageSize
    if (currentTotalMemos >= totalMemos) {
        getSomeMemos(currentPage, pageSize)
        return;
    }
    getSomeMemos(currentPage+1, pageSize)
}

// arrow pagination 보여주는 함수
function showArrowPagination(currentPage, pageSize, totalPages, totalMemos) {
    let memoPaginationRear = document.querySelector('.memo-pages-rear');
    let template = `
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" onclick="leftArrowPagination(${currentPage}, ${pageSize}, ${totalPages}, ${totalMemos})"><i class="fas fa-chevron-left"></i></a>
                </li>
                <li class="page-item">
                    <a class="page-link" onclick="rightArrowPagination(${currentPage}, ${pageSize}, ${totalPages}, ${totalMemos})"><i class="fas fa-chevron-right"></i></a>
                </li>
            </ul>
        </nav>
        <div class="memo-pages-tail">
        <span class="memo-offset">${currentPage * pageSize + 1}</span>
        -
        <span class="memo-arrival">${currentPage * pageSize + pageSize}</span>
         of 
         <span>${totalMemos}</span>
         </div>`
    memoPaginationRear.innerHTML = "";
    memoPaginationRear.innerHTML += template;
}

function transCurrentPage() {
    let pageSelect = document.getElementById('memo-pages');
    let memoPagesTail = document.querySelector('.memo-offset');
    let startPage = (parseInt(memoPagesTail.textContent) - 1);
    let currentPage = 0;
    console.log(`startPage: ${startPage}`);

    let pageSize = pageSelect.options[pageSelect.selectedIndex].value;

    pageSize = parseInt(pageSize);
    currentPage = Math.floor(startPage/pageSize);
    getSomeMemos(currentPage, pageSize)
}


// pagination 보여주는 함수
function showMemoPagination(currentPage, pageSize, totalPages, totalMemos) {
    let memoPaginationFront = document.querySelector('.memo-pages-front');
    console.log(`pageSize: ${pageSize}`);
    let template = `
        <div class="memo-pages-head">items per pages</div>
        <select id="memo-pages" onchange="transCurrentPage()">
            <option value="page">select pages</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        `
    memoPaginationFront.innerHTML = "";
    memoPaginationFront.innerHTML += template;
}

//DB로 메모정보 보내는 함수
function sendMemoData() {
    let memoTitle = document.getElementById('memos-title').value;
    let memoContent = document.getElementById('memos-content').value;
    let loginUserName = curLoginUserId;
    console.log(loginUserName);

    $.ajax({
        type: "POST",
        url: "/api/memos",
        contentType: 'application/json',
        data: JSON.stringify({
            title: `${memoTitle}`,
            contents: `${memoContent}`,
            userId: `${loginUserName}`
            ,
        }),
        success: function (res) {
            console.log(res);
        },
        error: function(request, status, error) {
            console.log(request, status);
            alert("ERROR: "+request.status + "\n" + "회원 가입 후 글 작성이 가능합니다.");
        }
    })
}

//정해진 개수만큼 글상자 만드는 함수
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
                    <a href="comments.html?id=${data.id}"><i class="far fa-comment"></i></a>
                </div>
            </div>
            <div class='${data.id}-memo-title memo-title'>${data.title}</div>
            <div class='${data.id}-memo-contents memo-content'>${data.contents}</div>                        
        </div>
    `
    memoPostField.innerHTML += template
}

// 지정된 개수 만큼 메모를 보여주는 함수
function getSomeMemos(currentPage, pageSize) {
    let memoPostField = document.querySelector('.memo-list');
    memoPostField.innerHTML = ''
    let field = 'id';
    let totalPages;
    let totalMemos;
    $.ajax({
        type: "GET",
        url: `/paginationAndSort/${currentPage}/${pageSize}/${field}`,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            paintMemoBox();
            let res = response.response.content;
            console.log(res);
            totalMemos = response.response.totalElements;
            totalPages = response.response.totalPages;
            console.log('getSomeMemos 무사동작',totalMemos, totalPages);
            //순서 중요
            showArrowPagination(currentPage, pageSize, totalPages, totalMemos);
            for (let i = 0; i < res.length; i++) {
                makeMemos(res[i])
            }
            showMemoPagination(currentPage, pageSize, totalPages, totalMemos);
        }
    })
}

// 전체 메모를 그려주는 함수
// function getMemos() {
//     let memoPostField = document.querySelector('.memo-list');
//     memoPostField.innerHTML = ''
//     $.ajax({
//         type: "GET",
//         url: "/api/memos",
//         contentType: 'application/json; charset=utf-8',
//         success: function (response) {
//             for (let i = 0; i < response.length; i++) {
//                 console.log(`response.length:${response.length}`);
//                 makeMemos(response[i])
//             }
//             console.log(`totalMemos: ${totalMemos}`)
//         }
//     })
// }

// 편집하는 메모상자를 열어주는 함수
function openEditMemo(id) {
    let modal = document.querySelector('.edit-modal');
    let modalEditInput = document.querySelector('.modal-edit-input');
    let title = document.getElementsByClassName(`${id}-memo-title`)[0].textContent;
    let content = document.getElementsByClassName(`${id}-memo-contents`)[0].textContent;

    modalEditInput.innerHTML =
        `<input type="text" value='${title}' class="${id}-m-title" id='m-title'>
            <div class="m-textarea"><textarea placeholder="Write a content ..."  class="${id}-m-content" id='m-textarea' cols="25" rows="10">${content}
            </textarea></div>
            <span class="edit-close-button" onclick="closeEditMemo()">✖</span>
            <span class="edit-button" onclick="editMemo(${id})"><i class="far fa-edit"></i></span>`;

    modal.classList.remove("hidden");
}

// 편집하는 메모상자를 닫는 함수
function closeEditMemo() {
    let modal = document.querySelector('.edit-modal');
    modal.classList.add('hidden');
}

// 메모를 수정해서 데이터를 DB로 보내는 함수
function editMemo(id) {
    let title = document.getElementsByClassName(`${id}-m-title`)[0].value;
    let content = document.getElementsByClassName(`${id}-m-content`)[0].value;

    let pageStart = Number(document.querySelector('.memo-offset').textContent);
    let pageEnd = Number(document.querySelector('.memo-arrival').textContent);

    let pageSize = pageEnd - pageStart + 1;
    let currentPage = (pageEnd / pageSize) -1;

    let data = {'title': title, 'contents': content};

    $.ajax({
        type: "PUT",
        url: `/api/memos/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (res) {
            closeEditMemo();
            getSomeMemos(currentPage, pageSize)
            console.log(`id: ${res}번 게시물이 수정되었습니다.`);
        }
    });
}

// 메모를 삭제하는 함수
function deleteMemo(id) {
    let pageStart = Number(document.querySelector('.memo-offset').textContent);
    let pageEnd = Number(document.querySelector('.memo-arrival').textContent);

    let pageSize = pageEnd - pageStart + 1;
    let currentPage = (pageEnd / pageSize) -1;

    $.ajax({
        type: "DELETE",
        url: `/api/memos/${id}`,
        success: function (response) {
            getSomeMemos(currentPage, pageSize)
            console.log(`id ${response} is deleted`);
        }
    })
}

//여기서 부터는 login 관련 함수

function isEmail(value) {
    let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(value);
}

function isPassword(asValue) {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

    return regExp.test(asValue);
}

function isPassword(asValue) {
    let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

// 회원 가입 검증 함수
function loginValid() {
    let userId = document.querySelector('.login-username-signup').value;
    let userPassword = document.querySelector('.login-password-signup').value;
    let email = document.querySelector('.login-email-signup').value;
    console.log(userId, userPassword, email);

    if (userId === "" || userPassword === "" || email === "") {
        alert("id password email 모두 입력하시오");
        return false;
    }
}

function saveLoginInfo() {
    loginValid();
    let username = document.querySelector('.login-username-signup').value;
    let password =  document.querySelector('.login-password-signup').value;
    let email = document.querySelector('.login-email-signup').value;

    $.ajax({
        type: "POST",
        url: "/user/signup",
        contentType: 'application/json',
        data: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
            email: `${email}`
        }),
        success: function (res) {
            console.log(res);
            alert('회원가입 되셨습니다.')
            location.href="login.html";
        }
    })
}

// 로그인 검증 함수
function loginValid2() {
    let userId = document.querySelector('.login-username').value;
    let userPassword = document.querySelector('.login-password').value;
    if (userId === "" || userPassword === "") {
        alert("아이디와 패스워드를 모두 입력하세요.")
    }
    return false;

}

function sendUserInfo() {
    loginValid2();
    let userId = document.querySelector('.login-username').value;
    let userPassword = document.querySelector('.login-password').value;

    $.ajax({
        type: "POST",
        url: "/user/login",
        contentType: 'application/json',
        data: JSON.stringify({
            username: `${userId}`,
            password: `${userPassword}`,
        }),
        success: function (res) {
            console.log(res);
            localStorage.setItem("token", res['token']);
            localStorage.setItem("username", res['username']);
            alert("로그인 되셨습니다.");
            location.href = "index.html"
        }
    })
}