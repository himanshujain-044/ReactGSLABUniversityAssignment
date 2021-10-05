const serverBaseUrl = "http://localhost:8080";

export async function login(loginCredentials) {
  const response = await fetch(`${serverBaseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //   console.log(response);
  const data = await response.json();
  // console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  //   const transformedQuotes = [];

  //   for (const key in data) {
  //     const quoteObj = {
  //       id: key,
  //       ...data[key],
  //     };

  //     transformedQuotes.push(quoteObj);
  //   }
  console.log(data.email);
  return { data };
}

export async function signup(userData) {
  const response = await fetch(`${serverBaseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //   console.log(response);
  const data = await response.json();
  //   console.log("hii",data);
  //   if (!response.ok) {
  //     // console.log(data);
  //     throw new Error(data.message || "Could not fetch quotes.");
  //   }

  //   const transformedQuotes = [];

  //   for (const key in data) {
  //     const quoteObj = {
  //       id: key,
  //       ...data[key],
  //     };

  //     transformedQuotes.push(quoteObj);
  //   }
  //   console.log(data.email);
  //   console.log(data);
  return data;
}
export async function logout(token) {
  const response = await fetch(`${serverBaseUrl}/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Token is not valid");
  }

  return { data };
}

export async function passwordChange(data) {
  const { token } = data;
  const passwordData = {
    ...data,
  };
  delete passwordData.token;
  const response = await fetch(`${serverBaseUrl}/change-password`, {
    method: "PATCH",
    body: JSON.stringify(passwordData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJSON = await response.json();
  //   if (!response.ok) {
  //     throw new Error(data.message || "Token is not valid");
  //   }
  console.log(responseJSON);
  return responseJSON;
}

export async function getAllQuotes() {
  const response = await fetch(`${serverBaseUrl}/login`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${serverBaseUrl}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}
