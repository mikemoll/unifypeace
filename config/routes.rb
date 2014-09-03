Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, :controllers => { :invitations => 'devise/invitations' }
  resources :events do
    collection do
      get "my_events", to: "events#my_events", as: "my_events"
      get "approved_event/:id", :to => 'events#approved_event', :as => "approved_event"
      get "/c/:category", to: "events#categories", as: :category
    end
  end
  root 'home#index'
  post 'create_contact_organizer' => 'home#create_contact_organizer', as: :create_contact_organizer
  get 'find_event' => 'home#find_event', as: :find_event
  post "get_location_by_lat_lng" => "events#get_location_by_lat_lng", as: :get_location_by_lat_lng
  get 'set_timezone' => 'home#set_timezone', as: :set_timezone
  get 'contact_organizer/:id' => 'home#contact_organizer', as: :contact_organizer
  get 'embed' => 'home#embed', as: :embed

end
