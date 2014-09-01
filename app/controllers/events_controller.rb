class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  # GET /events
  # GET /events.json
  def index
    @events = Event.where(status: "approved")
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @categories_event = @event.categories
    @affiliated = AffiliatedOrganization.find(@event.affiliated_organization_id)
  end

  # GET /events/new
  def new
    @event = Event.new
    @categories = Category.all
  end

  # GET /events/1/edit
  def edit
    @categories = Category.all
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(event_params)
    @event.affiliated_organization_id = params[:affiliated_organization_id]
    @event.category_ids = params[:category_ids]
    @event.lat = params[:lat]
    @event.long = params[:lng]
    respond_to do |format|
      if @event.save
        EventCraetedMailer.event_created_infirmation(@event.slug, @event.organizer_email).deliver
        format.html { redirect_to @event, notice: 'Thank you for creating an event for World Peace Day, we will confirm your event within 48 hours, and contact you once it has been approved.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event.categories.destroy
    @event.category_ids = params[:category_ids]
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
    event = Event.where(id: params[:id]).first.update(status: "approved")
    EventApprovedMailer.event_approved_infirmation(event.title, event.slug, event.organizer_email).deliver
    redirect_to :back
  end

  def approved_all_events
    EventApprovedMailer.event_approved_infirmation(event.title, event.slug, event.organizer_email).deliver
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
end
