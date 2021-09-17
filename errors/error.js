module.exports.registerError = (err) => {
    let errors = {
        "pseudo": "",
        "email": "",
        "password": ""
    }

    if (err.message.includes("pseudo")) {
        errors.pseudo = " Pseudo  déjà pris "
    }
    if (err.message.includes("password")) {
        errors.password = "Le mot de passe doit contenir 6 caractères ou plus"
    }
    if (err.message.includes("email")) {
        errors.email = "Email Incorrect"
    }
    return errors
}

module.exports.loginError = (err) => {

    let errors = {
        "email": "",
        "password": ""
    }

    if (err.message.includes("Password")) {
        errors.password = "Mot de passe incorrect"
    }
    if (err.message.includes("Email")) {
        errors.email = "Email incorrect"
    }

    return errors
}
