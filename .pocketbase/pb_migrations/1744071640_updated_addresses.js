/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_199332750")

  // update collection data
  unmarshal({
    "name": "public_addresses"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_199332750")

  // update collection data
  unmarshal({
    "name": "addresses"
  }, collection)

  return app.save(collection)
})
