const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a + b);
        }, 2000)
    })
}

add(1, 2).then((sum) => { console.log(sum); }).catch((err) => { console.log(err); })