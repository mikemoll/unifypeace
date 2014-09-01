class Event < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_and_belongs_to_many :categories
  with_options dependent: :destroy do |relation|
    relation.has_many :affiliated_organizations
  end

  validates_presence_of :title, :category_ids, :start_date, :description, :organizer_name, :organizer_email, :location

  def date_event(timezone)
    timezone.present? ? self.date_and_time.in_time_zone(timezone) : self.date_and_time
  end

  def event_type
    if self.categories.count == 1
      self.categories.first.name
    elsif self.categories.count >= 1
      "multi"
    end
  end

end