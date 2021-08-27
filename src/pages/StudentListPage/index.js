import React, { useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { Context as StudentsContext } from "../../context/StudentsContext";
import PageWrapper from "../PageWrapper";

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
    width: 110,
  },
  {
    field: "sponsorName",
    headerName: "Nome Responsável",
    width: 110,
  },

  {
    field: "emergencyPhone",
    headerName: "Tel Emergência",
    type: "number",
    width: 110,
  },
  {
    field: "classNumber",
    headerName: "Nmr classe",
    type: "string",
    width: 110,
  },
];

const StudentListPage = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  let history = useHistory();

  columns.push({
    field: "edit",
    headerName: "Editar",
    width: 100,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      let id = params.id;

      return (
        <Button onClick={() => history.push(`/edit/${id}`)}>Editar</Button>
      );
    },
  });

  const {
    state: { students },
  } = useContext(StudentsContext);

  // useEffect(() => {
  //   console.log(students);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (students && query) {
      let searchResults = students.filter(({ name }) => name.match(query));
      console.log(searchResults);
      if (searchResults) {
        setResults(searchResults);
      }
    }
  }, [query, students]);
  return (
    <PageWrapper title={"Registro de Alunos"} size="md">
      <div style={{ height: "600px", width: "100%" }}>
        <TextField
          id="standard-start-adornment"
          placeholder={"Search"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          variant="filled"
          type="search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <DataGrid columns={columns} rows={query ? results : students} />
      </div>
    </PageWrapper>
  );
};

export default StudentListPage;
