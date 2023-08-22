/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kabexpzsbg4r4h4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "kabexpzsbg4r4h4",
    "created": "2023-08-20 20:52:00.907Z",
    "updated": "2023-08-20 20:52:00.907Z",
    "name": "students",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bbffqjeq",
        "name": "userId",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qb7ifdng",
        "name": "firstName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "caw8fhtj",
        "name": "lastName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
