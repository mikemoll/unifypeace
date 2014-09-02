class EventCreatedMailer < ActionMailer::Base
  default from: "unify@information.com"
  def event_created_information(slug, organizer_email, token)
    @slug = slug
    @token = token
    mail(:to =>organizer_email, :subject => "Unify event information")
  end

  def contact_organizer(subject, message, organizer_name, organizer_email)
  	@organizer_name = organizer_name
  	@message = message
  	mail(to: organizer_email, subject: subject)
  end
end
