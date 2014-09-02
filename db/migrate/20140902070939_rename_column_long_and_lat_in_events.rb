class RenameColumnLongAndLatInEvents < ActiveRecord::Migration
  def change
    rename_column :events, :long, :longitude
    rename_column :events, :lat, :latitude
  end
end
