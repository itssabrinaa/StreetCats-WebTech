export function isPwdValid(pwd){
    // Min 8 char, almeno una lettera, almeno un numero
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(pwd);
}