import { Stack, Typography } from "@mui/material";
import MBIForm from "./structure/MBIForm";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <div>
      <Grid container>
        <Grid  sx={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column'
        }} size={3} justifyContent={"center"} alignItems={"center"}>
          <img
            style={{ height: "60px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Wx1ryU8GX6Gs7ZnyC-o38SDH9xGyqxK7Dg&s"
            alt="fime"
          />
        </Grid>

        <Grid sx={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column'
        }} size={6}>
          <Typography textAlign={"center"}>
            Facultad de Ingeniería Mecánica y Eléctrica
          </Typography>
          <Typography textAlign={"center"}>
            Universidad Autonoma de Nuevo León
          </Typography>
        </Grid>

        <Grid  sx={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column'
        }} size={3} justifyContent={"center"} alignItems={"center"}>
          <img
            style={{ height: "60px" }}
            src="https://logos-world.net/wp-content/uploads/2022/05/UANL-Emblem.png"
            alt="uanl"
          />
        </Grid>
      </Grid>

      <MBIForm />
    </div>
  );
}
