/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3461338982")

  // remove field
  collection.fields.removeById("relation2170006031")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool4245145851",
    "name": "is_deleted",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation1281549880",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "contact",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3461338982")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3414089001",
    "hidden": false,
    "id": "relation2170006031",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "profile",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("bool4245145851")

  // remove field
  collection.fields.removeById("relation1281549880")

  return app.save(collection)
})
