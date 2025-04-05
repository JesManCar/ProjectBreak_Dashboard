const dataPassword = {
    Mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    regExpMayus: /[A-Z]/,
    Minusculas: "abcdefghijklmnopqrstuvwxyz",
    regExpMinus: /[a-z]/,
    Numeros: "0123456789",
    regExpNum: /[0-9]/,
    Simbolos: "!@#$%^&*()-_=+",
    regExpSim: /[!@#$%^&*()\-_=+]/
};

const btnPassword = document.getElementById("btnPassword");
const passDIV = document.getElementById("passGen");
let passLength = 12;

function checkPassword(password) {
    return dataPassword.regExpMayus.test(password) &&
    dataPassword.regExpMinus.test(password) &&
    dataPassword.regExpNum.test(password) &&
    dataPassword.regExpSim.test(password);
}

function generatePassword() {
    let password;
    do{
        password = "";
        const characters = Object.values(dataPassword).join("");
        for (let i = 0; i < passLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
    } while (!checkPassword(password));
    return password;
}


btnPassword.addEventListener("click", () => {
    passLength = document.getElementById("passLength").value;
    if(passLength < 12 || passLength > 50) {
        alert("La contraseña debe tener entre 12 y 50 caracteres.");
        return;
    }
    passDIV.innerHTML = generatePassword()
});
