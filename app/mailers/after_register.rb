class AfterRegister < ActionMailer::Base
  default from: "from@example.com"
  def after_register(organizer_email)
  	 mail(:to =>organizer_email, :subject => "Unify after register information")
  end
end
