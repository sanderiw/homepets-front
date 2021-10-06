//Importando configurações e bibliotecas
import api from '../../apis/api'; // Instância do Axios pré-configurada
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//Importado Componentes
import './userDetails.css';

function UserDetails() {
  const [userDetails, setUserDetails] = useState();
  const [hasError, setHasError] = useState(false);
  const [showPets, setShowPets] = useState(false);
  const [showAdvs, setShowAdvs] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await api.get(`/profile/${id}`);
        setUserDetails({ ...response.data });
      } catch (err) {
        setHasError(true);
        console.error(err);
      }
    }
    fetchUserDetails();
  }, [id]);

  // Funções para os botões do Perfil do Usuário
  function handleShowPets() {
    if (!showPets) {
      setShowPets(true);
      setShowAdvs(false);
    }
  }

  function handleShowAdvs() {
    if (!showAdvs) {
      setShowAdvs(true);
      setShowPets(false);
    }
  }

  if (hasError) {
    <h1>
      <i className='error-color fas fa-exclamation-triangle'></i> Erro ao
      carregar esta página!
    </h1>;
  }

  if (!userDetails) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <div className='container mt-2 mb-2 d-flex flex-column justify-content-center align-items-center'>
        <div
          className='card border-light mt-2 mb-4'
          style={{ width: '98vw', maxWidth: '740px' }}
        >
          <div className='page-heading'>
            <div className='media clearfix'>
              <div className='media-left pr30'>
                <a href='#'>
                  <img
                    src={userDetails.profilePicUrl}
                    alt='User profile picture'
                    className='rounded-circle mx-1 p-3'
                    width='300px'
                  />
                </a>
              </div>
              <div className='media-body va-m w-100'>
                <h2 className='titleFont mt-5'>{userDetails.name}</h2>
                <p className='subtitleFont'>{userDetails.personalDesc}</p>
                <div className='media-links'>
                  <ul className='list-inline list-unstyled'>
                    <li>
                      <a href={`mailto:${userDetails.email}`}>
                        <i class='fas fa-envelope icon-style'></i>
                      </a>
                    </li>
                    <li className='hidden'>
                      <a href='#' title='external link'>
                        <span className='fa fa-external-link-square fs35 text-muted'></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class='tab-block d-flex justify-content-around'>
              <button
                className='btn btn-danger rounded-pill my-3'
                onClick={handleShowAdvs}
              >
                Meus Anúncios
              </button>
              <button
                className='btn btn-primary rounded-pill my-3'
                onClick={handleShowPets}
              >
                Meus Pets
              </button>
            </div>
          </div>
          {showPets ? (
            <div className='pets-container d-flex'>
              {userDetails.pets.map((pet) => (
                <>
                  <div className='container d-flex'>
                    <div className='p-2 bd-highlight'>
                      <img
                        src={pet.imageUrl}
                        alt='Pet picture'
                        className='rounded-circle mx-1 p-3'
                        width='150px'
                      />
                    </div>
                    <div className='p-2 bd-highlight'>
                      <h3 className='pet-name mt-4'>Nome: {pet.name}</h3>
                      <p className='textsFonts'>Raça: {pet.breed}</p>
                      <p className='textsFonts mb-0'>Idade: {pet.age}</p>
                    </div>
                  </div>
                  <div className='mx-5'>
                    <hr className='my-4 line' />
                  </div>
                </>
              ))}
            </div>
          ) : (
            <h1>Oi</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDetails;
