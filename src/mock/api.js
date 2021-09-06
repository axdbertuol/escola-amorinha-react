export const deleteStudent = async (id) => {
  try {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    // const data = await response.json();
  } catch (error) {
    console.log("fetch delete students error", error);
  }
};
export const addStudent = async (student) => {
  try {
    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify(student),
    });
    const data = await response.json();
    console.log("addStudent", data);
  } catch (error) {
    console.log("fetch students error", error);
  }
};

export const verifyUser = async (user) => {
  try {
    const response = await fetch("/api/auth-user", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data.user;
  } catch (error) {}
};

export const populate = async (
  addStudent,
  setClassNumber,
  setAuthPeopleRelation
) => {
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
  try {
    const response = await fetch("/api/students");
    const data = await response.json();
    console.log("randomStudents", data);
    data.students.forEach((student) => {
      console.log("student in api", student);
      addStudent(student);
    });
  } catch (error) {
    console.log("fetch students error", error);
  }
};
