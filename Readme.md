# QUIZ APPLICATION

cerated by using vanilla javascript.

[API](http://5d76bf96515d1a0014085cf9.mockapi.io/quiz) using XMLHTTPRequest.


project is fully customizable :) 

you just need to change the API based on your need ^.^

## Usage

```javascript
// function to get API vaulues
function httpRequest()
{
    var http=new XMLHttpRequest();
    http.open('GET', 'http://5d76bf96515d1a0014085cf9.mockapi.io/quiz',true);
    http.send();
    return http;
}
```

## comment line

No need to worry about understanding of the code.

Comments are included for each and every line.

```javascript
// function to process the received RESPONSE    
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
```
# Application preview

![quiz_1](https://user-images.githubusercontent.com/40564824/100620436-7180ef00-3344-11eb-926d-10b5bca9f807.png)
![quiz_2](https://user-images.githubusercontent.com/40564824/100620467-78a7fd00-3344-11eb-9d5b-010703c8b897.png)

# Alert for confirm to proceed submit

![quiz_3](https://user-images.githubusercontent.com/40564824/100620494-7f367480-3344-11eb-9ad7-c5f402d803b2.png)

# score page using modal box(custom dialog box)

with animation included.

![quiz_4](https://user-images.githubusercontent.com/40564824/100620533-878eaf80-3344-11eb-9ec0-f2803fb3e874.png)


