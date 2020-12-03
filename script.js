var content=document.getElementById('content');
var submit=document.getElementById('submit')
var score=document.getElementById('score')
var popup=document.querySelector('.popup')
var main=document.querySelector('.main')
var popupbtn=document.querySelector('#popupbtn')
var answerArray=[],selectedAnswer=[]; 

// function to get API values
function httpRequest()
{
    var http=new XMLHttpRequest();
    http.open('GET', 'http://5d76bf96515d1a0014085cf9.mockapi.io/quiz',true);
    http.send();
    return http;
}

// function to process the received RESONSE    
function httpResponse()
{
    var http=httpRequest();
    
    http.onreadystatechange=function state()
    {
        // check the readystate i.e response received
        if(this.readyState==4)
        {
            var responseArray=JSON.parse(this.responseText);
            // pass responseArray to function(create HTML elements)
            newElement(responseArray);
            
        }
        // check for the status 429 (Too many responses)
        else if(this.status==429)
        {
            alert("Too many requests!!!");
            window.location.reload();
        }
        else{
            console.log(this.status)
        }
    }
}


// creating HTML elements dynamically
function newElement(responseArray)
{
    // store a processed response 
    const array=responseArray;
    //to add questions 
     for(var i=0;i<responseArray.length;i++)
     {
        var qdiv=document.createElement('div');
        // set class name
        qdiv.className="question " +responseArray[i].id
        // add div to maindiv
        content.appendChild(qdiv);
        var list=document.createElement('li');
        // store option length from responsearray
        var optLength=responseArray[i].options;
        // set content(question) to list element
        list.innerHTML=(responseArray[i].id+"."+responseArray[i].question);
        // set id to list element
        list.id=responseArray[i].id;
        // add child element to div
        qdiv.appendChild(list);
        // console.log(responseArray[i])
        // to add option
        for(j=0;j<optLength.length;j++)
        {
            // create input element to add radio button
            var option=document.createElement('input');
            var br=document.createElement('br');
            var label=document.createElement('label');
            option.id="radio";
            option.name="answer"+i;
            option.type="radio";
            list.appendChild(br)
            var optionValue=optLength[j];
            // set option to radio button
            option.value=optionValue;
            label.innerHTML=optionValue;
            // add option to div element
            list.appendChild(option);
            list.appendChild(label);
            
        }
        // add answer to the array
        answerArray[i]=responseArray[i].answer;
     }
}

// submit operation
submit.addEventListener('click',function()
{
    // confirm for submition
    if(confirm("Answered all the question CONFIRN to submit"))
    {

    // set display 
    popup.style.display="block";
    // add blur background for main div
    main.style.filter="blur(2px)";
    // to get number of question
    var totalQues=content.childElementCount;
    // loop to check answers
        for(var i=0;i<totalQues;i++)
        {
            var name="answer"+i;
            var answer=document.getElementsByName(name);
            // get the selected value from radio option
                for(j = 0; j < answer.length; j++)
                { 
                    if(answer[j].checked) 
                    {
                        // "i" is option number
                        // selected option is stores in an selected array
                        selectedAnswer[i]=j+1;
                    }
                }
        }
        // verify answer
        // store result in sount variable
        var count=0;
        answerArray.forEach(verify);
        function verify(item,index,arr)
        {
            // check for correct answer by matching selected and answer array
            if(arr[index]==selectedAnswer[index])
            {
                // console.log("answer"+arr[index]+" "+"selected"+selectedAnswer[index])
                count+=1;
            }
            // set the final score to the HTML ELEMENT
            score.innerHTML=count+"/5";
        }
    }
    
})
// custom dialog buttom
popupbtn.addEventListener('click',function(){
    // set dusply style
    popup.style.display="none";
    // add blur to the main div
    main.style.filter="blur(0px)";
    window.location.reload();
    
})
// funtion to initiate API request
httpRequest();
httpResponse();



