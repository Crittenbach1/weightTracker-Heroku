Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :charts
      resources :persons
      resources :weights
    end
  end

end
