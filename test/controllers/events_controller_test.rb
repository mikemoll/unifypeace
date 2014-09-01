require 'test_helper'

class EventsControllerTest < ActionController::TestCase
  setup do
    @event = events(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:events)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create event" do
    assert_difference('Event.count') do
      post :create, event: { affiliated_organization_id: @event.affiliated_organization_id, category_id: @event.category_id, date_and_time: @event.date_and_time, description: @event.description, latitude: @event.latitude, location: @event.location, longitude: @event.longitude, organizer_email: @event.organizer_email, organizer_name: @event.organizer_name, title: @event.title, website_link: @event.website_link }
    end

    assert_redirected_to event_path(assigns(:event))
  end

  test "should show event" do
    get :show, id: @event
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @event
    assert_response :success
  end

  test "should update event" do
    patch :update, id: @event, event: { affiliated_organization_id: @event.affiliated_organization_id, category_id: @event.category_id, date_and_time: @event.date_and_time, description: @event.description, latitude: @event.latitude, location: @event.location, longitude: @event.longitude, organizer_email: @event.organizer_email, organizer_name: @event.organizer_name, title: @event.title, website_link: @event.website_link }
    assert_redirected_to event_path(assigns(:event))
  end

  test "should destroy event" do
    assert_difference('Event.count', -1) do
      delete :destroy, id: @event
    end

    assert_redirected_to events_path
  end
end
