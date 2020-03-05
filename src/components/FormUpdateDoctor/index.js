import React, { useState } from "react";
import api from "../../services/api";
import Checkbox from "../Checkbox";

import { Container, CheckContainer } from "./styles";

export default function FormNewDoctor(props) {
  const [name, setName] = useState(props.name);
  const [crm, setCrm] = useState(props.crm);
  const [phone, setPhone] = useState(props.phone);
  const [state, setState] = useState(props.state);
  const [city, setCity] = useState(props.city);
  const [loadedSpecialties, setLoadedSpecialties] = useState(props.specialties);
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
    setLoadedSpecialties(data);
  };
  loadSpecialties();

  const handleUpdateDoctor = id => {
    // name, crm, phone, state, city, specialties []
    const newSpecialty = [...checkedItems.keys()];
    if (newSpecialty.length >= 2) {
      api.post("/doctor_update", {
        name,
        crm,
        phone,
        state,
        city,
        newSpecialty
      });
    }
  };
  return (
    <Container>
      <form
        onSubmit={() => {
          handleUpdateDoctor();
        }}
      >
        Nome:
        <input type="text" value={name} onChange={handleSetName} />
        CRM:
        <input type="text" value={crm} onChange={handleSetCrm} disabled />
        phone:
        <input type="text" value={phone} onChange={handleSetPhone} />
        Estado:
        <input type="text" value={state} id="" onChange={handleSetState} />
        Cidade:
        <input type="text" value={city} id="" onChange={handleSetCity} />
        Especialidades:
        <CheckContainer>
          {loadedSpecialties.map(item => {
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
