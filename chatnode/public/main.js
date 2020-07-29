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

//ação para detectar envio de mensagem no chat
textInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) { //tecla 13 é o Enter
        //limpa as borda sem nada da msg
        let txt = textInput.value.trim();
        //limpa o inpur pra ficar proximo pro proximo envio
        textInput.value = '';
        if(txt !== ''){
            addMessage('msg', username, txt);
            socket.emit('send-msg', txt);           
        }
    }
});

//função responsável por exibir mensagem de ingressão e regressão do chat
function addMessage(type, user, msg) {
    //pega o container das mensagens do chat
    let ul = document.querySelector('.chatList');

    switch(type){
        case 'status':
            ul.innerHTML += `<li class="m-status">${msg}</li>`;
        break;
        case 'msg':
            if(user === username){
                ul.innerHTML += `<li class="m-txt"><span class="me">${user}</span> ${msg}</li>`;
            }else{
                ul.innerHTML += `<li class="m-txt"><span>${user}</span> ${msg}</li>`;
            }
        break;
    }
}


//listener do user-ok
socket.on('user-ok', (connectedUsers) => {

    //esconde tela de login, mostra tela do chat
    loginPage.style.display = 'none';
    chatPage.style.display = 'flex';

    //dá foco no campo de texto do chat
    textInput.focus();

    //avisa que o usuário se conectou
    addMessage('status', null, `Conectado`);

    //lista de usuários receber os usuários conectados
    userList = connectedUsers;

    //renderiza a lista de usuários na tela
    renderUserList();
});

socket.on('list-update', (data) => {

    if(data.joined){
        //avisa que o usuário entrou na conversa
        addMessage('status', null, `${data.joined} entrou na conversa!`);
    }

    if(data.left){
        //avisa que o usuário saiu da conversa
        addMessage('status', null, `${data.left} entrou na conversa!`);
    }

    // a lista de usuários se torna a lista atualizada, com o novo usuário
    userList = data.list;

    // renderiza a lista pra todo mundo que não é o usuário que acabou de entrar
    renderUserList();
});

socket.on('show-msg', (data) => {
    addMessage('msg', data.username, data.message);
})