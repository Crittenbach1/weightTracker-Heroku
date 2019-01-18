class Weight < ActiveRecord::Base
    belongs_to :person
    validates :pounds, :presence => true

end
