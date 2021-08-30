import React, { useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import { InputAdornment, IconButton, TextField } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
// import MaterialTable from "material-table";

import MaterialTable, { MaterialTableProps } from "material-table";
import { TablePagination, TablePaginationProps } from "@material-ui/core";

import tableIcons from "./icons";
import useStyles from "./style";
import PageWrapper from "../PageWrapper";
import useStudentsContext from "../../hooks/useStudentsContext";

// workaround for material-ui bug
function PatchedPagination(props) {
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
  // const [query, setQuery] = React.useState("");
  // const [results, setResults] = React.useState([]);
  // const [rowDeletedId, setRowDeletedId] = React.useState(undefined);
  let history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const {
    state: { students },
    removeStudent,
    // didPopulate,
  } = useStudentsContext();
  const tableRef = React.createRef();

  return (
    <PageWrapper title={"Lista de Alunos"} size="lg">
      <div className={classes.root}>
        <MaterialTable
          tableRef={tableRef}
          components={{
            Pagination: PatchedPagination,
          }}
          icons={tableIcons}
          columns={columns}
          data={students}
          title={"Tabela de Estudantes"}
          actions={[
            {
              icon: tableIcons.Detail,
              tooltip: "Ver Detalhes",
              // onClick: (event, rowData) => history.push(`/edit/${rowData.id}`),
            },
            {
              icon: tableIcons.Edit,
              tooltip: "Editar",
              onClick: (event, rowData) => history.push(`/edit/${rowData.id}`),
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Deletar",
              onClick: (event, rowData) => {
                const shouldDelete = window.confirm(
                  "Deseja mesmo remover " + rowData.name + "?"
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
