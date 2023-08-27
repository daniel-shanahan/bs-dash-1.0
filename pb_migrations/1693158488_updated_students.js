/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f22wwf9nj4ef458")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgu2aux2",
    "name": "brainskillsId",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f22wwf9nj4ef458")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgu2aux2",
    "name": "userId",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
