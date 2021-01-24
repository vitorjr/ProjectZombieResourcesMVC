﻿import React, { Component } from "react";

export class StockResources {
    constructor() {
        this.id = 0;
        this.description = "";
        this.observation = "";
        this.amount = 0;
        this.responsibleinput = "";
        this.responsibleoutput = "";
    }
}

export class AddStockResources extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", stockresources: new StockResources(), loading: true }
        this.inicialize();

        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async inicialize() {
        var id = this.props.match.params["id"];

        if (id > 0) {
            const response = await fetch('api/StockResources/' + id)
            const data = await response.json();
            this.setState({ title: "Edit", stockresources: data, loading: false })
        } else {
            this.state = { title: "Create", stockresources: new StockResources(), loading: false }
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Recurso</h3>
                {contents}
            </div>
            );
    }

    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.stockresources.id > 0) {
            const response1 = fetch('api/StockResources' + this.state.stockresources.id, { method: 'PUT', body: data }).then(json => { window.location.href = "fetch-stockresources"; alert("Recurso alterado com sucesso!"))
        } else {
            const response2 = fetch('api/StockResources', { method: 'POST', body: data });
            this.props.history.push('/fetch-stockresources');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-stockresources');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.stockresources.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="description" defaultValue={this.state.stockresources.description} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="observation" defaultValue={this.state.stockresources.observation} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="number" name="amount" defaultValue={this.state.stockresources.amount} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.stockresources.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cencelar</button>
                </div>
            </form>
            );
    }
}