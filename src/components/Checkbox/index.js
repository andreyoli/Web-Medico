import React from "react";

const Checkbox = ({ type = "checkbox", name, onChange }) => (
  <input type={type} name={name} onChange={onChange} />
);

export default Checkbox;
