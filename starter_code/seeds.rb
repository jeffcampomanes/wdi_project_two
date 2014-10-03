require 'pry'
require_relative './db/connection'
require_relative './lib/category'
require_relative './lib/contact'

Category.delete_all
Contact.delete_all

friends = Category.create(name: "friends")
family = Category.create(name: "family")
co_worker = Category.create(name: "co_worker")

Contact.create(name: "Jeff", age: "25", address: "NJ", phone_number: "9737484854", picture: " ", category_id: friends.id)
Contact.create(name: "Ray", age: "29", address: "NJ", phone_number: "9737484854", picture: " ", category_id: family.id)
# Contact.create(name: "Jeff", category_id: family.id)
# Contact.create(name: "Neel", category_id: co_worker.id)
