import React, { useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Context as StudentsContext } from "../../context/StudentsContext";
import PageWrapper from "../PageWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    border: `5px solid ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    marginBottom: "5rem",
    boxShadow: theme.shadows[10],

    height: "400px",
    width: "100%",
  },
  searchbar: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    border: `2px solid ${theme.palette.primary.dark}`,
    overflow: "hidden",
    marginBottom: "0.2rem",
    width: "50%",
  },
}));

let columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Nome",
    width: 150,
  },
  {
    field: "birthday",
    headerName: "Data Nascimento",
    type: "date",
    width: 150,
  },
  {
    field: "sponsorName",
    headerName: "Responsável",
    width: 110,
  },

  {
    field: "emergencyPhone",
    headerName: "Tel. Emergência",
    type: "string",
    width: 170,
  },
  {
    field: "classNumber",
    headerName: "Turma",
    type: "string",
    width: 110,
  },
];

const StudentListPage = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  let history = useHistory();
  const classes = useStyles();

  columns.push({
    field: "edit",
    headerName: "Editar",
    width: 110,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      let id = params.id;

      return (
        <Button variant="contained" onClick={() => history.push(`/edit/${id}`)}>
          Editar
        </Button>
      );
    },
  });

  const {
    state: { students },
  } = useContext(StudentsContext);

  useEffect(() => {
    if (students && query) {
      console.log(students);
      let searchResults = students.filter(({ name }) => {
        return name.match(new RegExp(query, "gi"));
      });
      if (searchResults) {
        setResults(searchResults);
      }
    }
  }, [query, students]);
  return (
    <PageWrapper title={"Lista de Alunos"} size="md">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="searchbar"
          name="searchbar"
          // placeholder={"Busque um aluno pelo nome"}
          label="Busque aqui"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          color="primary"
          className={classes.searchbar}
          variant="filled"
          type="search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchOutlined onClick={(e) => setQuery(e.target.value)} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={classes.root}>
        <DataGrid
          color="primary"
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={query ? results : students}
        />
      </div>
    </PageWrapper>
  );
};

export default StudentListPage;
