import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from "@mui/material";
import Header from "../../Header/Header";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { tokens } from "../../../theme";

export default function Faq() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
  <Box mt="25px" p={'0 1.5rem'}>
    <Header title="FAQ" subTitle="Frequently Asked Questions Page" />

    <Accordion sx={{ mt:"30px" }} defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography color={colors.greenAccent[500]} variant="h5">
        An Important Question
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Typography color={colors.greenAccent[100]} variant="h5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consequuntur eveniet voluptates omnis quod, laudantium delectus cupiditate quidem? Animi reiciendis iure qui soluta eligendi delectus, beatae temporibus nostrum mollitia ducimus asperiores, tempore ipsa sunt. Quasi inventore aliquam cupiditate laboriosam, voluptates, a sequi, perspiciatis dolore voluptatibus molestias nesciunt quo sunt libero.
      </Typography>
      </AccordionDetails>
    </Accordion>

    <Accordion sx={{ mt:"30px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography color={colors.greenAccent[500]} variant="h5">
        An Important Question
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Typography color={colors.greenAccent[100]} variant="h5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consequuntur eveniet voluptates omnis quod, laudantium delectus cupiditate quidem? Animi reiciendis iure qui soluta eligendi delectus, beatae temporibus nostrum mollitia ducimus asperiores, tempore ipsa sunt. Quasi inventore aliquam cupiditate laboriosam, voluptates, a sequi, perspiciatis dolore voluptatibus molestias nesciunt quo sunt libero.
      </Typography>
      </AccordionDetails>
    </Accordion>


    <Accordion sx={{ mt:"30px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography color={colors.greenAccent[500]} variant="h5">
        An Important Question
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Typography color={colors.greenAccent[100]} variant="h5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consequuntur eveniet voluptates omnis quod, laudantium delectus cupiditate quidem? Animi reiciendis iure qui soluta eligendi delectus, beatae temporibus nostrum mollitia ducimus asperiores, tempore ipsa sunt. Quasi inventore aliquam cupiditate laboriosam, voluptates, a sequi, perspiciatis dolore voluptatibus molestias nesciunt quo sunt libero.
      </Typography>
      </AccordionDetails>
    </Accordion>


    <Accordion sx={{ mt:"30px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography color={colors.greenAccent[500]} variant="h5">
        An Important Question
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Typography color={colors.greenAccent[100]} variant="h5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consequuntur eveniet voluptates omnis quod, laudantium delectus cupiditate quidem? Animi reiciendis iure qui soluta eligendi delectus, beatae temporibus nostrum mollitia ducimus asperiores, tempore ipsa sunt. Quasi inventore aliquam cupiditate laboriosam, voluptates, a sequi, perspiciatis dolore voluptatibus molestias nesciunt quo sunt libero.
      </Typography>
      </AccordionDetails>
    </Accordion>


    <Accordion sx={{ mt:"30px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography color={colors.greenAccent[500]} variant="h5">
        An Important Question
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Typography color={colors.greenAccent[100]} variant="h5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consequuntur eveniet voluptates omnis quod, laudantium delectus cupiditate quidem? Animi reiciendis iure qui soluta eligendi delectus, beatae temporibus nostrum mollitia ducimus asperiores, tempore ipsa sunt. Quasi inventore aliquam cupiditate laboriosam, voluptates, a sequi, perspiciatis dolore voluptatibus molestias nesciunt quo sunt libero.
      </Typography>
      </AccordionDetails>
    </Accordion>


    <Accordion sx={{ mt:"30px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography color={colors.greenAccent[500]} variant="h5">
        An Important Question
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Typography color={colors.greenAccent[100]} variant="h5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consequuntur eveniet voluptates omnis quod, laudantium delectus cupiditate quidem? Animi reiciendis iure qui soluta eligendi delectus, beatae temporibus nostrum mollitia ducimus asperiores, tempore ipsa sunt. Quasi inventore aliquam cupiditate laboriosam, voluptates, a sequi, perspiciatis dolore voluptatibus molestias nesciunt quo sunt libero.
      </Typography>
      </AccordionDetails>
    </Accordion>


    <Accordion sx={{ mt:"30px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography color={colors.greenAccent[500]} variant="h5">
        An Important Question
      </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Typography color={colors.greenAccent[100]} variant="h5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consequuntur eveniet voluptates omnis quod, laudantium delectus cupiditate quidem? Animi reiciendis iure qui soluta eligendi delectus, beatae temporibus nostrum mollitia ducimus asperiores, tempore ipsa sunt. Quasi inventore aliquam cupiditate laboriosam, voluptates, a sequi, perspiciatis dolore voluptatibus molestias nesciunt quo sunt libero.
      </Typography>
      </AccordionDetails>
    </Accordion>
  </Box>
  )
}
