class FormValidator {
    static testCompanyName(value){
    
        var re = /^[a-zA-Z]*$/g;
        return re.test(value) && value.length < 20 && value.length > 0;
    }

    static testCompanyCode(value){
        var re = /^\d{4}$/g;
        return re.test(value) && value.length > 0;
    }

    static testEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}



export default FormValidator;