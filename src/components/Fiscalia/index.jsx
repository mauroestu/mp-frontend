import React, {Component} from 'react';
import ListaFiscalias from './list/listFiscalia';
import ModalFiscalia from './list/writeFiscalia';
import {listFiscalias, deleteFiscalia} from '../../services/FiscaliaService';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';

export default class FiscaliaComponent extends Component{

    constructor(){
        super();
        this.state = {
            update: false,
            isOpen: false,
            id: '',
            fiscalias: []
        }
    }

    componentDidMount = async () => {
        this.loadFiscalias();
    }

    loadFiscalias = async () => {
        const res = await listFiscalias();
        if(res.success)
        {
            this.setState({
                fiscalias: res.response
            });
        }
    }

    showModal = () => {
        this.setState({
            isOpen: true
        });
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        });
    }

    resetId = () => {
        this.setState({
            id: ''
        });
    }

    updateFiscalia = (id) => {
        this.setState({
            id
        });
        this.showModal();
    }

    showDeleteFiscalia = (obj) => {
        swal({
            title: "¿Desea eliminar el elemento seleccionado?",
            text: "Una vez eliminado, no se podrá volver a recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                let res = await deleteFiscalia(1);

                if(res.success)
                {
                    swal(res.response, {
                        icon: "success",
                    });
                    this.loadFiscalias();
                }
                else
                {
                    swal(res.messages, {
                        icon: "error",
                    });
                }
            } else {
              swal("Se ha cancelado la eliminación del elemento seleccionado", {
                  icon: "error"
              });
            }
          });
    }

    render(){
        const { fiscalias } = this.state;

        return(
            <>
                <div className="container  no-padding fill">
                    <br/>
                    <div className="card">
                        <div className="card-header">
                            <h5>Gestión de Fiscalías</h5>
                        </div>
                        <div className="card-body">
                        <button type="button" className="btn btn-primary" onClick={this.showModal}>+ Agregar fiscalía</button>
                            {
                                this.state.isOpen && <ModalFiscalia 
                                    isOpen = {this.state.isOpen}
                                    hideModal = {this.hideModal}
                                    id = {this.state.id}
                                    resetId = {this.resetId}
                                    loadFiscalias = {this.loadFiscalias}
                                />
                            }
                            <br/>
                            <br/>
                            <ListaFiscalias 
                                fiscalias = {fiscalias}
                                updateFiscalia = {this.updateFiscalia}
                                showDeleteFiscalia = {this.showDeleteFiscalia}
                            />
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </>            
        );
    }
}