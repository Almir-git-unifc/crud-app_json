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
                setProducts(data);
            })  /** e o JSON é convertido emdados e exibido no console */
            .catch((error) => console.log("Error: ", error));
    }
    // fetchProducts();  No lugar de chamar o método, vamos chamar useEffect
    useEffect(() => fetchProducts(), []);

    return (
        <>
            <h2 className="text-center  mb-3">Listar Produtos</h2>
            <button onClick={() => props.showForm()} type="button" id="btnCreate" className="btn btn-primary me-2">Create</button>

            <button onClick={() => fetchProducts()} type="button" className="btn btn-outline-primary me-2">Refresh</button>

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
                                    <td>{product.category}</td>
                                    <td>R$ {product.price}</td>
                                    <td>{product.createdAt}</td>
                                    <td style={{ width: "10px", 'whiteSpace': 'nowrap' }} >



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

    // Criaremos hook para mensagem de erro
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        // ler os dados do form
        const formData = new FormData(event.target);

        // converte o formData para Object
        const product = Object.fromEntries(formData.entries());

        // form validation PARA FORMULÁRIO EM BRANCO
        // SE OS DADOS ESTIVEREM FORA DOS PADRÕES
        if (!product.name || !product.brand || !product.category || !product.price) {
           let  msgAlert = 'Por favor, preencha todos os campos';
            console.log(msgAlert);
            // Aqui vamos colocar um alerta
            setErrorMessage(
                <div id="alert" className="alert alert-danger" role="alert">                    
                        {msgAlert}
                </div>
            );
            return;
        }

        // create a new product - CRIAR NOVO PRODUTO
        product.createdAt = new Date().toISOString().slice(0, 10);
        fetch("http://localhost:3004/products", {
            // Parte do method e Headers é padrão da API Fetch, encontado em https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Aqui vamos incluir os dados recebidos, no caso os dados são product
            body: JSON.stringify(product)
        })
            .then((response) => {
                if (response.code == 400 || response.code == 500) {
                    throw new Error("Resposta codigo 400 ou 500... não estava OK");
                }
                return response.json()
            })
            .then((data) => props.showList())  // props.showList()  mostra todos os dados
            .catch((error) => {
                console.log(6, error);
            });

    }

    return (
        <>
            <h2 className="text-center  mb-3">Incluir Novo Produto</h2>

            <div className="row">
                <div className="col-lg-6 mx-auto">

                    {errorMessage}

                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8" >
                                <input className="form-control"
                                    name="name"
                                    defaultValue="" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8" >
                                <input className="form-control"
                                    name="brand"
                                    defaultValue="" />
                            </div>
                        </div>


                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8" >
                                <select className="form-select"
                                    name="category"
                                    defaultValue="" >

                                    <option value="Other">Other</option>
                                    <option value="Phones">Phones</option>
                                    <option value="Computers">Computers</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="GPS">GPS</option>
                                    <option value="Cameras">Cameras</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8" >
                                <input className="form-control"
                                    name="price"
                                    defaultValue="" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8" >
                                <textarea className="form-control"
                                    name="description"
                                    defaultValue="" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary btn-sm mc-3" >Save</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <button onClick={() => props.showList()} type="button"
                                    className="btn btn-outline-primary btn-sm mc-3">Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}