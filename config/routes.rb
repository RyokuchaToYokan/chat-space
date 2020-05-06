Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]    # メッセージの一覧表示&入力:index, 保存:create
    namespace :api do
      resources :messages, only: :index, defaults: { format: "json" }
    end
  end
end
