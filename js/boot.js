var bootState = 
{
    preload: function()
    {
        game.stage.backgroundColor = "#474747";
        game.load.image('bg', 'images/agarbg.png');
        game.load.image('cell', 'images/agarcell.png');
    },
    
    create: function()
    {
        game.state.start('load');
    }
}