import React from 'react'
import api from '../../services/api'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './style.css'

export interface TeacherProps {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: TeacherProps
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function handleCreateNewConnection() {
    api.post('/connections', {
      user_id: teacher.id
    })
  }

  return (
    <article className="teacher-item">
    <header>
      <img src={teacher.avatar} alt={teacher.name} />
      <div>
        <strong> {teacher.name} </strong>
        <span> {teacher.subject} </span>
      </div>
    </header>

    <p> {teacher.bio} </p>

    <footer>
      <p>
        Preço/hora
        <strong> R$ {teacher.cost} </strong>
      </p>
      <a target="_blank" rel="noreferrer" onClick={handleCreateNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
        <img src={whatsappIcon} alt="Whatsapp"/>
        Entrar em contato
      </a>
    </footer>
  </article>
  )
}

export default TeacherItem