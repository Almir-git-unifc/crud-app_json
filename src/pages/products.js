import React, { useState } from 'react';

export function Products() {
    const [content, setContent] = useState(<ProductList showForm={showForm} />);

    function showList() {
        setContent(<ProductList showForm={showForm} />);
    }

    function showForm() {
        setContent(<ProductForm showList={showList} />);
    }

    return (
        <div className="container  my-5">
            {content}
        </div>
    );
}

function ProductList(props) {
    return (
        <>
            <h2 className="text-center  mb-3">List of Products</h2>
            <buttom onClick={() => props.showForm()} type="buttom" className="btn btn-primary me-2">Create</buttom>
        </>
    );
}

function ProductForm(props) {
    return (
        <>
            <h2 className="text-center  mb-3">Create New Product</h2>
            <buttom onClick={() => props.showList()} type="buttom" className="btn btn-seconday me-2">Cancel</buttom>
        </>
    );
}