module.exports.encrypt = function(content, passcode) {
    var encrypted = [];
    for(var i = 0  ; i < content.length ; i++) {
        var passOffset = i%passcode.length ;
        var calAscii = (content.charCodeAt(i)+passcode.charCodeAt(passOffset));
        encrypted.push(calAscii);
    }
    return encrypted ;
}

module.exports.decrypt = function(content, passcode) {
    var decrypt1 = [];
    var decrypted = ''
    var codesArr = (content instanceof Array) ? content: JSON.parse(content);
    for(var i = 0  ; i < codesArr.length ; i++) {
        var passOffset = i%passcode.length ;
        var calAscii = (codesArr[i]-passcode.charCodeAt(passOffset))
        decrypt1.push(calAscii)
    }
    for(var i = 0 ; i < decrypt1.length ; i++) {
        var ch = String.fromCharCode(decrypt1[i]); 
        decrypted += ch
    }
    return decrypted
}