var playState = 
{
    create: function()
    {
        this.botRouteCode = 2;
        game.camera.flash("#fff", 1200);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,3600,3600);
        
        this.bg = game.add.tileSprite(0,0, 3600,3600,'bg');
        this.cell = game.add.sprite(200,200,'cell');
        this.cell.scale.setTo(0.4,0.4);
        game.physics.arcade.enable(this.cell);
        
        game.camera.follow(this.cell);
        
        this.cursor = game.input.keyboard.createCursorKeys();
        
        food = game.add.group();
        food.enableBody = true;
        food.physicsBodyType = Phaser.Physics.ARCADE;
        
        bots = game.add.group();
        bots.scale.set(0.4,0.4);
        bots.enableBody = true;
        bots.physicsBodyType = Phaser.Physics.ARCADE;
        bots.setAll('anchor.x', 0.5);
        bots.setAll('anchor.y', 0.5);
        
        for(var i = 0; i < 600; i++)
        {
            foodcells = food.create(Math.random()*game.world.width, Math.random()*game.world.height, 'cell');
        }
        
        for(var i = 0; i < 6; i++)
        {
            botCells = bots.create(game.rnd.integerInRange(0, game.world.width) + 1500, game.rnd.integerInRange(0, game.world.height) + 1500, 'cell');
            botCells.body.collideWorldBounds = true;
        }
        
        food.setAll('scale.x', 0.1);
        food.setAll('scale.y', 0.1);
        
        game.time.events.loop(666, this.changeBotDirection, this);
    },
        
    update: function()
    {
        game.physics.arcade.overlap(this.cell, food, this.eatFood, null, this);
        game.physics.arcade.overlap(bots, food, this.eatFoodBots, null, this);
        game.physics.arcade.overlap(this.cell, bots, this.eatBotsByCell, null, this);
        
        this.cell.body.collideWorldBounds = true;
        
        if(this.cursor.left.isDown)
        {
            this.cell.x -= 10;
        }
        if(this.cursor.right.isDown)
        {
            this.cell.x += 10;
        }
        if(this.cursor.up.isDown)
        {
            this.cell.y -= 10;
        }
        if(this.cursor.down.isDown)
        {
            this.cell.y += 10;
        }
        
        /*       BOTS           */
        
        if(this.botRouteCode == 0)
        {
            bots.x -= 10;
        }
        if(this.botRouteCode == 1)
        {
            bots.x += 10;
        }
        if(this.botRouteCode == 2)
        {
            bots.y -= 10;
        }
        if(this.botRouteCode == 3)
        {
            bots.y += 10;
        }
    },
    
    changeBotDirection: function()
    {
        this.nowInteger = game.rnd.integerInRange(0,3);
        this.botRouteCode = this.nowInteger;
    },
    
    eatFood: function(cell, f) 
    {
        f.kill();
        this.cell.scale.x += 0.005;
        this.cell.scale.y += 0.005;
    },
    
    eatFoodBots: function(bot, f) 
    {
        f.kill();
        bot.scale.x += 0.005;
        bot.scale.y += 0.005;
    },
    
    eatBotsByCell: function(cell, bot)
    {
        if(cell.scale.x > bot.scale.x)
        {
            bot.kill();
            cell.scale.x += 0.15;
            cell.scale.y += 0.15;
        }
        else
        {
            cell.kill();
            bot.scale.x += 0.15;
            bot.scale.y += 0.15;
            game.state.start('menu');
        }
    }
}