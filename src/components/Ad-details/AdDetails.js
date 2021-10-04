//Importando configurações e bibliotecas

import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import api from "../../apis/api"; // Instância do Axios pré-configurada

//Importando Componentes

import CarouselComp from "../carousel/Carousel";

function AdDetails() {
  const [adDetails, setAdDetails] = useState({
    //Coleção do Usuário
    profilePicUrl: "",
    email: "",
    //Coleção do Anúncio
    user: { name: "" },
    availableDates: { startDate: "", endDate: "" },
    title: "",
    location: "",
    intro: "",
    homeinfo: "",
    duties: "",
    pets: [{ name: "", species: "", age: null }],
  });

  const { id } = useParams();

  useEffect(() => {
    async function fetchAdDetails() {
      try {
        const response = await api.get(`/ad/${id}`);

        setAdDetails({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchAdDetails();
  }, [id]);

  return (
    <div className="container mt-2 mb-2 d-flex flex-column justify-content-center align-items-center">
      <div
        className="card border-light mt-2 mb-4"
        style={{ width: "98vw", maxWidth: "740px" }}
      >
        {/* LINK PARA VOLTAR À PÁGINA ANTERIOR */}
        <div>
          <Link to="/detalhes-anuncio">Voltar às petHouses</Link>
        </div>
        {/* CALENDÁRIO DE DISPONIBILIDADE E INFORMAÇÕES DE CONTATO */}
        <div className="container mt-5 d-flex justify-content-center">
          <div
            className="card p-4 my-3 "
            style={{ width: "98vw", maxWidth: "740px" }}
          >
            <div className="first">
              <div className="time d-flex flex-row align-items-center justify-content-between mt-3"></div>
            </div>
            <div className="second d-flex flex-row mt-2">
              <div className="image mr-3">
                <img
                  src="https://i.imgur.com/0LKZQYM.jpg"
                  className="rounded-circle"
                  width="60"
                />
              </div>
              <div className="">
                <div className="d-flex flex-row mb-1">
                  <span>Dono do Pet</span>
                </div>
                <p>Home and pet owner</p>
              </div>
            </div>
            <hr className="line-color" />
            <h6>Período de cuidado dos pets:</h6>
            <p>
              {
                new Date(adDetails.availableDates.startDate)
                  .toLocaleString()
                  .split(",")[0]
              }{" "}
              até{" "}
              {
                new Date(adDetails.availableDates.endDate)
                  .toLocaleString()
                  .split(",")[0]
              }{" "}
            </p>
            <hr className="line-color" />
            <div className="third mt-4">
              <h6>Entre em contato:</h6>
              <p>Símbolos de contato</p>
            </div>
          </div>
        </div>

        <div>
          <h1>{adDetails.title}</h1>
          <p>{adDetails.location}</p>
          <p>símbolos de pets na casa</p>
        </div>
        <div>
          {/* CARROSSEL */}
          <div>
            <CarouselComp />
          </div>
        </div>

        <div>
          {/* SOBRE MIM DE CADA USER */}
          <h3>Sobre mim</h3>
          <p>{adDetails.intro}</p>
          <h3>Sobre a casa</h3>
          <p>{adDetails.homeinfo}</p>
          <h3>Responsabilidades</h3>
          <p>{adDetails.duties}</p>
        </div>
        {/* PETS DO USUÁRIO NO ANÚNCIO */}
        <div>
          <h3>Conheça meus pets</h3>
          <img
            src="https://media.istockphoto.com/photos/cute-sitting-havanese-puppy-dog-picture-id611308904?k=20&m=611308904&s=170667a&w=0&h=2emV7QLqhHRN0eepi0ZxZz8UtXD_sk-tYckF38Dz2IY="
            alt="User pet photo"
            class="rounded-circle"
            width="95"
          />
          <div class="mt-3">
            <h4>Pet Name</h4>
            <p class="text-secondary mb-1">Raça</p>
            <p class="text-muted font-size-sm">Idade</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetails;
