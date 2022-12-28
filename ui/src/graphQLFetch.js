/* eslint-disable no-undef */
/* eslint-disable no-alert */
const dateRegExp = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

/** 👍🏽 checks whether the date passed is accuratef */
function jsonDateReviver(key, value) {
  if (dateRegExp.test(value)) {
    return new Date(value);
  }
  return value;
}


/** 👻 makes requests to the api to get and post information */
export default async function graphQLFetch(query, variables = {}, showSnack = null) {
  try {
    // 🚀quering database for information.
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    // 🚀 converting data into text
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    // 🫠Handling errors
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n');
        // alert(`${error.message}:\n${details}`);
        if (showSnack) showSnack(`${error.message}:\n${details}`, 'error', true);
      } else {
        // alert(`${error.extensinos.code}:${error.message}`);
        // eslint-disable-next-line no-lonely-if
        if (showSnack) showSnack(`${error.extensinos.code}:${error.message}`, 'error', true);
      }
    }
    return result.data;
  } catch (e) {
    // alert(`Error in sending data to server: ${e.message}`);
    if (showSnack) showSnack(`Error in sending data to server: ${e.message}`, 'error', true);
    return [];
  }
}
