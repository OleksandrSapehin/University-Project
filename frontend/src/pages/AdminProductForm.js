import React, { useState, useEffect } from 'react';
import {
    FormContainer,
    Label,
    Input,
    Textarea,
    SubmitButton,
    ImagePreview,
} from '../styles/AdminProductForm.styles';

const AdminProductForm = ({ onProductAdded, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        description: '',
        price: '',
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                amount: initialData.amount || '',
                description: initialData.description || '',
                price: initialData.price || '',
                image: null, // Новое изображение загружается сюда
            });

            // Проверяем наличие изображения и устанавливаем превью
            setPreviewImage(
                initialData.imageUrl ? `http://localhost:8081${initialData.imageUrl}` : null
            );
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, image: file }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onProductAdded(formData);
        setFormData({ name: '', amount: '', description: '', price: '', image: null });
        setPreviewImage(null);
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Label>Название:</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <Label>Количество:</Label>
            <Input type="text" name="amount" value={formData.amount} onChange={handleChange} required />

            <Label>Описание:</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} required />

            <Label>Цена:</Label>
            <Input type="number" name="price" value={formData.price} onChange={handleChange} required />

            <Label>Изображение:</Label>
            <Input type="file" name="image" onChange={handleFileChange} accept="image/*" />
            console.log("Image URLs:", initialData.imageUrls);
            {previewImage && <ImagePreview src={previewImage} alt="Preview" />}

            <SubmitButton type="submit">{initialData ? 'Обновить продукт' : 'Добавить продукт'}</SubmitButton>
        </FormContainer>
    );
};

export default AdminProductForm;