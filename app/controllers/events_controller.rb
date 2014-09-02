class EventsController < ApplicationController
  before_action :set_event, only: [ :edit, :update, :destroy]
  before_action :set_location, only: [:index, :show, :categories, :edit]

  # GET /events
  # GET /events.json
  def index
    @location = {area: "worldwide", longitude: 0.0, latitude: 0.0}
    @events = Event.where(status: "approved")

    @markers = get_marker_and_location(@events) if @events rescue nil
    @event = Event.new
    @categories = Category.all

    set_title_location(@location)

    render template: "home/index"
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.new
    @event_show = Event.friendly.find(params[:id])
    @categories_event = @event_show.categories
    @categories = Category.all
    @affiliated = AffiliatedOrganization.find(@event_show.affiliated_organization_id)

    @markers = get_marker_and_location([@event_show])
  end

  # GET /events/new
  def new
    @event = Event.new
    @categories = Category.all
  end

  # GET /events/1/edit
  def edit
    @categories = Category.all
    @markers = get_marker_and_location([@event])
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(event_params)
    @event.affiliated_organization_id = params[:affiliated_organization_id]
    @event.category_ids = params[:category_ids]
    @event.lat = params[:lat]
    @event.long = params[:lng]
    @event.country = params[:country]
    @event.region = params[:administrative_area_level_1]
    @event.postal_code = params[:postal_code]
    @event.estimated_attendees = params[:estimated_attendees]
    respond_to do |format|
      if @event.save
        user = User.invite!(email: @event.organizer_email, name: @event.organizer_name)
        EventCreatedMailer.event_created_information(@event.slug, @event.organizer_email, user.invitation_token).deliver
        format.html { redirect_to root_url, notice: 'Thank you for creating an event for World Peace Day, we will confirm your event within 48 hours, and contact you once it has been approved.' }
        format.json { render :index, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event = Event.new
    @categories = Category.all
    @event.categories.destroy
    @event.affiliated_organization_id = params[:affiliated_organization_id]
    @event.category_ids = params[:category_ids]
    @event.lat = params[:lat]
    @event.long = params[:lng]
    @event.country = params[:country]
    @event.region = params[:administrative_area_level_1]
    @event.postal_code = params[:postal_code]
    @event.estimated_attendees = params[:estimated_attendees]
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event has been updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def approved_event
    event = Event.where(id: params[:id]).first
    event.update(status: "approved")
    EventApprovedMailer.event_approved_information(event.title, event.slug, event.organizer_email).deliver

    redirect_to :back
  end

  def approved_all_events
    EventApprovedMailer.event_approved_information(event.title, event.slug, event.organizer_email).deliver
  end

  def categories
    @category = params[:category]
    set_project_by_category(@category)
  end

  def get_location_by_lat_lng
    location = Geocoder.search([params[:location][:lat], params[:location][:lng]]).first
    parsed_location = { country_name: location.country, region: location.state, city_name: location.city,
      latitude: location.latitude, longitude: location.longitude, address: location.address,
      postal_code: location.postal_code } if location

      render json: parsed_location
    end

  def my_events
    @event = Event.new
    @categories = Category.all
    @events = Event.where(organizer_email: params[:email])
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.friendly.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def event_params
    params.require(:event).permit(:title, :category_id, :website_link, :start_date, :description, :location, :organizer_name, :organizer_email, :affiliated_organization_id, :lat, :long, :status, :country, :region, :city, :postal_code, :estimated_attendees)
  end

  def set_project_by_category(category)
    if category == "all"
      category = "all"
    elsif category == "meditation"
      category = "meditation/prayer"
    elsif category == "music"
      category = "music/celebration"
    elsif category == "march"
      category = "march/action"
    elsif category == "multi"
      category = "multi"
    end

    events = Event.where(status: "approved")
    @all = []
    events.each do |event|
      if category == "all"
        @all << event
      elsif category == "multi"
        if event.categories.count > 1
          @all << event
        end
      else
        if event.categories.count == 1
          if event.categories.first.name == category
            @all << event
          end
        end
      end
    end

    # set_title_location(@location)
    @markers = get_marker_and_location(@all) if @all

    respond_to do |format|
      if request.xhr?
        format.js
      else
        format.html {render "projects/index"}
      end
    end
  end
end
