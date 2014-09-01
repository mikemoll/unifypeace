json.array!(@events) do |event|
  json.extract! event, :id, :title, :category_id, :website_link, :date_and_time, :description, :location, :organizer_name, :organizer_email, :affiliated_organization_id, :latitude, :longitude
  json.url event_url(event, format: :json)
end
