
// 1) callback
// 2) используй async/await
const addUser = (objectUser) => {
  return fetch('http://localhost:3001/registration', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(objectUser)
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.json().errmsg)
    })
};

const addUserCallback = (objectUser, scb, ecb) => {
  fetch('http://localhost:3001/registration', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(objectUser)
  })
    .then(resp => {
      if (resp.ok) {
        scb && scb(resp.json());
      } else {
        ecb && ecb(resp.json().errmsg)
      }
    })
};

async function addUserAsync(objectUser) {
  const result = await fetch('http://localhost:3001/registration', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(objectUser),
  });

  return result;
};

export { addUserAsync, addUserCallback, addUser };