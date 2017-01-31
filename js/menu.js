var menuState = 
{
    create: function()
    {
        game.camera.flash("#fff", 1200);
        this.spacebar;
	    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var pressbtn = game.add.text(game.width / 2, game.height / 2, "Press spacebar to start", {font:"45px Arial"});
        pressbtn.addColor("#fff",0);
        pressbtn.anchor.setTo(0.5, 0.5);
        this.spacebar.onDown.add(this.start, this);
    },
    
    start: function()
    {
        game.state.start('play');
    }
}