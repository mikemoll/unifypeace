class HomeController < ApplicationController
  before_filter :set_user_location, only: [:new, :page_not_found]
  before_filter :set_location, only: [:index, :page_not_found, :tags]

  def index
    if @location
      @all = []

      @all << if @location["area"].eql? "worldwide"
        Event.all
      else
        Event.where('(city = ? OR country = ?)', @location[:city_name], @location[:country_name]).near([@location[:latitude], @location[:longitude]], 20, units: :km) rescue nil
      end

      @all = @all.flatten
      @markers = get_marker_and_location(@all) if @all rescue nil
    end

    set_title_location(@location)
  end

  # def preview
  #   @preview = eval(params[:model]).find(params[:id])

  #   if params[:model].eql? "Medium"
  #     @contact_author = User.where(name: @preview.creator)
  #     @video_default = @preview.media_urls.where(default: true)
  #     @photo = @preview.photos.where(default: true)
  #     @media_urls = @preview.media_urls.map(&:url) + @preview.photos.map(&:image_url)
  #   end
  # end

  # def tags
  #   @all = []

  #   if params[:tag]
  #     ["Project", "Place", "Event", "Resource", "Idea", "Medium"].each do |model|
  #       @all << eval(model).all.tagged_with(params[:tag])
  #     end
  #   else
  #     render action: :page_not_found
  #   end

  #   unless @all.empty?
  #     @all = @all.flatten.uniq
  #     @markers = get_marker_and_location(@all)
  #   end

  #   render template: "projects/all"
  # end

  def save_share
    unless params[:project][:project_ids].blank?
      @content = eval(params[:model]).find(params[:id])
      projects = Project.where("id IN (?)", params[:project][:project_ids])
      projects.each do |project|
        share = Share.new
        share.parent_share = project
        share.children_share = @content
        share.save
      end
    end
  end

  def contact_organizer
    if params[:event_id] && params[:subject]
      event = Event.find params[:event_id]
      EventCreatedMailer.contact_organizer(params[:subject], params[:message], event.organizer_name, event.organizer_email).deliver
    end

    redirect_to root_url
  end

  def set_timezone
    session[:timezone] = params[:timezone]

    render nothing: true
  end

  def find_event
    @events = if params[:location]
      Event.near(params[:location], params[:distance], units: :km) rescue []
    else
      Event.where(status: "approved")
    end

    @categories = Category.all

    render template: "events/index"
  end

  def page_not_found; end
end