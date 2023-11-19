const doWorkPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res([1,4,7])
        rej('Avem o eroare boss')
    }, 2000)
})

doWorkPromise.then((res) => {
    console.log(`Success. Res: ${res}`)
}).catch((err) => {
    console.log(`Err: ${err}`)
})