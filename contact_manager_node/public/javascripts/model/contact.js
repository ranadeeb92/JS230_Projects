const ENDPOINT = "http://localhost:3000/api/contacts/";

// get all contacts
async function getAll() {
  try {
    let response = await fetch(ENDPOINT);
    let data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// get a single contact
async function getById(contactId) {
  try {
    let response = await fetch(ENDPOINT + contactId);
    switch (response.status) {
      case 200:
        let data = await response.json();
        return data;
      case 404:
        console.log(response.status + " : " + response.statusText);
        return response.status;
    }
  } catch (err) {
    console.error(err);
  }
}

// add contact
async function add(contactInfo) {
  try {
    let response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactInfo),
    });

    switch (response.status) {
      case 201:
        let data = await response.json();
        console.log(response.status + " : " + response.statusText);
        return data;
      case 400:
        console.log(response.status + " : " + response.statusText);
        return response.status;
    }
  } catch (err) {
    console.error(err);
  }
}

// update contact
async function update(contactInfo) {
  try {
    let response = await fetch(ENDPOINT + contactInfo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactInfo),
    });

    switch (response.status) {
      case 201:
        let data = await response.json();
        return data;
      case 400:
        console.log(response.status + " : " + response.statusText);
        return response.status;
    }
  } catch (err) {
    console.error(err);
  }
}

// delete contact
async function remove(contactId) {
  try {
    let response = await fetch(ENDPOINT + contactId, { method: "DELETE" });
    switch (response.status) {
      case 204:
        console.log(response.status + " : " + response.statusText);
        return response.status;
      case 400:
        console.log(response.status + " : " + response.statusText);
        return response.status;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getAllContacts() {
  let contacts = await getAll();
  if (contacts) {
    return contacts.map((contact) => {
      let tags = contact.tags
        ? contact.tags.split(",").map((tag) => {
            return { name: tag };
          })
        : [];
      contact.tags = tags;
      return contact;
    });
  }
  return [];
}

async function getSingleContact(id) {
  let contact = await getById(id);
  if (contact) {
    let tags = contact.tags ? contact.tags.split(",") : [];
    contact.tags = tags;
    return contact;
  }
}

async function removeContact(id) {
  remove(id);
}

async function updateContact(contact) {
  contact.tags = tagsArrayToString(contact.tags);
  contact = update(contact);
  if (contact) {
    let tags = contact.tags ? tagsStringToArray(contact.tags) : [];
    contact.tags = tags;
    return contact;
  }
}

async function addContact(contact) {
  contact.tags = tagsArrayToString(contact.tags);
  contact = add(contact);
  if (contact) {
    let tags = contact.tags ? tagsStringToArray(contact.tags) : [];
    contact.tags = tags;
    return contact;
  }
}

async function getFilteredContacts(name, tags) {
  let contacts = await getAllContacts();
  return contacts
    .filter((contact) => {
      return contact.full_name.toLowerCase().includes(name.toLowerCase());
    })
    .filter((contact) => {
      if (tags.length === 0) {
        return true;
      }
      return tags.some((tag) => {
        return contact.tags.some((ctag) => ctag.name === tag);
      });
    });
}

function tagsArrayToString(tags) {
  return tags.join(",");
}

function tagsStringToArray(str) {
  return str.split(",");
}

export {
  getAllContacts,
  getSingleContact,
  removeContact,
  updateContact,
  addContact,
  getFilteredContacts,
};
