const fs = require('fs/promises')
const path = require("path")
const crypto = require('crypto')
const pathContacts = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  try {
    const result = (await fs.readFile(pathContacts)).toString()

    return JSON.parse(result)

  } catch (error) {
    console.warn(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const result = await JSON.parse((await fs.readFile(pathContacts)).toString())

    const contactById = result.filter(contact => contact.id === contactId)


    return contactById;
    
  } catch (error) {
    console.warn(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const result = await JSON.parse((await fs.readFile(pathContacts)).toString())

    const verifyResult = result.filter(contact => contact.id === contactId);
    
    if(verifyResult.length === 0) return verifyResult
    
    const newResult = result.filter(contact => contact.id !== contactId);

  
  
    await fs.writeFile(pathContacts, JSON.stringify(newResult))

    return {"message": `Contact with id ${contactId} has been deleted`};    
  
  } catch (error) {
    console.warn(error)
  }
}

const addContact = async (body) => {
  try {

    const result = (await fs.readFile(pathContacts)).toString()
    
    const contacts = JSON.parse(result)

    if(contacts.filter(contact => contact.name === body.name).length >= 1) return false

    
    const newContact = {id: crypto.randomUUID(), ...body}

    contacts.push(newContact);

    await fs.writeFile(pathContacts, JSON.stringify(contacts));

    return { "message": body };

  } catch (error) {
    console.warn(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const result = await JSON.parse((await fs.readFile(pathContacts)).toString())

    const contactById = result.filter(contact => contact.id === contactId);
    
    if(contactById.length === 0) return contactById

    const newResult = {id: crypto.randomUUID(), ...body}

    contactById.push(newResult)

    await fs.writeFile(pathContacts, JSON.stringify(contactById))

    return {"message": `Contact with id ${contactId} has been update`};    
  
  } catch (error) {
    console.warn(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
