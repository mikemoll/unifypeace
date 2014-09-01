class Event < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_and_belongs_to_many :categories
  with_options dependent: :destroy do |relation|
    relation.has_many :affiliated_organizations
  end

  validates_presence_of :title, :category_ids, :start_date, :description, :organizer_name, :organizer_email, :location
end