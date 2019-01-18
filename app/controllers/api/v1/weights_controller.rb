module Api::V1
  class WeightsController < ApplicationController

      def index
         @weights = Weight.all
         render json: @weights
      end

      def create
         binding.pry
         e = Weight.where(:person_id => params[:person_id], :currentDate => params[:currentDate])
          if !e.empty?
            e.first.pounds = params[:pounds]
            e.first.save!
            @weight = e
          else
            @weight = Weight.create(weight_params)
          end

          render json: @weight
      end

      private

      def weight_params
        params.require(:weight).permit(:id, :pounds, :currentDate, :person_id)
      end
  end
end
