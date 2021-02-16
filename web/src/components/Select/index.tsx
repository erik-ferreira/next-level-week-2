import React, { SelectHTMLAttributes } from 'react'

import './style.css'

interface PropsSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    label: string;
    name: string;
  }>
}

const Select: React.FC<PropsSelect> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden> Selecione uma opção </option>

        {options.map(option => (
          <option key={option.label} value={option.label}> {option.name} </option>
        ))}
      </select>

    </div>
  )
}

export default Select