class RenameColumnDateTimeEvents < ActiveRecord::Migration
  def change
    rename_column :events, :date_and_time, :start_date
  end
end