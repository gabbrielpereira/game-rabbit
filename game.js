let rabbit;
let background;
var game;
let position = 0;
let isJumping = false;
var tempo = 0;

function startGame(){
    rabbit = document.querySelector('.rabbit');
    background = document.querySelector('.background');
    game = 0;
}

function handleKeyup(event){
    if(game == 0 && event.keyCode == 32){
        tempo = 0;
        game = 1
        createHats();
    }
    if(game == 1 && event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;
    
    let upInterval = setInterval(() => {
       if(position >= 150){
            clearInterval(upInterval);

        //Descendo
        let downInterval = setInterval(() => {
            if(position <= 0) {
                clearInterval(downInterval);
                isJumping = false;
            } else {
                position -= 20;
                rabbit.style.bottom = position + 'px';
            }
        }, 20);
       } else { //Subindo
            position += 20;
            rabbit.style.bottom = position + 'px';
       }
    }, 20);
}

function createHats(){
    const hats = document.createElement('div');
    let hatsPosition = 1500;
    let randomTime = Math.random()*4000;

    hats.classList.add('hats');
    hats.style.left = hatsPosition + 'px';
    background.appendChild(hats);

    setTimeout(createHats, randomTime);


        let tempoInterval = setInterval(()=>{
            if(game == 1){
                 tempo = tempo + 0.100;
                 placar.textContent = "Placar: " + tempo.toFixed(2)*10;
            }
            if(game == 0){
                clearInterval(tempoInterval);
            }    
            }, 100);  
        
    

    let leftInterval = setInterval(() => {

        if(hatsPosition < - 50){
            clearInterval(leftInterval);
            background.removeChild(hats);
        } else if(hatsPosition > 0 && hatsPosition < 50 && position < 50){
            clearInterval(leftInterval);
            let pontos = placar.textContent; 
            document.body.innerHTML = `<div class = "game-over"> <h2>Fim de Jogo</h2></br> <img src="./imgs/coelho-cartola.png">  </br> ${pontos} </div>`; 
            game = 0;   
        } else{
            hatsPosition -=10;
            hats.style.left = hatsPosition + 'px';
        }
    }, 20);


}

startGame();
document.addEventListener('keyup', handleKeyup);  
const placar = document.createElement('div');
placar.classList.add('placar');
background.appendChild(placar);
placar.textContent = "Aperte 'espaço' para começar e pular";