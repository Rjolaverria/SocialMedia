const regex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;

module.exports.validateRegistration = (
    username,
    email,
    password,
    passwordConfirm
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username can't be empty";
    }
    if (email.trim() === '') {
        errors.email = "Email can't be empty";
    } else if (!email.match(regex)) {
        errors.email = 'Please provide valid email';
    }
    if (password === '') {
        errors.password = "Password can't be empty";
    } else if (password !== passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLogin = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username can't be empty";
    }
    if (password === '') {
        errors.password = "Password can't be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
