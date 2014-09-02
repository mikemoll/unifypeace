class Devise::InvitationsController < DeviseController
  before_action :set_user_location
  before_action :configure_permitted_parameters, if: :devise_controller?
  # prepend_before_filter :authenticate_inviter!, :only => [:new, :create]
  # prepend_before_filter :has_invitations_left?, :only => [:create]
  prepend_before_filter :require_no_authentication, :only => [:edit, :update, :destroy]
  prepend_before_filter :resource_from_invitation_token, :only => [:edit, :destroy]
  helper_method :after_sign_in_path_for

  # GET /resource/invitation/new
  def new
    @event = Event.new
    @categories = Category.all
    self.resource = resource_class.new
    render :new
  end

  # POST /resource/invitation
  def create
    self.resource = invite_resource

    if resource.errors.empty?
      yield resource if block_given?
      if is_flashing_format? && self.resource.invitation_sent_at
        set_flash_message :notice, :send_instructions, :email => self.resource.email
      end
      respond_with resource, :location => after_invite_path_for(resource)
    else
      respond_with_navigational(resource) { render :new }
    end
  end

  # GET /resource/invitation/accept?invitation_token=abcdef
  def edit
    @event = Event.new
    @categories = Category.all
    resource.invitation_token = params[:invitation_token]
    render :edit
  end

  # PUT /resource/invitation
  def update
    self.resource = accept_resource

    if resource.errors.empty?
      yield resource if block_given?
      flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
      set_flash_message :notice, flash_message if is_flashing_format?
      sign_in(resource_name, resource)
      respond_with resource, :location => after_accept_path_for(resource)
    else
      respond_with_navigational(resource){ render :edit }
    end
  end

  # GET /resource/invitation/remove?invitation_token=abcdef
  def destroy
    resource.destroy
    set_flash_message :notice, :invitation_removed if is_flashing_format?
    redirect_to after_sign_out_path_for(resource_name)
  end

  protected
  def resource_from_invitation_token
    unless params[:invitation_token] && self.resource = resource_class.find_by_invitation_token(params[:invitation_token], true)
      set_flash_message(:alert, :invitation_token_invalid) if is_flashing_format?
      redirect_to after_sign_out_path_for(resource_name)
    end
  end

  def accept_resource
    resource_class.accept_invitation!(update_resource_params)
  end

  def invite_params
    devise_parameter_sanitizer.sanitize(:invite)
  end

  def update_resource_params
    devise_parameter_sanitizer.for(:accept_invitation) do |u|
      u.permit(:name, :username, :password, :password_confirmation, :invitation_token, :image)
    end
  end

end