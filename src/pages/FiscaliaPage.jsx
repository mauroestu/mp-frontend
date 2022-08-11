import React, { useEffect } from "react";
import { useState } from "react";
import { listFiscalias } from "../services/FiscaliaService";
import { ToastContainer } from "react-toastify";
import { TablaFiscalia } from "./components/TablaFiscalia";
import { msgAppError } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { act } from "react-dom/test-utils";
import FormFiscalia from "./components/FormFiscalia";

const FiscaliaPage = () => {
  const [listaFiscalias, setListaFiscalias] = useState([]);
  const [selectedFiscalia, setSelectedFiscalia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadFiscalias();
  }, []);

  const resetSelectedFiscalia = () => {
    setSelectedFiscalia(null);
  }

  const selectFiscaliaById = (idFiscalia) => {
    const tmpFiscalia = listaFiscalias.find(fiscalia => fiscalia.id == idFiscalia);
    setSelectedFiscalia(tmpFiscalia);
    actionModal(true);
  }

  const actionModal = (action) => {
    setShowModal(action);
  };

  const loadFiscalias = async () => {
    const res = await listFiscalias();
    if (res.status) {
      setListaFiscalias(res.data);
    } else {
      msgAppError(res.msg);
    }
  };

  return (
    <>
      <div className="container  no-padding fill">
        <div className="card" style={{ marginTop: 25 }}>
          <div className="card-header">
            <h5>Gestión de Fiscalías</h5>
            <div className="card-body">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => actionModal(true)}
              >
                + Agregar fiscalía
              </button>

              <FormFiscalia
                showModal={showModal}
                selectedFiscalia={selectedFiscalia}
                actionModal={actionModal}
                resetSelectedFiscalia={resetSelectedFiscalia}
                loadFiscalias={loadFiscalias}
              />
              <div style={{ marginTop: 25 }}>
                <TablaFiscalia
                  fiscalias={listaFiscalias}
                  selectFiscaliaById={selectFiscaliaById}
                  loadFiscalias={loadFiscalias}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FiscaliaPage;
