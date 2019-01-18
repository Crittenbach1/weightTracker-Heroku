class Person < ActiveRecord::Base
   has_many :weights, dependent: :destroy
   accepts_nested_attributes_for :weights

end
