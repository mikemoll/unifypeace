class HomeController < ApplicationController
  before_filter :set_user_location, only: [:new, :page_not_found, :embed]
  before_filter :set_location, only: [:index, :page_not_found, :tags]

  def index
    if @location
      @all = []

      @all << if @location[:area].eql?("worldwide")
        Event.approved
      else
        Event.approved.near([@location[:latitude], @location[:longitude]], @location[:nearby].to_i, units: :km) rescue nil
      end

      @all = @all.flatten
      @markers = get_marker_and_location(@all) if @all rescue nil
    end

    @event = Event.new
    @categories = Category.all

    set_title_location(@location)
  end

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
    @event_id = params[:id]
  end

  def create_contact_organizer
    if params[:event_id] && params[:subject]
      event = Event.find params[:event_id]
      EventCreatedMailer.delay.contact_organizer(params[:subject], params[:message], event.organizer_name, event.organizer_email)
    end

    redirect_to root_url, notice: "Sent message to organizer successfully!!"
  end

  def set_timezone
    session[:timezone] = params[:timezone]

    render nothing: true
  end

  def find_event
    @location = params[:location]
    @all = []

    @all << if @location[:latitude].present?
      Event.approved.near([@location[:latitude], @location[:longitude]], 30, units: :km) rescue nil
    else
      Event.approved
    end

    @all = @all.flatten
    @markers = get_marker_and_location(@all) if @all

    @event = Event.new
    @categories = Category.all

    set_title_location(@location)

    respond_to :js
  end

  def embed
    if @location
      @all = []

      @all << if @location[:area].eql?("worldwide")
        Event.approved
      else
        Event.approved.near([@location[:latitude], @location[:longitude]], @location[:nearby].to_i, units: :km) rescue nil
      end

      @all = @all.flatten
      @markers = get_marker_and_location(@all) if @all rescue nil
    end

    @event = Event.new
    @categories = Category.all

    set_title_location(@location)
    respond_to do |format|
      format.html {render :layout => 'embed'}
    end
  end

  def page_not_found; end
end