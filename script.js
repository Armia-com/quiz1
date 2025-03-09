fetch("app.json")
  .then(response => response.json()) 
  .then(object => {
      let ser = object.length;
      // counter question
      count(ser);
      // question and counter
      addQuestion(object[currentIndex], ser);
      // time
      counterTime(10, ser);
      
      // click button
      btn.onclick = function () {
          // to know right choice as I want it in JSON 
          let rightAnswers = object[currentIndex]["right-answer"];
          currentIndex++;
          choose(rightAnswers, ser);
          
          // remove old question and add new question
          questionArea.innerHTML = "";
          answerArea.innerHTML = "";
          
          // add new question
          addQuestion(object[currentIndex], ser);
          
          // handle span
          handleSpan();
          
          // show result
          resultShow(ser);
          
          // time
          clearInterval(countTime);
          counterTime(10, ser);
      }
  })
  .catch(error => console.error("خطأ في تحميل الملف:", error));
