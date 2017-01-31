var loadState = 
{
    preload: function()
    {
        var loadingtext = game.add.text(game.width / 2, game.height / 2, "LOADING...");
        loadingtext.anchor.setTo(0.5, 0.5);
    },
    
    create: function()
    {
        game.state.start('menu');
    }
}