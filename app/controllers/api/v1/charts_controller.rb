module Api::V1
  class ChartsController < ApplicationController

      def index
          @charts = Chart.all
          render json: @charts, include: ["people", "weights"]
      end

      def create
          @chart = Chart.create(chart_params)
          render json: @chart, include: ["people", "weights"]
      end

      def destroy
          Chart.find(params[:id]).destroy
      end

      private

      def chart_params
          params.require(:chart).permit(:id, :date, people_attributes: [:name, weights_attributes: [:pounds, :currentDate] ])
      end
  end
end
