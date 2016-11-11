function DOMtoString(document_root) {
    var elements = document_root.getElementsByClassName('graf--p');
    var string = '';
    for (i = 0; i < elements.length; i++) { 
        string += elements[i].innerText;
    }

    var oReq = new XMLHttpRequest();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/bar/foo.txt", true);
    return string;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});