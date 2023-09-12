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

order(2000, () => `${stock.fruits[0]} was selected`)       
.then(console.log)
.then( ()=> {
    return order(1000, () => console.log('production has started'))  
})
.catch(console.log)

