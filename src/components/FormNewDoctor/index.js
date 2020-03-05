import React, { useState } from "react";
import api from "../../services/api";
import Checkbox from "../Checkbox";

import { Container, CheckContainer } from "./styles";

export default function FormNewDoctor() {
  const [name, setName] = useState("");
  const [crm, setCrm] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Map());

  const handleChange = e => {
    if (e.target.checked) {
      const item = e.target.name;
      const isChecked = e.target.checked && e.target.checked;
      setCheckedItems(checkedItems.set(item, isChecked));
    } else {
      checkedItems.delete(e.target.name);
    }
  };

  const handleSetName = e => {
    setName(e.target.value);
  };
  const handleSetCrm = e => {
    setCrm(e.target.value);
  };
  const handleSetPhone = e => {
    setPhone(e.target.value);
  };
  const handleSetState = e => {
    setState(e.target.value);
  };
  const handleSetCity = e => {
    setCity(e.target.value);
  };

  const loadSpecialties = async () => {
    const data = await api.get("/specialty_index").then(data => {
      return data.data;
    });
    setSpecialties(data);
  };
  loadSpecialties();

  const handleCreateDoctor = async id => {
    const specialties = [...checkedItems.keys()];
    if (specialties.length >= 2) {
      await api.post("/doctor_register", {
        name,
        crm,
        phone,
        state,
        city,
        specialties
      });
    }
  };
  return (
    <Container>
      <form
        onSubmit={() => {
          handleCreateDoctor();
        }}
      >
        Nome:
        <input type="text" name="" onChange={handleSetName} />
        CRM:
        <input type="number" onChange={handleSetCrm} />
        Telefone:
        <input type="tel" onChange={handleSetPhone} />
        Estado:
        <input type="text" name="" id="" onChange={handleSetState} />
        Cidade:
        <input type="text" name="" id="" onChange={handleSetCity} />
        Especialidades:
        <CheckContainer>
          {specialties.map(item => {
            return (
              <label forHtml="{item.name}">
                {item.name}
                <Checkbox name={item.name} onChange={handleChange} />
              </label>
            );
          })}
        </CheckContainer>
        <input type="submit" value="Enviar" />
      </form>
    </Container>
  );
}
