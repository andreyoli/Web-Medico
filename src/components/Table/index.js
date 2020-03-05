import React, { useState } from "react";
import Modal from "react-modal";
import { FaTrash, FaEdit } from "react-icons/fa";

import api from "../../services/api";

import { Container, HeaderContainer } from "./styles";
import FormNewDoctor from "../FormNewDoctor";
import FormUpdateDoctor from "../FormUpdateDoctor";

export default function Table() {
  const [doctors, setDoctors] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [updateValue, setUpdateValue] = useState();

  function openModalCreate() {
    setModalCreate(true);
  }
  function closeModalCreate() {
    setModalCreate(false);
  }

  function openModalUpdate() {
    setModalUpdate(true);
  }
  function closeModalUpdate() {
    setModalUpdate(false);
  }

  function teste(doctor) {
    openModalUpdate();
    setUpdateValue(doctor);
  }

  const loadDoctors = async () => {
    const data = await api.get("/doctor_index").then(data => {
      return data.data;
    });
    setDoctors(data);
  };
  loadDoctors();

  const handleOnChange = e => {
    setInputValue(e.target.value);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  const handleDeleteDoctor = id => {
    api.post("/doctor_delete", { doctor_id: id });
  };

  return (
    <>
      <Container>
        <HeaderContainer>
          {updateValue && (
            <Modal
              isOpen={modalUpdate}
              onRequestClose={closeModalUpdate}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <FormUpdateDoctor
                name={updateValue.name}
                crm={updateValue.crm}
                phone={updateValue.phone}
                state={updateValue.addresses[0].state}
                city={updateValue.addresses[0].city}
                specialties={updateValue.specialties}
              />
              <button onClick={closeModalUpdate}>Close</button>
            </Modal>
          )}
          <input
            type="search"
            name=""
            onChange={handleOnChange}
            placeholder="Digite um nome ou CRM"
          />
          <button onClick={openModalCreate}>Cadastrar</button>
        </HeaderContainer>

        <Modal
          isOpen={modalCreate}
          onRequestClose={closeModalCreate}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <button onClick={closeModalCreate}>close</button>
          <FormNewDoctor />
        </Modal>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CRM</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Especialidades</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {doctors
              .filter(doctor => {
                if (doctor) {
                  return (
                    doctor.name
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    doctor.crm.toLowerCase().includes(inputValue.toLowerCase())
                  );
                } else {
                  return null;
                }
              })
              .map(doctor => {
                return (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.crm}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      {doctor.addresses[0] ? doctor.addresses[0].city : ""} -
                      {doctor.addresses[0] ? doctor.addresses[0].state : ""}
                    </td>
                    <td>
                      {doctor.specialties
                        .map(specialty => {
                          return `${specialty.name}`;
                        })
                        .join(", ")}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          teste(doctor);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteDoctor(doctor.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Container>
    </>
  );
}
