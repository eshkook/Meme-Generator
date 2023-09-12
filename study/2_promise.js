stock = {
    fruits: ['lemon', 'strawberry'],
    toppings: ['chocolate', 'vanila']
}

let is_shop_open = true

let order = (time, work) =>  {
    return new Promise( (resolve, reject) => {
        if (is_shop_open) {
            setTimeout(() => {
                resolve(work)
                             }, time)
        } else {
            reject(console.log('shop is closed'))
                          }
                                              }
                      )
                             }

order(2000, () => console.log(`${stock.fruits[0]} was selected`))                             