import React from 'react';


const ListaFiscalias = (props) => {
    return(
        <>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Municipio</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        { 
                            props.fiscalias.length > 0 ?
                                props.fiscalias.map((fiscalia)=>(
                                    <tr key={fiscalia.id}>
                                        <td>{fiscalia.strFiscalia}</td>
                                        <td>{fiscalia.strDepto}</td>
                                        <td>{fiscalia.strMuni}</td>
                                        <td>{fiscalia.strUbicacion}</td>
                                        <td>{fiscalia.strTelefono}</td>
                                        <td>
                                            <div className="btn-group" aria-label="Acciones">
                                                <button 
                                                    onClick={() => props.updateFiscalia(fiscalia.id)}
                                                    className="btn btn-success" 
                                                    type="button"
                                                >
                                                    Editar    
                                                </button>
                                                <button 
                                                    onClick={() => props.showDeleteFiscalia(fiscalia)}
                                                    className="btn btn-danger" 
                                                    type="button" >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                ))
                            : <p>No hay información para mostrar</p>
                        }
                    </>
                </tbody>
            </table>
        </>
    );
}

export default ListaFiscalias;