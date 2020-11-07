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
  const response = await fetch(
    `http://localhost:3001/users?email=${email}&password=${password}`
  );

  if (response.ok) return response.json();
  throw response;
}
