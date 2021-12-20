// $(document).ready(function () {
// })

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
    console.log(userId, userPassword);

    $.ajax({
        type: "GET",
        url: "/user/login",
        contentType: 'application/json',
        data: JSON.stringify({
            username: `${userId}`,
            password: `${userPassword}`,
            email: `${email}`
        }),
        success: function (res) {
            console.log(res);
            location.href="index.html";
        }
    })
}