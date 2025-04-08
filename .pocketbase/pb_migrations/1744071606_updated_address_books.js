/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2492096707")

  // update collection data
  unmarshal({
    "name": "public_address_books"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2492096707")

  // update collection data
  unmarshal({
    "name": "address_books"
  }, collection)

  return app.save(collection)
})
