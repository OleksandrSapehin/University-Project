import React, { useEffect, useState } from 'react';
import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../api/adminApi';
import AdminProductForm from './AdminProductForm';
import {
    DashboardContainer,
    SectionTitle,
    ProductList,
    ProductItem,
    ProductImage,
    ButtonGroup
} from '../styles/AdminDashboard.styles';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async (productData) => {
        const newProduct = await createProduct(productData);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = async (updatedProductData) => {
        const updatedProduct = await updateProduct(editingProduct.id, updatedProductData);
        setProducts(products.map((product) => product.id === updatedProduct.id ? updatedProduct : product));
        setEditingProduct(null);
    };

    return (
        <DashboardContainer>
            <SectionTitle>{editingProduct ? 'Редактировать продукт' : 'Добавить новый продукт'}</SectionTitle>
            <AdminProductForm
                onProductAdded={editingProduct ? handleUpdateProduct : handleAddProduct}
                initialData={editingProduct}
            />

            <SectionTitle>Список продуктов</SectionTitle>
            <ProductList>
                {products.map((product) => (
                    <ProductItem key={product.id}>
                        <ProductImage src={`http://localhost:8081${product.imagePath}`} alt={product.name} />
                        <div>
                            <strong>{product.name}</strong> - {product.price}₽
                            <p>{product.description}</p>
                        </div>
                        <ButtonGroup>
                            <button onClick={() => handleEditProduct(product)}>Редактировать</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                        </ButtonGroup>
                    </ProductItem>
                ))}
            </ProductList>
        </DashboardContainer>
    );
};

export default AdminDashboard;