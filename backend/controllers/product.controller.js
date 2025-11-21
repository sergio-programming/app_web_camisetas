import { Product } from "../models/product.model";

export const getProducts = async (req, res) => {
    try {
        
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(400).json({ message : 'No se encuentran productos registrados actualmente' });
        }

        return res.status(200).json(products);

    } catch (error) {
        console.error('Error al obtener los productos: ', error);
        return res.status(500).json({ message : 'Error interno del servidor' });
    }
};

export const getProductById = async (req, res) => {
    try {
        
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message : 'No se encuentra un producto registrado con ese id' });
        }

        return res.status(200).json(product);

    } catch (error) {
        console.error('Error al obtener el producto: ', error);
        return res.status(500).json({ message : 'Error interno del servidor' });
    }
};

export const createProduct = async (req, res) => {
    try {
        
        const { codigo, descripcion, precio, categoria } = req.body;

        if (!codigo || !descripcion || !precio || !categoria) {
            return res.status(400).json({ message : 'Los campos requeridos son obligatorios' });
        }

        if (precio < 0) {
            return res.status(400).json({ message : 'No se permiten valores negativos para el precio' });
        }

        if (categoria !== "Camisetas" && categoria !== "Discos") {
            return res.status(400).json({ message : 'La categoría enviada no es válida' });
        }

        const productByCode = await Product.findOne({ codigo : codigo });

        if (productByCode) {
            return res.status(409).json({ message : `Ya existe un producto registrado con el codigo ${codigo}` });
        }

        const newProduct = new Product ({
            codigo,
            descripcion,
            precio,
            categoria
        });

        const createdProduct = await newProduct.save();

        return res.status(201).json({
            message : 'El producto se ha creado correctamente',
            product : createdProduct
        });

    } catch (error) {
        console.error('Error al crear el producto: ', error);
        return res.status(500).json({ message : 'Error interno del servidor' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { codigo, descripcion, precio, categoria } = req.body;

        const product = await Product.findById(id);

        if (codigo) {
            const productByCode = await Product.findOne({ codigo : codigo });
            if (productByCode) {
                return res.status(409).json({ message : `Ya existe un producto registrado con el codigo ${codigo}` });
            }
        }

        if (precio && precio < 0) {
            return res.status(400).json({ message : 'No se permiten valores negativos para el precio' });
        }

        if (categoria && !["Camisetas", "Discos"].includes(categoria)) {
            return res.status(400).json({ message : 'La categoría enviada no es válida' });
        }

        if (codigo !== undefined) product.codigo = codigo;
        if (descripcion !== undefined) product.descripcion = descripcion;
        if (precio !== undefined) product.precio = precio;
        if (categoria !== undefined) product.categoria = categoria;

        await product.save();

        return res.status(200).json({
            message : 'El producto se ha actualizado correctamente',
            product: product
        });

    } catch (error) {
        console.error('Error al actualizar el producto: ', error);
        return res.status(500).json({ message : 'Error interno del servidor' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message : 'No se encuentra un producto registrado con ese id' });
        }

        await product.deleteOne();

        return res.status(200).json({ message : 'El producto se ha eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el producto: ', error);
        return res.status(500).json({ message : 'Error interno del servidor' });
    }
};