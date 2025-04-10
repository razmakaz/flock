/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3964681569")

  // remove field
  collection.fields.removeById("text4068081590")

  // remove field
  collection.fields.removeById("text3866337329")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date4068081590",
    "max": "",
    "min": "",
    "name": "issue_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date3866337329",
    "max": "",
    "min": "",
    "name": "due_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3964681569")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4068081590",
    "max": 0,
    "min": 0,
    "name": "issue_date",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3866337329",
    "max": 0,
    "min": 0,
    "name": "due_date",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("date4068081590")

  // remove field
  collection.fields.removeById("date3866337329")

  return app.save(collection)
})
