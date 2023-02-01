const valid = (name, email, password, cf_password) => {
    if(!name || !email || !password)
    return 'vui long nhap tat ca thong tin.'

    if(!validateEmail(email))
    return 'email khong hop le.'

    if(password.length < 6)
    return 'Password phai co tu 6 ky tu tro len.'

    if(password !== cf_password)
    return 'Password khong trung khop.'
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid;