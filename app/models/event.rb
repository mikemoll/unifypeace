class Event < ActiveRecord::Base

  with_options dependent: :destroy do |relation|
    relation.has_many :categories
    relation.has_many :affiliated_organizations
  end
end