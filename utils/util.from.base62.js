function fromBase62(code){
    if(code === "0") return 0
    const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let res = 0
    for(let i = 0; i < code.length; i++){
        res = res * 62 + alphabet.indexOf(code[i])
    }

    return res
}

export default fromBase62