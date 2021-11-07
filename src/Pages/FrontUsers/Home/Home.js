import React, { Fragment } from "react";
import { Box } from "@material-ui/core";
import { PaginaContext } from "../../../Context/PaginaContext";
import BannerPromocional from "../Banner/BannerPromocional";
import Preguntas from "../PreguntasFrecuentes/Preguntas";
import QuienesSomos from "../QuienesSomos/QuienesSomos";
import RelojSorteo from "../RelojSorteo/RelojSorteo";
import VideosDeGanadores from "../VideosPremios/VideosDeGanadores";
import { Parallax } from "rc-scroll-anim";
import Boletos from "../Boletos/Boletos";

export default function Home() {
  const { datos } = React.useContext(PaginaContext);
  return (
    <Fragment>
      <Box>
        <BannerPromocional />
      </Box>
      <Box
        style={{ background: "#000", color: "#fff" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <RelojSorteo />
      </Box>
      <Boletos type="FRENTE" />
      {datos?.quienes_somos === undefined ? null : (
        <Box mt={5}>
          <Parallax
            animation={{ x: 0, opacity: 1, playScale: [0.0, 0.8] }}
            style={{ transform: "translateX(80px)", opacity: 0 }}
          >
            <Box>
              <QuienesSomos />
            </Box>
          </Parallax>
        </Box>
      )}

      {datos?.preguntas?.length === 0 ? null : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Parallax
            animation={{ x: 0, opacity: 1, playScale: [0.0, 0.8] }}
            style={{ transform: "translateX(-80px)", opacity: 0 }}
          >
            <Preguntas />
          </Parallax>
        </Box>
      )}
      <Box my={2}>
        {datos?.videos_ganadores?.length === 0 ? null : <VideosDeGanadores />}
      </Box>
    </Fragment>
  );
}
