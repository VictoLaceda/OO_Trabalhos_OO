function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        
        } else {
        console.log('XHR request failed.');
        }
    }
};

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.example.com/data.json', true);
xhr.onreadystatechange = basico;
xhr.send();