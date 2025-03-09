//select element
let counter = document.querySelector(".count");
let timeCOUNT = document.querySelector(".counter")
 let space=document.querySelectorAll(".bullts .spans span")
let divSpan = document.querySelector(".bullts .spans");
let btn = document.querySelector(".button");
let result = document.querySelector(".result");
let divQ = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let questionArea = document.querySelector(".quiz-area");
//zero
let currentIndex = 0;
let rightAnswer = 0;
let countTime;
function getJson() {
     var jsn = new XMLHttpRequest();
    jsn.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let object = JSON.parse(this.responseText);
            let ser = object.length;
            //counter question
            count(ser);
            //question and counter
            addQuestion(object[currentIndex], ser);
            //time
            counterTime(10, ser);
            //click button
            btn.onclick = function () {
                // to know right choose as i want it in json 
                let rightAnswers = object[currentIndex]["right-answer"];
                currentIndex++;
                choose(rightAnswers, ser);
                // end question
              
                     //to remove question old and add new question
               questionArea.innerHTML = "";
                answerArea.innerHTML = "";
                //to add new question
                addQuestion(object[currentIndex], ser);
                //handle span
                handleSpan();
                //show result
                resultShow(ser); 
                //time
                clearInterval(countTime);
            counterTime(10, ser);

            }

// console.log(object); 
// console.log(ser)
        }
    };
    jsn.open("GET", "app.json", true);
    jsn.send();
}

getJson();

function count(num) {
    counter.innerHTML = num;
    //create span
    for (let i = 0; i < num; i++) {
        //to creat number of num 
        let spans = document.createElement("span");
        //append span to spans
        divSpan.appendChild(spans);
        if (i === 0) {
            spans.className = "up";
        }
    }
}

//question and counter
    function addQuestion(obj, nom) {
        if (currentIndex < nom) {
         let title = document.createElement("h2");
    let text = document.createTextNode(obj.title);
    title.appendChild(text);
    document.querySelector(".quiz-area").appendChild(title);
   
    //create answer question in json 
    for (let i = 0; i < 4; i++) {
        //creat div for answer
   let answerContainer = document.createElement("div");

        answerContainer.className = "answer";
        //create radio
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "question";
        radio.id = `answer-${i}`;
        radio.dataset.answer =obj[`answer-${i+1}`];
        // choice first answer
        if (i === 0) {
            radio.checked = true;
        }
        //create label for choice answer 
        let answerText = document.createElement("label");
        answerText.htmlFor = `answer-${i}`;
        //text answer in json 
        let textAN = document.createTextNode(obj[`answer-${i+1}`]);
        answerText.appendChild(textAN);
        answerContainer.appendChild(radio);
        answerContainer.appendChild(answerText);
        document.querySelector(".answer-area").appendChild(answerContainer);
    } 
    }
    
}
//correct answer
function choose(ans, count) {
    let answers = document.getElementsByName("question");
      let chooseAnswer;
    for (let i = 0; i < answers.length; i++){
        if (answers[i].checked) {
            chooseAnswer = answers[i].dataset.answer;
        }
    }
    if (chooseAnswer === ans) {
        rightAnswer++;
        console.log("good")
}
  
}
//handle span
function handleSpan() {
    let hand = document.querySelectorAll(".bullts .spans span");
    let arr = Array.from(hand);
    arr.forEach((span, index)=>{
        if (currentIndex === index) {
            span.className = "up";
        };
    });
};
//show result
function resultShow(count) {
        if (currentIndex === count) {
            divQ.remove();
            btn.remove();
            timeCOUNT.remove();
            answerArea.remove();
            questionArea.remove();
            divSpan.remove();
            counter.remove();

            console.log("end")
            if (rightAnswer === (count / 2) && rightAnswer < count) {
                result.innerHTML=`<span class="good">you make good jop correct:${rightAnswer} for ${count}</span>`
            } else if (rightAnswer < (count / 2)) {
                result.innerHTML=`<span class="bad">you make bad jop correct:${rightAnswer} for ${count}</span>`
                                
            } else {
                result.innerHTML=`<span class="perfect">you make perfect jop correct:${rightAnswer} </span>`
                
            }
            result.style.marginTop = "20px";
            result.style.padding = "30px";
            result.style.background = "white";
            result.style.color = "#3305de";
            result.style.fontSize = "20px";
        }
}
//counter time 
function counterTime(time, ser) {

    if (currentIndex < ser) {
        let minute, second;
        countTime = setInterval(function () {
            minute = parseInt(time / 60);
            second = parseInt(time % 60);
            minute = minute < 10 ? `0${minute}` : minute;
            second = second < 10 ? `0${second}` : second;
            timeCOUNT.innerHTML = `${minute}:${second}`;
            if (--time < 0) {
                clearInterval(countTime);
                btn.onclick();
            }
            
        },1000)
    }
    }
