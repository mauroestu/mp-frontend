/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import {Guatemala} from '../../../utils/GuatemalaJson';
import {saveFiscalia,getFiscalia, updateFiscalia} from '../../../services/FiscaliaService';

import 'react-toastify/dist/ReactToastify.css';
import './loader.scss';

const ModalFiscalia = (props) => {
    let fiscalia = {
        id: props.id,
        strFiscalia: '',
        strDepto: '',
        strMuni: '',
        strUbicacion: '',
        strTelefono: ''
    };
    const [update, setUpdate] = useState(false);
    const [loader, setLoader] = useState(false);
    const [newFiscalia, setFiscalia] = useState(fiscalia);
    const [deptos,setDepto] = useState([]);
    const [towns,setTown] = useState([]);

    useEffect(()=>{
        let data = [];
        for(let depto in Guatemala){
            data.push({
                id: depto,
                value: depto
            });
        }
        setDepto(data);
        
        if(fiscalia.id !== '')
        {
            console.log(fiscalia.id);
            async function getData(){
                let res =  await getFiscalia(fiscalia.id);
                if(!res.success)
                {
                    toast.error(res.messages);
                    return;
                }
                let datos = res.response; delete datos.activo;
                await handleSelectChange({ target: {
                    name: 'strMuni',
                    value: datos.strDepto
                }});
                await setFiscalia(datos);
                
                setUpdate(true);
            }         
            getData();            
        }

        return () => {
            props.resetId();
            setFiscalia(fiscalia)
        }
    },[]);
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(name,value);
        let newData = newFiscalia;
        newData[name] = value;
        setFiscalia(newData);
    }

    const handleSelectChange = async (event) => {
        const {name, value} = event.target;
        let newData = newFiscalia;
        newData[name] = value;
        await setFiscalia(newData);

        let data = Guatemala[value];
        await setTown(data);
    }

    const saveData = async () => {
        let msg = validateForm();
        setLoader(true);
        
        if(msg.length === 0)
        {
            const res = await addFiscalia(newFiscalia);

            if(!res.success)
            {
                setLoader(false);
                toast.error(res.messages);
                return;
            }

            props.loadFiscalias();
            setLoader(false);
            toast.success(res.response);
            props.hideModal();
        }
        else
        {
            setLoader(false);
            toast.warning(msg);
        }
    }

    const updateData = async () => {
        let msg = validateForm();
        setLoader(true);
        
        if(msg.length === 0)
        {
            const res = await updateFiscalia(newFiscalia);

            if(!res.success)
            {
                setLoader(false);
                toast.error(res.messages);
                return;
            }

            props.loadFiscalias();
            setLoader(false);
            toast.success(res.response);
            props.hideModal();
        }
        else
        {
            setLoader(false);
            toast.warning(msg);
        }
    }

    const validateForm = () => {
        let msg = '';
        let data = newFiscalia;

        if(data.strFiscalia === '') msg = 'El campo "Nombre" es obligatorio';
        else if(data.strDepto === '') msg = 'El campo "Departamento" es obligatorio';
        else if(data.strMuni === '') msg = 'El campo "Municipio" es obligatorio';
        else if(data.strUbicacion === '') msg = 'El campo "Dirección" es obligatorio';
        else if(data.strTelefono === '') msg = 'El campo "Teléfono" es obligatorio';

        return msg;
    }

    let fiscalias = newFiscalia;
    return (
        <>
            <Modal 
                show={props.isOpen}
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title>
                        { !update ? 'Nueva fiscalía' : 'Editar fiscalía'} 
                    </Modal.Title>
                    <button type="button" className="close" aria-label="Close" onClick={props.hideModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <FormFiscalia 
                        handleSelectChange = {handleSelectChange}
                        handleChange = {handleChange}
                        deptos = {deptos}
                        towns = {towns}
                        setFiscalia = {setFiscalia}
                        fiscalia = {fiscalias}
                        update = {update}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className={"btn btn-outline-success " + (loader ? 'loader--text' : '')}
                    onClick={!update ? saveData : updateData} disabled={loader}>
                        {!loader ? !update? 'Guardar' : 'Actualizar' : ''}
                    </button>
                    
                    <button type="button" className="btn btn-outline-danger" onClick={props.hideModal}
                    disabled={loader}>Cancelar</button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

const FormFiscalia = (props) => {
    return (
        <>
            <form>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-md-12">
                            <label>Nombre:</label>
                            <input type="text" name="strFiscalia" defaultValue={props.fiscalia.strFiscalia}
                            onChange = {props.handleChange} className="form-control" required /> 
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-row">
                        <div className="col-md-6">
                            <label>Departamento:</label>
                            <select className="form-control" name="strDepto" value={props.fiscalia.strDepto}
                            onChange={props.handleSelectChange} required>
                                <option value="">Selecciona una opción...</option>
                                {
                                    props.deptos.map((depto) => (
                                        <option key={depto.id} value={depto.id}>{depto.value}</option>   
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label>Municipio:</label>
                            <select className="form-control" name="strMuni" 
                            defaultValue={props.fiscalia.strMuni}
                            onChange={props.handleChange} multiple={false} required>
                                <option value="">Selecciona una opción...</option>
                                {
                                    props.towns.map((town) => (
                                        <option key={town} value={town}>{town}</option>   
                                    ))
                                }
                            </select> 
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-row">
                        <div className="col-md-6">
                            <label>Dirección:</label>
                            <input type="text" name="strUbicacion" defaultValue={props.fiscalia.strUbicacion}
                            onChange={props.handleChange} className="form-control" required /> 
                        </div>
                        <div className="col-md-6">
                            <label>Teléfono(s):</label>
                            <input type="text" name="strTelefono" defaultValue={props.fiscalia.strTelefono}
                            onChange={props.handleChange} className="form-control" required /> 
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ModalFiscalia;