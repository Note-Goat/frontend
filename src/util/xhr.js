import {apiHost} from "../constants";

export async function xhrGet(path, accessToken) {
  const options = accessToken ? {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  } : null;
  return (await fetch(apiHost + "/" + path, options)).json();
}

export async function xhrPost(path, data, accessToken) {
  return fetch(apiHost + "/" + path, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ...data,
    }),
  });
}

export async function xhrPut(path, data, accessToken) {
  return fetch(apiHost + "/" + path, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ...data,
    }),
  });
}

export async function xhrDelete(path, accessToken) {
  return fetch(apiHost + "/" + path, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
