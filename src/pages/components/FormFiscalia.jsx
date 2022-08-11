import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Guatemala } from "../../utils/GuatemalaJson";
import { saveFiscalia, updateFiscalia } from "../../services/FiscaliaService";
import "./loader.scss";
import { msgAppError, msgAppSuccess, msgAppWarning } from "../../utils";
import { useMemo } from "react";

const resetObjFiscalia = {
  id: "",
  name: "",
  agency: "",
  address: "",
  phone: "",
  department: "",
  town: "",
};

const FormFiscalia = ({
  selectedFiscalia,
  resetSelectedFiscalia,
  actionModal,
  showModal,
  loadFiscalias,
  ...props
}) => {
  const [update, setUpdate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fiscalia, setFiscalia] = useState(resetObjFiscalia);
  const [deptos, setDepto] = useState([]);
  const [towns, setTown] = useState([]);

  const loadDeptos = () => {
    let data = [];
    for (let depto in Guatemala) {
      data.push({
        id: depto,
        value: depto,
      });
    }
    setDepto(data);
  };

  const resetForm = () => {
    resetSelectedFiscalia();
    setFiscalia(resetObjFiscalia);
    setTown([]);
    actionModal(false);
  };

  useEffect(() => {
    loadDeptos();
  }, []);

  useMemo(() => {
    if (selectedFiscalia) {
      setUpdate(true);
      let data = Guatemala[selectedFiscalia.department];
      setTown(data);
      setFiscalia(selectedFiscalia);
    }
  }, [selectedFiscalia, towns]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newData = fiscalia;
    newData[name] = value;
    setFiscalia(newData);
  };

  const handleSelectChange = async (event) => {
    const { name, value } = event.target;
    let newData = fiscalia;
    newData[name] = value;
    setFiscalia(newData);

    if (value) {
      let data = Guatemala[value];
      setTown(data);
    } else setTown([]);
  };

  const saveData = async () => {
    const msg = validateForm();
    setLoader(true);

    if (msg.length === 0) {
      const res = await saveFiscalia(fiscalia);
      if (!res.status) {
        setLoader(false);
        msgAppError(res.msg);
        return;
      }

      msgAppSuccess(res.msg);
      loadFiscalias();
      setLoader(false);
      resetForm();
    } else {
      setLoader(false);
      msgAppWarning(msg);
    }
  };

  const updateData = async () => {
    const msg = validateForm();
    setLoader(true);

    if (msg.length === 0) {
      const res = await updateFiscalia(fiscalia);
      if (!res.status) {
        setLoader(false);
        msgAppError(res.msg);
        return;
      }

      msgAppSuccess(res.msg);
      loadFiscalias();
      setLoader(false);
      resetForm();
    } else {
      setLoader(false);
      msgAppWarning(msg);
    }
  };

  const validateForm = () => {
    let msg = "";

    if (fiscalia.name === "") msg = 'El campo "Nombre" es obligatorio';
    else if (fiscalia.agency === "") msg = 'El campo "Agencia" es obligatorio';
    else if (fiscalia.department === "")
      msg = 'El campo "Departamento" es obligatorio';
    else if (fiscalia.town === "") msg = 'El campo "Municipio" es obligatorio';
    else if (fiscalia.address === "")
      msg = 'El campo "Dirección" es obligatorio';
    else if (fiscalia.phone === "") msg = 'El campo "Teléfono" es obligatorio';

    return msg;
  };

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title>
            {!update ? "Nueva fiscalía" : "Editar fiscalía"}
          </Modal.Title>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={resetForm}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <div className="form-row">
                <div className="col-md-12">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={fiscalia.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-row">
                <div className="col-md-12">
                  <label>Agencia:</label>
                  <input
                    type="text"
                    name="agency"
                    defaultValue={fiscalia.agency}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <label>Departamento:</label>
                  <select
                    className="form-control"
                    name="department"
                    value={fiscalia.department}
                    onChange={handleSelectChange}
                    required
                  >
                    <option value="">Selecciona una opción...</option>
                    {deptos.map((depto) => (
                      <option key={depto.id} value={depto.id}>
                        {depto.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Municipio:</label>
                  <select
                    className="form-control"
                    name="town"
                    defaultValue={fiscalia.town}
                    onChange={handleChange}
                    multiple={false}
                    required
                  >
                    <option value="">Selecciona una opción...</option>
                    {towns.map((town) => (
                      <option key={town} value={town}>
                        {town}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <label>Dirección:</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={fiscalia.address}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Teléfono(s):</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={fiscalia.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className={
              "btn btn-outline-success " + (loader ? "loader--text" : "")
            }
            onClick={!update ? saveData : updateData}
            disabled={loader}
          >
            {!loader ? (!update ? "Guardar" : "Actualizar") : ""}
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={resetForm}
            disabled={loader}
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormFiscalia;
