/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lc1212flbtk3g5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "htjgda25",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lc1212flbtk3g5")

  // remove
  collection.schema.removeField("htjgda25")

  return dao.saveCollection(collection)
})
