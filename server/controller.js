
module.exports = {
    getInventory: (req, res) => {
        const db = req.app.get('db')

        db.get_inventory().then(products => {
            res.status(200).send(products)
        }).catch(err => {
            console.log(err)
        })
    }, 
    addProduct: (req, res) => {
        const {image, name, price} = req.body
        const db = req.app.get('db')

        db.create_product([image, name, price]).then(products => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
        })
    }, 
    deleteProduct: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.delete_product(id)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    updateProduct: (req, res) => {
        const {id} = req.params
        const {image, name, price} = req.body

        const db = req.app.get('db')

        db.update_product([id, image, name, price]).then(() => {
            res.sendStatus(200)
        }).catch(err => res.status(500).send(err))
    }
}