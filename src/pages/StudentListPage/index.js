import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Context as StudentsContext } from "../../context/StudentsContext";

const makeStudents = () => {
  let array = [];
  for (let index = 0; index < 10; index++) {
    const student = {
      id: index,
      name: "oi" + index,
      birthday: "11/10/91",
      sponsorName: "jesus" + index,
      emergencyPhone: "(99) 98867-1232",
      classNumber: "1234124",
    };
    array.push(student);
  }
  return array;
};

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Nome",
    width: 150,
    editable: true,
  },
  {
    field: "birthday",
    headerName: "Data Nascimento",
    type: "date",
    width: 110,
    editable: true,
  },
  {
    field: "sponsorName",
    headerName: "Nome Responsável",
    width: 110,
    editable: true,
  },

  {
    field: "emergencyPhone",
    headerName: "Tel Emergência",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "classNumber",
    headerName: "Nmr classe",
    type: "number",
    width: 110,
    editable: true,
  },
];

let studentsArray = makeStudents();
const StudentListPage = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const {
    state: { students },
    setStudentsFromLocalStorage,
  } = React.useContext(StudentsContext);

  React.useEffect(() => {
    if (students.length === 0 && localStorage.getItem("students").length > 0) {
      setStudentsFromLocalStorage(JSON.parse(localStorage.getItem("students")));
    }
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
    <div style={{ height: "800px", width: "100%" }}>
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
