# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
Category.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('categories')
Category.create([{name: "Meditation / Ceremony / Prayer"}, {name: "Music / Dance / Celebration"}, {name: "March / Action"}])

AffiliatedOrganization.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('affiliated_organizations')
AffiliatedOrganization.create([{name: "Giant Mind", picture_organization: "logo/1 Giant Mind.png"}, {name: "United Religions Initiative", picture_organization: "logo/URI.jpg"}, {name: "BeThePeace​", picture_organization: "logo/BeThePeace_Logo.jpg"}, {name: "Pathways to Peace​", picture_organization: "logo/Pathways to Peace​.png"}, {name: "International Day of Peace​", picture_organization: "logo/InternationalDayofPeace.jpg"}, {name: "Summer of Peace​", picture_organization: "logo/Summerofpeace.png"}, {name: "World Peace and Prayer Society​", picture_organization: "logo/WorldPeacePrayer.png"}, {name: "We.net​", picture_organization: "logo/we.jpg"}, {name: "Compassion Games​", picture_organization: "logo/cgames.png"}, {name: "Uplift​​​", picture_organization: "logo/Uplift​​​.jpg"}, {name: "Peace One Day​", picture_organization: "logo/peaceoneday.png"}, {name: "Do As One​", picture_organization: "logo/DoAsOneLogo.png"}, {name: "Chopra Center​", picture_organization: "logo/Chopra Center​.jpg"}, {name: "Earth Dance", picture_organization: "logo/earthdance.png"}, {name: "Pachamama Alliance​", picture_organization: "logo/Pachamama.png"}, {name: "Master Shift ​", picture_organization: "logo/Master Shift​.jpg"}, {name: "MedMob​", picture_organization: "logo/MedMob.png"}, {name: "One World Still​", picture_organization: "logo/oneworldstilllogo.png"}, {name: "Art of Living​", picture_organization: "logo/ArtOfLiving.jpg"}, {name: "Oneness University​", picture_organization: "logo/Oneness.jpg"}, {name: "Humanity's Team​", picture_organization: "logo/humanitys-team.jpg"}])

AdminUser.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('admin_users')
AdminUser.create(email: "unifyadmin@unify.org", password: "peace2014", login: "unifyadmin")