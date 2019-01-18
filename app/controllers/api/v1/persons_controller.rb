module Api::V1
  class PersonsController < ApplicationController

    def index
      @persons = Person.all
      render json: @persons, include: "weights"
    end

    def create
        binding.pry
        @person = Person.create(person_params)
        render json: @person, include: "weights"
    end

    private

    def person_params
      params.require(:person).permit(:id, :name, weights_attributes: [:pounds, :currentDate])
    end
  end
end
