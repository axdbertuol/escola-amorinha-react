export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function parseDate(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

export function getLabel(key) {
  switch (key) {
    case "id":
      return "ID";
    case "name":
      return "Nome";
    case "surname":
      return "Sobrenome";
    case "birthday":
      return "Data Nascimento";
    case "grade":
      return "Nota";
    case "sponsorName":
      return "Nome Responsável";
    case "sponsorPhone":
      return "Tel. Responsável";
    case "sponsorType":
      return "Relação Responsável";
    case "emergencyPhone":
      return "Tel. Emergência";
    case "foodRestriction":
      return "Restrição Alimentar";
    case "authorizeStudentImage":
      return "Autorização uso de Imagem";
    case "authorizedPeople":
      return "Pessoas Autorizadas";
    case "classNumber":
      return "Turma";
    case "additionalInfo":
      return "Info Adicional";
    default:
      return key;
  }
}
