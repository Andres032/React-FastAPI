import {
  AppBar, Toolbar, Button, Box, TableContainer, Table,
  TableRow, TableCell, TableBody, TextField
} from '@material-ui/core';
import {useState} from 'react' 
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState({})
  const fetchMovies = async () => {
    const response = await axios.get('http://localhost:8000/')
    return setMovies(response.data)
  }

  //fetchMovies()
  const fetchMovie = async (id) => {
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setMovie(response.data)
  }

  const createOrEditUser = async () => {
    if(movie.id){
      await axios.put(`http://localhost:8000/${movie.id}`, movie)

    }else{
      await axios.post(`http://localhost:8000/`, movie)
    }
    await fetchMovies()
    await setMovie({id: '0', nombre:'', idioma: '', estreno: '', director: '', sipnosis: ''})
  }
  
  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:8000/${id}`)
    await fetchMovies()
  }
  
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Peliculas</Button>
        </Toolbar>
      </AppBar>
      
      <h1 align="center">LIST MOVIE</h1>

      <Box m={10}>
        <TableContainer >
          <TextField value={movie.id} type="hidden"/>
          <Table aria-label="simple table">
            <TableBody>

            <TableRow>
              <TableCell>
                <TextField value={movie.nombre} id="standard-basic"
                onChange={(e) => setMovie({...movie, nombre:e.target.value})}
                 label="Nombre"/>

              </TableCell>

              <TableCell >
              <TextField value={movie.idioma} id="standard-basic" onChange={(e) => setMovie({...movie, idioma:e.target.value})} label="Idioma"/>
              </TableCell>

              <TableCell>
              <TextField  type="date" value={movie.estreno} id="standard-basic" onChange={(e) => setMovie({...movie, estreno:e.target.value})} label="Estreno"/>
              </TableCell>

              <TableCell >
              <TextField value={movie.director} id="standard-basic" onChange={(e) => setMovie({...movie, director:e.target.value})} label="Director"/>
              </TableCell>

              <TableCell >
              <TextField value={movie.sipnosis} id="standard-basic" onChange={(e) => setMovie({...movie, sipnosis:e.target.value})} label="Sipnosis"/>
              </TableCell>

              <TableCell >
              <Button
              onClick={()=> createOrEditUser()} variant="contained" color="primary">
                      Submit
                    </Button>
              </TableCell>
              

            </TableRow>
            

            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell >Idioma</TableCell>
              <TableCell >Estreno</TableCell>
              <TableCell >Director</TableCell>
              <TableCell >Sipnosis</TableCell>
              <TableCell >Editar</TableCell>
              <TableCell >Eliminar</TableCell>
            </TableRow>

            
              {movies.map((row) => (
                <TableRow key={row.id}>
                  <TableCell >{row.nombre}</TableCell>
                  <TableCell >{row.idioma}</TableCell>
                  <TableCell >{row.estreno}</TableCell>
                  <TableCell >{row.director}</TableCell>
                  <TableCell >{row.sipnosis}</TableCell>
                  <TableCell>
                  <Button 
                  onClick={()=> fetchMovie(row.id)} variant="contained" color="primary">
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                  <Button  onClick={()=> deleteMovie(row.id)} variant="contained" color="secondary">
                      Eliminar
                    </Button>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </Box>
    </div>


  );
}

export default App;
