ActiveAdmin.register Event do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :title, :category_ids, :website_link, :start_date, :description, :location, :organizer_name, :organizer_email, :affiliated_organization_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if resource.something?
  #   permitted
  # end
  config.batch_actions = false
  controller do
    def find_resource
      scoped_collection.friendly.find(params[:id])
    end
  end
  actions :all, except: [:new, :create, :show, :edit]

  index do
    selectable_column
    # event_aff = AffiliatedOrganization.where(event.)
    column :id
    column :title
    column(:category) {|event| event.categories.pluck(:name).join(", ") }
    column :website_link
    column :start_date
    column :description
    column :location
    column :organizer_name
    column :organizer_email
    column(:affiliated_organization_id) { |event| AffiliatedOrganization.where(id: event.id).pluck(:name).first }
    column :status
    actions defaults: true do |event|
      if event.status.eql?("pending")
        link_to("Approve", approved_event_events_path(event.id), class: "member_link")
      else
        link_to("Unapproved", approved_event_events_path(event.id, unapproved: "true"), class: "member_link")
      end
    end
  end

  # batch_action :approve, method: :get do |event|
  #   events_approved = Event.where(id: params[:collection_selection]).update_all(status: "approved")
  #   events = Event.where(id: params[:collection_selection])

  #   events.each do |event|
  #     EventApprovedMailer.event_approved_information(event.title, event.slug, event.organizer_email).deliver
  #   end

  #   flash[:notice] = "Event has been approved"
  #   redirect_to :back
  # end

  # batch_action :unapproved, method: :get do |event|
  #   events_approved = Event.where(id: params[:collection_selection]).update_all(status: "pending")
  #   events = Event.where(id: params[:collection_selection])

  #   flash[:error] = "Event has been unapproved"
  #   redirect_to :back
  # end
end
