// async/awaitの場合
const promiseFunc = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), 1000)
    })
}

async function asyncFunc() {
    console.log(await promiseFunc(1))
    console.log(await promiseFunc(2))
    console.log(await promiseFunc(3))
}

asyncFunc()
asyncFunc()
