/* const addUser = (objectUser) => {
  return fetch('http://localhost:3001/registration', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(objectUser)
  })
    .then(resp => {
      if (resp.ok) {
        console.log('.........resp.....', resp);
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
}; */

async function addUserAsync(objectUser) {
  const result = await fetch('http://localhost:3001/registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objectUser),
  });

  return result;
}

async function login(objectUser) {
  const result = await fetch('http://localhost:3001/entry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objectUser),
  });

  return result.json();
}


async function addItemList(objectList, authorization) {
  await fetch('http://localhost:3001/addNewItem', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${authorization}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objectList),
  });

  return objectList;
}

async function findNumberPhoneList(number, authorization) {
  const result = await fetch('http://localhost:3001/findList', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${authorization}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(number),
  });

  return result.json();
}

async function updateItemIsDone(object, authorization) {
  const result = await fetch('http://localhost:3001/updateItem', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${authorization}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  });

  return result.json();
}
export {
  addUserAsync, login, addItemList, findNumberPhoneList, updateItemIsDone,
};
