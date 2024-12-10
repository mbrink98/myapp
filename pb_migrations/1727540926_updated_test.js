/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lc1212flbtk3g5")

  collection.name = "quotes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lc1212flbtk3g5")

  collection.name = "test"

  return dao.saveCollection(collection)
})
