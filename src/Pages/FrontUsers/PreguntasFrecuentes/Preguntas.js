import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PaginaContext } from "../../../Context/PaginaContext";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/system";

export default function Preguntas() {
  const [expanded, setExpanded] = React.useState(false);
  const { datos } = React.useContext(PaginaContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if(datos.preguntas && datos.preguntas.length === 0) return null

  return (
    <Container maxWidth="md" id="preguntas">
      <Box mt={5} mb={3} textAlign="center">
        <Typography variant="h3">
          <b>Preguntas frecuentes</b>
        </Typography>
      </Box>
      {datos?.preguntas?.map((pregunta, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
            >
              <Typography variant="h6" sx={{ width: "100%", flexShrink: 0 }}>
                {pregunta.pregunta}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">{pregunta.respuesta}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
}
