var score = 0;
var currentAns = ""

const start = async()=>{
    const selectBox = document.querySelector('#category').value;
    const gamescreen =  document.getElementById('gamescreen');
    const startscren =  document.getElementById('startscren');
    const questionFeild = document.getElementById('qh4');
    const setCat = document.getElementById('catid');

    if(selectBox === 'category'){
        // alert('please select category')
        showAlert('please select category')
    }else{
        console.log('started game for category: ', selectBox);
        setCat.innerHTML = selectBox;
        //fetch api token.
        try {
            const Res = await fetch('./token.json');
            const data = await Res.json();

            startscren.classList.add('scrrenoff');
            gamescreen.classList.remove('scrrenoff');

            $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/trivia?category=' + selectBox,
                headers: { 'X-Api-Key':data.apiKey},
                contentType: 'application/json',
                success: function(result) {
                    console.log(result[0].answer);
                    questionFeild.innerHTML = result[0].question;
                    currentAns = result[0].answer
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText);
                }
            });
    
        } catch (error) {
            console.log('api key error: ',error);
        }
    }
}

const checkAns = ()=>{
    const userans = document.getElementById('answerInput').value;
    const gamescreen =  document.getElementById('gamescreen');
    const startscren =  document.getElementById('startscren');
    console.log(userans);
    console.log(currentAns);
    if(userans !== null){
        if(userans == currentAns){
            showAlert('your answer is correct..');
            score++
            document.querySelector('#scoreid').innerHTML = score;
            userans.innerHTML= 'Loading next question...';


        }else{
            showAlert(`your answer is incorrect the answer was ${currentAns}`);
            score--
            document.querySelector('#scoreid').innerHTML = score;
        }
        if(score < 0){
            showAlert(`game over try again`);
            score = 0;
            document.querySelector('#scoreid').innerHTML = score;
            clearGame();
            
            startscren.classList.remove('scrrenoff');
            gamescreen.classList.add('scrrenoff');
        }else{
            start();
        }
    }

}

const clearGame =()=>{
    document.getElementById('answerInput').value = '';
    document.getElementById('scoreid').innerHTML = '0';
    document.getElementById('qh4').innerHTML = '';


}

function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none';
}