const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateYear = (year, res) =>{
    if (isNaN(year) || year <= 0) {
        return res.status(400).send('El año debe ser un número positivo.');
    }
}

export default {
    validateEmail,
    validateYear
}