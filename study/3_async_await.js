let stock = {
    fruits: ['lemon', 'strawberry'],
    toppings: ['chocolate', 'vanila']
}
let is_shop_open = true

let topping_choice = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('which topping do you want?'))
                         }, 3000)
                                             })
}

async function kitchen() {
    console.log(1)
    console.log(2)
    console.log(3)
    await topping_choice()
    console.log(4)
    console.log(5)

}

kitchen()

console.log('clean dishes')
console.log('clean tables')

















// async function order() {
//     try {
//         await console.log(11)
//     }
//     catch(error) {
//         console.log('abc not real', error)
//     }
//     finally {console.log('run anyway')}
// }

// order()
