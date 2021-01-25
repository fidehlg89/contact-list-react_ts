export const url = 'http://localhost:5000'

const headers = {
    'Accept': 'application/json',
}

export function getAll(){
    let contacts=[]
    fetch(`${url}/contacts`, { headers })
        .then(res => res.json())
        .then(data => {
            for (let x in data) {
                var contact = data[x];
                contacts.push(contact);
              }
            }
        )
    return contacts
}



export const create = (body) =>
    fetch(`${url}/contacts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

export const update = (contact, body) =>
    fetch(`${url}/contacts/${contact.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

export const remove = (contact) =>
    fetch(`${url}/contacts/${contact.id}`, { method: 'DELETE', headers })
        .then(res => res.json())
        .then(data => data.contact)