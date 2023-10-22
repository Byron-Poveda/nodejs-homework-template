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
  const result = await models.listContacts()

  res.status(200).json(result)

  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const result = await models.getContactById(contactId)

  res.json(result)
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const newContact = req.body
    
    const result = await models.addContact(newContact)

    res.status(201).send(result)
  
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const result = await models.removeContact(contactId)

  res.json(result)
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const newContact = req.body
        
    const { error } = schema.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const result = await models.updateContact(contactId, newContact)

    res.status(201).send(result)
  
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
