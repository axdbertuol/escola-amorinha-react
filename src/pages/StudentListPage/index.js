import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import MaterialTable, { MaterialTableProps } from "material-table";
import { TablePagination, TablePaginationProps } from "@material-ui/core";

import tableIcons from "./icons";
import useStyles from "./style";
import PageWrapper from "../PageWrapper";
import { Context as AuthContext } from "../../context/AuthContext";
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

const StudentListPage = () => {
  let history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const {
    state: { students },
    removeStudent,
    didPopulate,
  } = useStudentsContext();
  const {
    state: { user },
  } = useContext(AuthContext);

  // useMemo so it doesn't rerender everytime
  const columns = React.useMemo(
    () => [
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
        dateSetting: { locale: "BR" },
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
    ],
    []
  );
  const memoizedStudents = React.useMemo(() => students, [students]);
  const tableRef = React.createRef();

  const actions = [
    {
      icon: tableIcons.Detail,
      tooltip: "Ver Detalhes",
      onClick: (event, rowData) =>
        history.push(`/student-profile/${rowData.id}`),
    },
    {
      icon: tableIcons.Edit,
      tooltip: "Editar",
      onClick: (event, rowData) => history.push(`/edit/${rowData.id}`),
    },
    {
      icon: tableIcons.Delete,
      tooltip: "Deletar",
      onClick: async (event, rowData) => {
        const shouldDelete = window.confirm(
          "Deseja mesmo remover " + rowData.name + "?"
        );
        if (shouldDelete) {
          // setIsLoading(true);
          await removeStudent(rowData.id);
          // setIsLoading(false);
          window.alert("Estudante deletado com sucesso");
        }
      },
    },
  ];
  if (user.job === "Professor") {
    // remover editar e deletar
    actions.pop(1);
    actions.pop(2);
  }

  return (
    <PageWrapper size="lg">
      <div className={classes.root}>
        <MaterialTable
          tableRef={tableRef}
          components={{
            Pagination: PatchedPagination,
          }}
          icons={tableIcons}
          isLoading={didPopulate}
          columns={columns}
          data={memoizedStudents}
          title={"Tabela de Estudantes"}
          actions={actions}
        />
      </div>
    </PageWrapper>
  );
};

export default StudentListPage;
