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
    await response.json();
  } catch (error) {
    console.log("fetch students error", error);
  }
};
export const editStudent = async (student) => {
  try {
    const response = await fetch(`/api/students/${student.id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: student }),
    });
    await response.json();
  } catch (error) {
    console.log("fetch edit students error", error);
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

export const getAuthToken = async (id) => {
  try {
    const response = await fetch(`/api/auth-token/${id}`);
    const token = await response.json();
    return token;
  } catch (error) {
    console.log("fetch token error", error);
  }
};
export const verifyAuthToken = async (token) => {
  try {
    const response = await fetch(`/api/auth-token-verify/${token}`);
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log("verify token error", error);
  }
};

export const populate = async (
  addStudent,
  setClassNumber,
  setAuthPeopleRelation
) => {
  try {
    const response = await fetch("/api/turmas");
    const data = await response.json();
    setClassNumber(data);
  } catch (error) {
    console.log("fetch turmas error", error);
  }
  try {
    const response = await fetch("/api/pessoas-autorizadas");
    const data = await response.json();
    setAuthPeopleRelation(data);
  } catch (error) {
    console.log("fetch auth people error", error);
  }
  try {
    const response = await fetch("/api/students");
    const data = await response.json();
    data.students.forEach((student) => {
      addStudent(student);
    });
  } catch (error) {
    console.log("fetch students error", error);
  }
};
