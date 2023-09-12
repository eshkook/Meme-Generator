stock = {
    fruits: ['lemon', 'strawberry'],
    toppings: ['chocolate', 'vanila']
}

let is_shop_open = true

let order = (time, work) =>    {
    return new Promise( (resolve, reject) => {
        if (is_shop_open) {
            setTimeout(() => {
                resolve(work())
                             }, time)
        } else {
            reject('shop is closed')
                          }
                                              }
                      )
                               }

fruit_index = 0
// assuming preparing ice cream is the following process one by one(no asynchronous actions):
// 1. select the fruit takes 2 seconds
// 2. reporting that the process itself begins takes 0 seconds
// 3. cutting the fruit takes 3 seconds
order(2000, () => `${stock.fruits[fruit_index]} was selected`)       
.then(console.log)
.then( ()=> {
    return order(0, () => console.log('production has started'))  
})
.then( ()=>  order(3000, () => console.log(`${stock.fruits[fruit_index]} was cut`)))
.catch(console.log)

