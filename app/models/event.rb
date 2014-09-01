class Event < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_and_belongs_to_many :categories
  with_options dependent: :destroy do |relation|
    relation.has_many :affiliated_organizations
  end

  validates :title, :presence => true

  def date_event(timezone)
    timezone.present? ? self.date_and_time.in_time_zone(timezone) : self.date_and_time
  end
end