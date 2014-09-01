class EventCreatedMailer < ActionMailer::Base
  default from: "unify@information.com"
  def event_created_infirmation(slug, organizer_email)
    @slug = slug
    mail(:to =>organizer_email, :subject => "Unify event information")
  end

  def contact_organizer(subject, message, organizer_name, organizer_email)
  	@organizer_name = organizer_name
  	@message = message
  	mail(to: organizer_email, subject: subject)
  end
end
