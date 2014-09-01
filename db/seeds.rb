<<<<<<< HEAD
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
Category.destroy_all
Category.create([{name: "meditation/prayer"}, {name: "music/celebration"}, {name: "march/action"}])
AffiliatedOrganization.create([{name: "Giant Mind"}, {name: "United Religions Initiative"}, {name: "BeThePeace​"}, {name: "Pathways to Peace​"}, {name: "International Day of Peace​"}, {name: "Summer of Peace​"}, {name: "World Peace and Prayer Society​"}, {name: "We.net​"}, {name: "Compassion Games​"}, {name: "Uplift​​​"}, {name: "Peace One Day​"}, {name: "Do As One​"}, {name: "Chopra Center​"}, {name: "Earth Dance ​"}, {name: "Pachamama Alliance​"}, {name: "Master Shift ​"}, {name: "MedMob​"}, {name: "One World Still​"}, {name: "Art of Living​"}, {name: "Oneness University​"}, {name: "Humanity's Team​"}])