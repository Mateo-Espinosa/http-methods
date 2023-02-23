const express = require('express');
//const morgan = require('morgan');
const fs = require ('fs');



app = express();
let productos = [];
app.use(express.json())

//consulta prdouctos
app.get('/producto', (req, res) =>
{
    res.json(productos)
});

app.post('/producto' , (req, res)=> {
    const newproducto = {
        id: productos.length +1, ...req.body
    }
    
    productos.push (newproducto);
    console.log('object successfully happened')

    res.send (newproducto)
})



//update(Actualizar)
app.put('/producto/:id', (req, res) =>{
    const productofound = productos.find((product)=> product.id === parseInt(req.params.id))

    if (!productofound) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    const newdata = req.body; //

     productos = productos.map(p=>p.id === parseInt(req.params.id) ? {...p, ...newdata} : p)

    res.json({
        message:"Product updated successfully"
    })
});
//delete
app.delete('/producto/:id', (req, res) => {
    const productofound = productos.find((product)=> product.id === parseInt(req.params.id))
    if(!productofound) return res.status(404).json({
        product: 'product not found'
    })
    const newproducto =productos.filter(productos => productos.id !== parseInt(req.params.id))
    res.json(newproducto)
});

//Consultar por id

app.get('/producto/:id', (req, res) => {
    const productofound = productos.find ((product) => product.id===parseInt(req.params.id))
    res.json(productofound)

    if(!productofound) return res.status(404).json({
        product:'product not found'
    })

    res.json(productofound)
});

const host = 'localhost';
const port = 3000;
app.listen(port,host, ()=>{
    console.log(`Server is running on http://${host}:${port}`)
});
app.use((req, res )=> {


    res.send("Hay un error")
    
})



