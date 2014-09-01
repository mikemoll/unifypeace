# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
Category.destroy_all
Category.create([{name: "meditation/prayer"}, {name: "music/celebration"}, {name: "march/action"}, {name: "other"}])
AffiliatedOrganization.destroy_all
AffiliatedOrganization.create([{name: "Giant Mind", picture_organization: "1 Giant Mind.png"}, {name: "United Religions Initiative", picture_organization: "URI.jpg"}, {name: "BeThePeace​", picture_organization: "BeThePeace_Logo.jpg"}, {name: "Pathways to Peace​", picture_organization: "Pathways to Peace​.png"}, {name: "International Day of Peace​", picture_organization: "InternationalDayofPeace.jpg"}, {name: "Summer of Peace​", picture_organization: "Summerofpeace.png"}, {name: "World Peace and Prayer Society​", picture_organization: "WorldPeacePrayer.png"}, {name: "We.net​", picture_organization: "we.jpg"}, {name: "Compassion Games​", picture_organization: "cgames.png"}, {name: "Uplift​​​", picture_organization: "Uplift​​​.jpg"}, {name: "Peace One Day​", picture_organization: "peaceoneday.png"}, {name: "Do As One​", picture_organization: "DoAsOneLogo.png"}, {name: "Chopra Center​", picture_organization: "Chopra Center​.jpg"}, {name: "Earth Dance", picture_organization: "earthdance.png"}, {name: "Pachamama Alliance​", picture_organization: "Pachamama.png"}, {name: "Master Shift ​", picture_organization: "Master Shift​.jpg"}, {name: "MedMob​", picture_organization: "MedMob.png"}, {name: "One World Still​", picture_organization: "oneworldstilllogo.png"}, {name: "Art of Living​", picture_organization: "ArtOfLiving.jpg"}, {name: "Oneness University​", picture_organization: "Oneness.jpg"}, {name: "Humanity's Team​", picture_organization: "humanitys-team.jpg"}])