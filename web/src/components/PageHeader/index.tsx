import React from 'react'
import { Link } from 'react-router-dom'

import backImg from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

import './style.css'

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children, title, description }) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backImg} alt="Voltar"/>
        </Link>

        <img src={logoImg} alt="Proffy"/>
      </div>

      <div className="header-content">
        <strong> {title} </strong>
        { description && <p> {description} </p> }
        {children}
      </div>
    </header>
  )
}

export default PageHeader