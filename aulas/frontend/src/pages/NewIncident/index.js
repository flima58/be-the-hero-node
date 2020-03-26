import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

//Estilo
import './style.css'

//Imagens
import logoImg from '../../assets/logo.svg'

import '../../services/api'
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('') 
    const [description, setDescription] = useState('') 
    const [value, setValue] = useState('')

    const history = useHistory()

    const ongId = localStorage.getItem('ongId');
    
    async function handleNewIncident(e){
        e.preventDefault()

        const data = { 
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }

            })

           history.push('/profile');
        }catch ( err ){
            alert("Erro ao cadastrar, tente novamente")
        }
    }


    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o cas odetalhadamente para encontrar um heroi para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                     placeholder="Título do caso"
                     value={title}
                     onChange = {e => setTitle(e.target.value)}
                     />
                    <textarea 
                     placeholder="Descrição"
                     value={description}
                     onChange = {e => setDescription(e.target.value)}
                     />
                    <input 
                     placeholder="Valor em reias"
                     value={value}
                     onChange = {e => setValue(e.target.value)}
                     />
                       
                

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}