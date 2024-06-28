document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    const resultMessage = document.querySelector('.result-message');
    const userSelection = document.querySelector('.user-selection');
    const frame1 = document.querySelector('.game-buttons');
    const frame2 = document.querySelector('.result-board');
    const container = document.querySelector('.main-con');
    const win_screen = document.querySelector('.win-screen');
    const play_again = document.querySelector('.play-again');
    const computerSelection = document.querySelector('.computer-selection');
    let rules_btn = document.getElementById('Rules');
    let next = document.getElementById('next');
    let user_score = document.getElementById('your-score');
    let pc_score = document.getElementById('pc-score');
    let div = document.getElementById('game-rules');
    let against = document.getElementById('against');
    let play_again2 = document.getElementById('play-again2');
    //rules button popup
    rules_btn.addEventListener('click',()=>{if(div.style.display!=="block"){div.style.display="block";}else{div.style.display="none";}});
    play_again.addEventListener('click',()=>{if(frame1.style.display!=="block"){frame1.style.display="block";frame2.style.display="none";next.style.display="none";}else{frame1.style.display="none";}});
    play_again2.addEventListener('click',()=>{
        if(frame1.style.display!=="block" && container.style.display!=="block")
            {frame1.style.display="block";container.style.display="block";frame2.style.display="none";next.style.display="none";win_screen.style.display="none";}
        else{frame1.style.display="none";frame1.style.display="none";}
        });
    next.addEventListener('click',()=>{if(win_screen.style.display!=="block"){win_screen.style.display="block";container.style.display="none";next.style.display="none";}else{win_screen.style.display="none";}});
    //play_again2.addEventListener('click',()=>{if(container.style.display!=="block"){container.style.display="block";win_screen.style.display="none";next.style.display="none";}else{container.style.display="none";}});

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const userChoice = event.target.getAttribute('data-choice');
            playGame(userChoice);
            console.log(userChoice);
            if(frame2.style.display!=="block"){frame2.style.display="block";frame1.style.display="none";}else{frame2.style.display="none";}
        });
    });

    function playGame(userChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        const result = determineWinner(userChoice, computerChoice);

        updateChoiceDisplay(userSelection, userChoice);
        updateChoiceDisplay(computerSelection, computerChoice);

        resultMessage.textContent = result;
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            computerSelection.removeAttribute('id');
            userSelection.removeAttribute('id');
            against.style.display='none'
            return 'TIE UP';
        }
        
        if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            handleUserWin()
            next.style.display="block";
            against.style.display='block'
            
            return 'YOU WIN';
            
        } else {
            
            handlePcWin()
            against.style.display='block'
            return 'YOU LOST';
        }
    }

    function updateChoiceDisplay(buttonElement, choice) {
        buttonElement.className = `button ${choice}`;
        // console.log(`button ${choice}`);
        // console.log(buttonElement);
    }

    let userScore = parseInt(localStorage.getItem('userScore')) || 0;
    let pcScore = parseInt(localStorage.getItem('pcScore')) || 0;
    user_score.textContent = userScore;
    pc_score.textContent = pcScore;

    function handleUserWin() { 
        userScore++;
        
        localStorage.setItem('userScore', userScore);
        user_score.textContent = userScore;
        userSelection.setAttribute('id','win');
        computerSelection.removeAttribute('id');
    }
    
    function handlePcWin() {
        pcScore++;
        
        localStorage.setItem('pcScore', pcScore);
        pc_score.textContent = pcScore;
        computerSelection.setAttribute('id','win');
        userSelection.removeAttribute('id');
    }


});