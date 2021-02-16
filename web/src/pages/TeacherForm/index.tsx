import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningImg from '../../assets/images/icons/warning.svg'

import './style.css'

function TeacherForm() {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ])

  function handleAddNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  function setSchenduleItemValue(position: number, field: string, value: string) {
    const updateSchenduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]:value }
      }

      return scheduleItem
    })

    setScheduleItems(updateSchenduleItems)
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault()

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push('/')
    }).catch(() => {
      alert('Erro no cadastro!')
    })
  }

  return (
    <div id="page-teacher-form">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              label="Nome completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input 
              name="avatar" 
              label="Avatar" 
              value={avatar}
              onChange={event => setAvatar(event.target.value)}
            />
            <Input 
              name="whatsapp" 
              label="Whatsapp" 
              value={whatsapp}
              onChange={event => setWhatsapp(event.target.value)}
            />
            <Textarea 
              name="bio" 
              label="Biografia" 
              value={bio}
              onChange={event => setBio(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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
                { label: 'Química', name: 'Química'},
              ]}
            />
            <Input 
              name="cost" 
              label="Cursto da sua hora por aula"
              value={cost}
              onChange={event => setCost(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddNewScheduleItem}> 
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day" 
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={event => setSchenduleItemValue(index, 'week_day', event.target.value)}
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
                  name="from" 
                  label="Das" 
                  type="time"
                  value={scheduleItem.from}
                  onChange={event => setSchenduleItemValue(index, 'from', event.target.value)}
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time" 
                  value={scheduleItem.to}
                  onChange={event => setSchenduleItemValue(index, 'to', event.target.value)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningImg} alt="Aviso importante"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm