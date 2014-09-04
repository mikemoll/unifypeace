class EventApprovedMailer < ActionMailer::Base
  default from: "do-not-reply@unify.org"
  def event_approved_information(title, slug, organizer_email)
    @title = title
    @slug = slug
    mail(:to =>organizer_email, :subject => "Unify Event Confirmation")
  end
end
