function toBase62(num){
    if(num === 0) return "0"
    const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let res = []
    while(num > 0){
        let rem = num%62
        res.push(alphabet[rem])
        num = Math.floor(num / 62)
    }

    return res.reverse().join("")
}

export default toBase62