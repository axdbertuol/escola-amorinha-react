import { CircularProgress, TablePagination } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import React, { useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
import PageWrapper from "../PageWrapper";
import tableIcons from "./icons";
import useStudentsContext from "../../hooks/useStudentsContext";
import useStyles from "./style";

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
  const classes = useStyles();
  const {
    state: { students },
    removeStudent,
    didPopulate,
    editStudent,
  } = useStudentsContext();
  const {
    state: { user },
  } = useContext(AuthContext);
  // useMemo so it doesn't rerender everytime
  const columns = React.useMemo(
    () => [
      { field: "id", title: "ID", width: 100, editable: "never", hidden: true },
      {
        field: "name",
        title: "Nome",
        width: 150,
        editable: "never",
      },
      {
        field: "birthday",
        title: "Data Nascimento",
        type: "date",
        dateSetting: { locale: "BR" },
        width: 180,
        editable: "never",
      },
      {
        field: "classNumber",
        title: "Turma",
        type: "string",
        width: 110,
        editable: "never",
      },
      {
        field: "grade",
        title: "Nota",
        type: "numeric",
        align: "left",
        width: 100,
        editable: user.job === "Professor" ? "onUpdate" : "never",
      },
      {
        field: "sponsorName",
        title: "Responsável",
        type: "string",
        width: 150,
        editable: "never",
      },

      {
        field: "emergencyPhone",
        title: "Tel. Emergência",
        type: "string",
        width: 170,
        editable: "never",
      },
    ],
    [user.job]
  );
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

  if (!students || students.length === 0) {
    return <CircularProgress />;
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
          data={students}
          title={"Tabela de Estudantes"}
          actions={actions}
          cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise(async (resolve, reject) => {
                const editedStudent = {
                  ...rowData,
                  [columnDef.field]: newValue,
                };
                try {
                  await editStudent(rowData.id, editedStudent);
                  setTimeout(resolve, 1000);
                } catch (error) {
                  console.log(error);
                  reject();
                }
              });
            },
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default StudentListPage;
