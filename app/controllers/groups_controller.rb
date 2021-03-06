class GroupsController < ApplicationController

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user  # ページ遷移時に自身の名前に自動的にチェックが入る
  end

  def create    #params=>  {"name"=>"グループ名", "user_ids"=>["", "2", "3"]}}
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "グループを更新しました"
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

end
