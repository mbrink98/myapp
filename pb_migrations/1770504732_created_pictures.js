/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "46tu3u6bfyfuk3u",
    "created": "2026-02-07 22:52:12.386Z",
    "updated": "2026-02-07 22:52:12.386Z",
    "name": "pictures",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qmyluubb",
        "name": "author",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "il2ma9py",
        "name": "headshot",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("46tu3u6bfyfuk3u");

  return dao.deleteCollection(collection);
})
