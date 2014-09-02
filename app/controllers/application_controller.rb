class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :set_event_count

  def get_marker_and_location(contents)
    if !contents.blank?
      markers = contents.map do |content|
        tmp_content = [content.lat, content.long]

        if content.categories.count == 1
          tmp_content << (content.categories.first.name)
        else
          tmp_content << ("multi")
        end

        tmp_content << (render_to_string "layouts/_tooltip", locals: { content: content }, layout: false)
        tmp_content
      end
    end
  end

  private

  def set_event_count
    @event_count = Event.where(status: "approved").count
  end

  def set_location
    if session[:location]
      @location = session[:location].symbolize_keys!
    else
      set_user_location
      session[:location] = @location.symbolize_keys!
    end
  end

  def set_user_location
    ip_address = request.ip.eql?("127.0.0.1") ? "94.12.233.96" : request.ip

    location = Geocoder.search(ip_address).first rescue nil

    @location = { country_name: location.country, region: location.state, city_name: location.city, latitude: location.latitude, longitude: location.longitude, address: location.address, postal_code: location.postal_code, area: "worldwide", map_type: "leaflet" } if location

    if @location.blank?
      location = GeoIP.new('lib/GeoLiteCity.dat').city(ip_address)

      @location = { country_name: location.country_name, region: location.real_region_name, city_name: location.city_name, latitude: location.latitude, longitude: location.longitude, address: [location.city_name, location.region_name, location.country_name].join(", "), postal_code: location.postal_code, area: "worldwide", map_type: "leaflet" } if location
    end

    @location.symbolize_keys!

    return @location
  end

  def set_title_location(location)
    if location[:area].eql?("worldwide")
      @type = "Worldwide"
      @nearby = " "
    else
      @type = location[:address]
      @nearby = " whitin #{@location[:nearby]} km of "
    end
  end
end
