module ApplicationHelper
  def apikey(url)
    if url.include?("localhost") || url.include?("lvh")
      "AIzaSyDy_1hvQ2bqYs5zuRKM7IKj6MM8TOhilIY"
    elsif url.include? "unifypeace"
      "AIzaSyC_3tawu6_Ed7rzKQ2OSq4uAXJxXMJ_jzI"
    elsif url.include? "unify-dev"
      "AIzaSyCEO0uXsU5SJunGt4lBct7JmFl4ZZotxmU"
    end
  end
end
