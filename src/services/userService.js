export async function saveUser(user) {
  const newUser = Object.assign({}, user, { timestamp: new Date().getTime() });

  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (response.ok) return response.json();
  throw response;
}

export async function updateUser(user) {
  const { id } = user;
  const newUser = Object.assign({}, user, { timestamp: new Date().getTime() });

  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (response.ok) return response.json();
  throw response;
}

export async function getUser(email, password) {
  const users = await _getAllUser();
  const user = users.find((user) => user.email === email);
  if (!(user instanceof Object)) return [];

  const response = await fetch(
    `http://localhost:3001/users?email=${user.email}&password=${password}`
  );

  if (!response.ok) throw response;

  const json = await response.json();
  if (json.length) return json;
  throw new Error("the email or password is not correct");
}

async function _getAllUser() {
  const response = await fetch("http://localhost:3001/users");
  if (response.ok) return response.json();
  throw response;
}
