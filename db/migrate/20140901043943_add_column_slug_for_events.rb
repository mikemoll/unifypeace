class AddColumnSlugForEvents < ActiveRecord::Migration
  def change
    add_column :events, :slug, :string
  end
end
