//listener no client (tbm tem que ter no server)
const socket = io();

//variavel pra armazenar seu usuário
let username = '';

//variavel pra armazenar lista dos usuários do chat
let userList = [];

//variavel pra campos principais
let loginPage = document.querySelector('#loginPage');
let chatPage = document.querySelector('#chatPage');

let loginInput = document.querySelector('#loginNameInput');
let textInput = document.querySelector('#chatTextInput');

//certificar que, inicialmente, pagina de login tá flex e pagina do chat tá none
loginPage.style.display = 'flex';
chatPage.style.display = 'none';

//ação para receber o nome do loginNameInput e entrar na tela de chat
loginInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        let name = loginInput.value.trim();
        if(name != ''){
            username = name;
            document.title = `Chat (${username})`;
        }
    }
});