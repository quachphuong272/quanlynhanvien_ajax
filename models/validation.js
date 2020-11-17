var Validation = function () {
 this.kiemTraTatCaKyTu = function (value,name,selectorError) { 
    var regexKyTu = /^[A-Za-z ]+$/;
    if(!regexKyTu.test(value)){
        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự !';
        return false;
    } 
    document.querySelector(selectorError).innerHTML =  '';
    return true;
}

this.kiemTraGiaTri = function (value,name,selectorError,minValue,maxValue) { 
    if(Number(value)<minValue || Number(value) > maxValue) {
        document.querySelector(selectorError).innerHTML = name + ` từ ${minValue} đến ${maxValue} !`;
        return false;
    }
    document.querySelector(selectorError).innerHTML =  '';
    return true;
}

this.kiemTraDoDaiChuoi = function (value,name,selectorError,minLength,maxLength){
    if(value.trim().length < minLength || value.trim().length > maxLength) {
        document.querySelector(selectorError).innerHTML = name + ` độ dài ${minLength} - ${maxLength} ký tự`;
        return false;
    }
    document.querySelector(selectorError).innerHTML =  '';
    return true;
}
}