let order = (time, work) =>    {
    return new Promise( (resolve, reject) => {
        if (is_shop_open && fruit_index < stock.fruits.length && topping_index < stock.toppings.length) {
            setTimeout(() => {
                resolve(work())
                             }, time)
        } else {
            reject('shop is closed or either fruit or topping doesn\'t exist')
                          }
                                              }
                      )
                               }

let stock = {
fruits: ['lemon', 'strawberry'],
toppings: ['chocolate', 'vanila']
}
let is_shop_open = true
let fruit_index = 0
let topping_index = 4

// assuming preparing ice cream is the following process one by one(no asynchronous actions):
// 1. taking the fruit out of fridge takes 2 seconds
// 2. reporting that the process itself begins takes 0 seconds
// 3. cutting the fruit takes 3 seconds
// 4. add topping takes 1 second

order(2000, () => `${stock.fruits[fruit_index]} was selected`)       
.then(console.log)
.then( ()=> {
    return order(0, () => console.log('production has started'))  
})
.then( ()=>  order(3000, () => console.log(`${stock.fruits[fruit_index]} was cut`)))
.then( ()=>  order(1000, () => console.log(`${stock.toppings[topping_index]} was added`)))
.catch(d => {
    console.log(d)
    console.log('customer left')
})

