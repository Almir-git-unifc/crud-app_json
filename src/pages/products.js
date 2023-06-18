import React, { useState, useEffect } from 'react';

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

    const [products, setProducts] = useState([]);
    function fetchProducts() {
        fetch("http://localhost:3004/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Server Response");
                }
                return response.json()  /** a response é convertida em JSON */
            })
            .then((data) => {
                console.log(2, data);
                setProducts(data);
            })  /** e o JSON é convertido emdados e exibido no console */
            .catch((error) => console.log("Error: ", error));
    }
    // fetchProducts();  No lugar de chamar o método, vamos chamar useEffect
    useEffect(() => fetchProducts(), []);

    return (
        <>
            <h2 className="text-center  mb-3">Listar Produtos</h2>
            <buttom onClick={() => props.showForm()} type="buttom" className="btn btn-primary me-2">Create</buttom>

            <buttom onClick={() => fetchProducts()} type="buttom" className="btn btn-outline-primary me-2">Refresh</buttom>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Criado em</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => {
                            return (
                                <tr key={index} >
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category}$</td>
                                    <td>{product.price}</td>
                                    <td>{product.createdAt}</td>
                                    <td style={{ width: "10px", 'white-space': 'nowrap' }} >



                                        <button type="button" className="btn btn-primary btn-sm me-2">Edit</button>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}





function ProductForm(props) {
    return (
        <>
            <h2 className="text-center  mb-3">Incluir Novo Produto</h2>
            <buttom onClick={() => props.showList()} type="buttom" className="btn btn-outline-primary me-2">Cancel</buttom>
        </>
    );
}