class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",(data)=>{
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountref = await database.ref("playerCount").once("value")
      if(playerCountref.exists()){
        playerCount = playerCountref.val()
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide()
    textSize(30)
    text("start game",120,100)
    Player.getPlayerInfo()
    if(allPlayers !== undefined){
      var Y = 150
      for(var i in allPlayers){
        if(i === "player"+ player.index){
          fill('blue')
        }
        else{
          fill("red")
        }
        Y = Y + 25
        textSize(20)
        text(allPlayers[i].name+":"+allPlayers[i].distance,120,Y)
      }
    }
    if(keyDown(UP_ARROW)&& player.index != null){
      player.distance+= 20
      player.update()
    }
  }
}
