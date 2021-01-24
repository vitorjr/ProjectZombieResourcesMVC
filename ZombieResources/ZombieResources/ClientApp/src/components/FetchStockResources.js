import React, { Component } from "react";
import { Link } from "react-router-dom";

export class FetchStockResources extends Component {
    static displayName = "Recursos";

    constructor() {
        super();
        this.state = { stockresources: [], loading: true}
    }

    componentDidMount() {
        this.popularstockResourcesData();
    }

    static handleEdit(id) {
        window.location.href = "/stockresources/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja mesmo deletar esse Recurso")) {
            return;
        } else {
            fetch('api/stockresources/' + id, { method: 'delete' }).then(json => { window.location.href = "fetch-stockresources"; alert("Recusro deletado com sucesso") })
        }
    }

    static renderstockresourcesTabela(stockresources) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th class="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {stockresources.map(prod =>
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.description}</td>
                            <td>{prod.amount}</td>
                            <td class="text-center">
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(prod.id)}>Editar</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(prod.id)}>Deletar</button>
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Caregando... </em></p>
            : FetchStockResources.renderstockresourcesTabela(this.state.stockresources);

        return (
            <div>
                <h1 id="tabelLabel">Recursos</h1>
                <p>Tela de Listagem de Recursos</p>
                {contents}
            </div>
            );
    }

    async popularstockResourcesData() {
        const response = await fetch('api/StockResources');
        const data = await response.json();
        this.setState({ stockresources: data, loading:false });
    }
}