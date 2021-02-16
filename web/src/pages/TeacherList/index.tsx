import React, { FormEvent, useState } from 'react'
import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { TeacherProps } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './style.css'

function TeacherList() {
  const [teachers, setTeachers] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function searchTeachers(event: FormEvent) {
    event.preventDefault()

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="content">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subjec" 
            label="Matéria"
            value={subject}
            onChange={event => setSubject(event.target.value)}
            options={[
              { label: 'Artes', name: 'Artes'},
              { label: 'Biologia', name: 'Biologia'},
              { label: 'Ciências', name: 'Ciências'},
              { label: 'Educação física', name: 'Educação física'},
              { label: 'Física', name: 'Física'},
              { label: 'Geografia', name: 'Geografia'},
              { label: 'História', name: 'História'},
              { label: 'Matemática', name: 'Matemática'},
              { label: 'Português', name: 'Português'},
              { label: 'Química', name: 'Matemática'},
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da semana"
            value={week_day}
            onChange={event => setWeekDay(event.target.value)}
            options={[
              { label: '0', name: 'Domingo'},
              { label: '1', name: 'Segunda-feira'},
              { label: '2', name: 'Terça-feira'},
              { label: '3', name: 'Quarta-feira'},
              { label: '4', name: 'Quinta-feira'},
              { label: '5', name: 'Sexta-feira'},
              { label: '6', name: 'Sábado'},
            ]}
          />
          <Input 
            type="time" 
            name="time"
            label="Hora" 
            value={time}
            onChange={event => setTime(event.target.value)}
          />

          <button type="submit"> Buscar </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: TeacherProps) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  )
}

export default TeacherList