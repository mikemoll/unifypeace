class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.integer :category_id
      t.string :website_link
      t.datetime :date_and_time
      t.text :description
      t.string :location
      t.string :organizer_name
      t.string :organizer_email
      t.integer :affiliated_organization_id
      t.string    :country
      t.string    :region
      t.string    :city
      t.string    :postal_code
      t.float :lat
      t.float :long
      t.string :status, default: "pending"

      t.timestamps
    end
  end
end