import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Button from "@material-ui/core/Button";
import { generatePath } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context as StudentsContext } from "../../context/StudentsContext";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
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
  {
    field: "edit",
    headerName: "Editar",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      let id = params.id;

      return (
        <Link component={Button} to={{ pathname: `/edit/${id}` }}>
          Editar
        </Link>
      );
    },
  },
];

const StudentListPage = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  // const [selectedId, setSelectedId] = React.useState(null);

  const {
    state: { students },
    setStudentsFromLocalStorage,
  } = React.useContext(StudentsContext);

  React.useEffect(() => {
    if (students.length === 0 && localStorage.getItem("students").length > 0) {
      setStudentsFromLocalStorage(JSON.parse(localStorage.getItem("students")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (students && query) {
      let searchResults = students.filter(({ name }) => name.match(query));
      console.log(searchResults);
      if (searchResults) {
        setResults(searchResults);
      }
    }
  }, [query, students]);
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <TextField
        id="standard-start-adornment"
        placeholder={"Search"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
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
  );
};

export default StudentListPage;
