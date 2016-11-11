function DOMtoString(document_root) {
    var key = '2fedeefb340bc05e8a8fc09564a685db';
    var elements = document_root.getElementsByClassName('graf--p');
    var string = '';
    for (i = 0; i < elements.length; i++) { 
        string += elements[i].innerText;
    }
    return string;
}

chrome.runtime.sendMessage({
    action: 'getSource',
    source: DOMtoString(document)
});