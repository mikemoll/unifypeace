class EventCraetedMailer < ActionMailer::Base
  default from: "unify@information.com"
  def event_created_infirmation(slug, orginizer_email)
    @slug = slug
    mail(:to =>orginizer_email, :subject => "Unify event information")
  end
end
