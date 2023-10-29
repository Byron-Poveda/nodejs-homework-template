const express = require('express')
const models = require('../../models/contacts')

const router = express.Router()
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await models.listContacts()

    res.status(200).json(result)
    
  
  } catch (error) {
    res.status(500).json({"message": "internal error"})
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params

    const result = await models.getContactById(contactId)
  
    if(result.length === 0) return res.status(404).json({"message": "Not found"})
  
    res.status(200).json(result)
    
  } catch (error) {
    
    res.status(500).json({"message": "internal error"})

  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const newContact = req.body
    
    const result = await models.addContact(newContact)

    if(!result) return res.status(409).json({ "message": `Contacto con el nombre ${req.body.name} ya esta en la lista de contactos` })

    res.status(201).send(result)
  
  } catch (error) {

    res.status(500).json({"message": "internal error"})
  
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {

    const { contactId } = req.params

    const result = await models.removeContact(contactId)
    
    if(result.length === 0) return res.status(404).json({"message": "Not found"})
    
    res.status(204).json(result)

  } catch (error) {
    res.status(500).json({"message": "internal error"})
  }

})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const newContact = req.body
        
    const { error } = schema.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const result = await models.updateContact(contactId, newContact)

    if(result.length === 0) return res.status(404).json({"message": "Not found"})

    res.status(201).send(result)
  
  } catch (error) {
    
    res.status(500).json({"message": "internal error"})

  }
})

module.exports = router
