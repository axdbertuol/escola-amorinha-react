import React, { forwardRef, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import MaterialTable, { MaterialTableProps } from "material-table";
import { TablePagination, TablePaginationProps } from "@material-ui/core";

import PageWrapper from "../PageWrapper";
import useStudentsContext from "../../hooks/useStudentsContext";
function PatchedPagination(props: TablePaginationProps) {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  return (
    <TablePagination
      {...tablePaginationProps}
      // @ts-expect-error onChangePage was renamed to onPageChange
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        return (
          // @ts-expect-error ActionsComponent is provided by material-table
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
          />
        );
      }}
    />
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    border: `5px solid ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    marginBottom: "5rem",
    boxShadow: theme.shadows[10],

    // height: "500px",
    width: "100%",
  },
  searchbar: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    border: `2px solid ${theme.palette.primary.dark}`,
    overflow: "hidden",
    marginBottom: "0.2rem",
    width: "70%",
  },
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
let columns = [
  { field: "id", title: "ID", width: 100 },
  {
    field: "name",
    title: "Nome",
    width: 150,
  },
  {
    field: "birthday",
    title: "Data Nascimento",
    type: "date",
    width: 180,
  },
  {
    field: "sponsorName",
    title: "Responsável",
    type: "string",
    width: 150,
  },

  {
    field: "emergencyPhone",
    title: "Tel. Emergência",
    type: "string",
    width: 170,
  },
  {
    field: "classNumber",
    title: "Turma",
    type: "string",
    width: 110,
  },
];

const StudentListPage = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [rowDeletedId, setRowDeletedId] = React.useState(undefined);
  let history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const { state, removeStudent } = useStudentsContext();
  const students = state.students;

  useEffect(() => {
    if (students && query) {
      let searchResults = students.filter(({ name }) => {
        return name.match(new RegExp(query, "gi"));
      });
      if (searchResults) {
        setResults(searchResults);
      }
    }
  }, [query, students]);

  return (
    <PageWrapper title={"Lista de Alunos"} size="lg">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="searchbar"
          name="searchbar"
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
        <MaterialTable
          components={{
            Pagination: PatchedPagination,
          }}
          icons={tableIcons}
          columns={columns}
          data={students}
          title={"Tabela de Estudantes"}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: "Edit User",
              onClick: (event, rowData) => history.push(`/edit/${rowData.id}`),
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Delete User",
              onClick: (event, rowData) => {
                const shouldDelete = window.confirm(
                  "You want to delete " + rowData.name
                );
                if (shouldDelete) {
                  removeStudent(rowData.id);
                  window.alert("Estudante deletado com sucesso");
                }
              },
            },
          ]}
        />
      </div>
    </PageWrapper>
  );
};

export default StudentListPage;
