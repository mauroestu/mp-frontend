import React from "react";
import swal from "sweetalert";
import { deleteFiscalia } from "../../services/FiscaliaService";

export const TablaFiscalia = ({ fiscalias, loadFiscalias, selectFiscaliaById, ...props }) => {

  const showDeleteFiscalia = (idFiscalia) => {
    swal({
      title: "¿Desea eliminar el elemento seleccionado?",
      text: "Una vez eliminado, no se podrá volver a recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let res = await deleteFiscalia(idFiscalia);

        if (res.status) {
          swal('Elemento eliminado con éxito', {
            icon: "success",
          });
          loadFiscalias();
        } else {
          swal(res.msg, {
            icon: "error",
          });
        }
      } else {
        swal("Se ha cancelado la eliminación del elemento seleccionado", {
          icon: "error",
        });
      }
    });
  };

  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Agencia</th>
            <th scope="col">Departamento</th>
            <th scope="col">Municipio</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <>
            {fiscalias.length > 0 ? (
              fiscalias.map((fiscalia) => (
                <tr key={fiscalia.id}>
                  <td>{fiscalia.name}</td>
                  <td>{fiscalia.agency}</td>
                  <td>{fiscalia.department}</td>
                  <td>{fiscalia.town}</td>
                  <td>{fiscalia.phone}</td>
                  <td>
                    <div className="btn-group" aria-label="Acciones">
                      <button
                        onClick={() => selectFiscaliaById(fiscalia.id)}
                        className="btn btn-success"
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => showDeleteFiscalia(fiscalia.id)}
                        className="btn btn-danger"
                        type="button"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>No hay información para mostrar</p>
            )}
          </>
        </tbody>
      </table>
    </>
  );
};
