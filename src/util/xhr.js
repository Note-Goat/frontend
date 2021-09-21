import {apiHost} from "../constants";

export async function xhrGet(path, accessToken) {
  const options = accessToken ? {
    credentials: "include",
  } : null;
  return (await fetch(apiHost + "/" + path, options)).json();
}

export async function xhrPost(path, data, accessToken) {
  return fetch(apiHost + "/" + path, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      ...data,
    }),
  });
}

export async function xhrPut(path, data, accessToken) {
  return fetch(apiHost + "/" + path, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      ...data,
    }),
  });
}

export async function xhrDelete(path, accessToken) {
  return fetch(apiHost + "/" + path, {
    method: "DELETE",
    credentials: "include",
  });
}
