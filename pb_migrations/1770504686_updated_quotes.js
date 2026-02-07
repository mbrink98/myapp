/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lc1212flbtk3g5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t00oxq6h",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lc1212flbtk3g5")

  // remove
  collection.schema.removeField("t00oxq6h")

  return dao.saveCollection(collection)
})
