var xhr = new XMLHttpRequest();

xhr.open("GET", "textfile.txt", true);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        var = xhr.status;

        if ((status >= 200 && status < 300) ||
            status === 304) {
            alert(xhr.responseText);
    } else {
        alert("Something bad happened.");
    }

        
    }
};

xhr.send(null);

alert(xhr.responseText + "This is outside of event handler.")