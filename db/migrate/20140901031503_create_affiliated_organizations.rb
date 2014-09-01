class CreateAffiliatedOrganizations < ActiveRecord::Migration
  def change
    create_table :affiliated_organizations do |t|
      t.string :name
      t.string :picture_organization

      t.timestamps
    end
  end
end
