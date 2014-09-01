class AddColumnEsmitedAttendesInEvents < ActiveRecord::Migration
  def change
    add_column :events, :estimated_attendees, :string
  end
end
