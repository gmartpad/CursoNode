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

//função que renderiza usuários na tela
function renderUserList(){
    let ul = document.querySelector('.userList');
    ul.innerHTML = '';

    userList.forEach(i => {
        ul.innerHTML += `<li>${i}</li>`;
    })
}

//ação para receber o nome do loginNameInput e entrar na tela de chat
loginInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) { //tecla 13 é o Enter
        let name = loginInput.value.trim();
        if(name !== ''){
            username = name;
            document.title = `Chat (${username})`;

            //emitter do join-request
            socket.emit('join-request', username);
        }
    }
});

//listener do user-ok
socket.on('user-ok', (connectedUsers) => {

    //esconde tela de login, mostra tela do chat
    loginPage.style.display = 'none';
    chatPage.style.display = 'flex';

    //dá foco no campo de texto do chat
    textInput.focus();

    //lista de usuários receber os usuários conectados
    userList = connectedUsers;

    //renderiza a lista de usuários na tela
    renderUserList();
});