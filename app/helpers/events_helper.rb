module EventsHelper
  def options_for_attendees(event)
    options_for_select([["1-10", "1-10"], ["10-50", "10-50"], ["50-200", "50-200"], ["200-500", "200-500"] , ["500+", "500+"]], (event.estimated_attendees if event) )
  end
end
