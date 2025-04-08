/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1065113382")

  // update collection data
  unmarshal({
    "name": "public_licenses"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1065113382")

  // update collection data
  unmarshal({
    "name": "licenses"
  }, collection)

  return app.save(collection)
})
