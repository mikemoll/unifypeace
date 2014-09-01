class EventApprovedMailer < ActionMailer::Base
  default from: "unify@information.com"
  def event_approved_infirmation(title, slug, organizer_email)
    @title = title
    @slug = slug
    mail(:to =>organizer_email, :subject => "Unify event has been approved")
  end
end
