class HomeController < ApplicationController
  before_filter :set_user_location, only: [:new, :page_not_found]
  before_filter :set_location, only: [:index, :page_not_found, :tags]

  def index
    if @location
      @all = []

      @all << if @location["area"].eql? "worldwide"
        Event.all
      else
        Event.where('(city = ? OR country = ?)', @location[:city_name], @location[:country_name]).near([@location[:latitude], @location[:longitude]], 20, units: :km)
      end

      @all = @all.flatten
      @markers = get_marker_and_location(@all) if @all
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

  def page_not_found; end
end