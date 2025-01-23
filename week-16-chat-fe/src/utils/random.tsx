
export function random() {

    const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    let code = "";

    for (let i = 0; i < 5; i++) {

        let i = Math.floor(Math.random() * characters.length);
        code += characters[i];
    }

    return code;
}