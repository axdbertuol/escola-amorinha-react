export const populate = async (
  addStudent,
  setClassNumber,
  setAuthPeopleRelation
) => {
  try {
    const response = await fetch("/api/students");
    const data = await response.json();
    console.log("randomStudents", data);
    data.students.forEach((student) => {
      addStudent(student);
    });
  } catch (error) {
    console.log("fetch students error", error);
  }
  try {
    const response = await fetch("/api/turmas");
    const data = await response.json();
    console.log("turmas", data);
    setClassNumber(data);
  } catch (error) {
    console.log("fetch turmas error", error);
  }
  try {
    const response = await fetch("/api/pessoas-autorizadas");
    const data = await response.json();
    console.log("auth people", data);
    setAuthPeopleRelation(data);
  } catch (error) {
    console.log("fetch auth people error", error);
  }
  return true;
};
