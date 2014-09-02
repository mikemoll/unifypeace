class AdminUser < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable
  # attr_accessor :username

  # def self.find_first_by_auth_conditions(warden_conditions)
  #   conditions = warden_conditions.dup
  #   if login = conditions.delete(:username)
  #     where(conditions).where(["lower(username) = :value OR lower(email) = :value", { value: login.downcase }]).first
  #   else
  #     where(conditions).first
  #   end
  # end

  # def login=(login)
  #   @login = login
  # end

  # def login
  #   @login || self.username || self.email
  # end
end
