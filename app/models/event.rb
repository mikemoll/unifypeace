class Event < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
  geocoded_by :location

  alias_attribute :lat, :latitude
  alias_attribute :long, :longitude

  has_and_belongs_to_many :categories
  with_options dependent: :destroy do |relation|
    relation.has_many :affiliated_organizations
  end
  belongs_to :user

  scope :approved, -> { where(["status = ? AND latitude IS NOT NULL AND longitude IS NOT NULL", "approved"]) }

  validates_presence_of :title, :category_ids, :start_date, :description, :organizer_name, :organizer_email, :location

  def date_event(timezone)
    timezone.present? ? self.start_date.in_time_zone(timezone) : self.start_date
  end

  def event_type
    if self.categories.count == 1
      self.categories.first.name
    elsif self.categories.count >= 1
      "multi"
    end
  end

  def link
    self.website_link.present? ? self.website_link : "#"
  end
end