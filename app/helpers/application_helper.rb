module ApplicationHelper
  def apikey(url)
    if url.include?("localhost") || url.include?("lvh")
      "AIzaSyDy_1hvQ2bqYs5zuRKM7IKj6MM8TOhilIY"
    elsif url.include? "unifypeace"
      "AIzaSyC_3tawu6_Ed7rzKQ2OSq4uAXJxXMJ_jzI"
    elsif url.include? "unify-dev-test"
      "AIzaSyCsBVl3kzAa3dCinBclDdYzJDFarrH5uNE"
    end
  end

  def picture(content)
    affiliated = AffiliatedOrganization.find(content.affiliated_organization_id)
    image_tag("#{affiliated.picture_organization}", height: "90px;", style: "background: #fff; padding:2px;")
  end
end
