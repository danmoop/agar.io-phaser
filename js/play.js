var playState = 
{
    create: function()
    {
        game.camera.flash("#fff", 1200);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,1600,1600);
        
        this.bg = game.add.sprite(0,0,'bg');
        this.cell = game.add.sprite(200,200,'cell');
        game.physics.arcade.enable(this.cell);
        
        game.camera.follow(this.cell);
        
        this.cursor = game.input.keyboard.createCursorKeys();
        this.cell.scale.setTo(0.4,0.4);
        
        food = game.add.group();
        food.enableBody = true;
        food.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(var i = 0; i < 200; i++)
        {
            foodcells = food.create(Math.random()*game.world.width, Math.random()*game.world.height, 'cell');
        }
        
        food.setAll('scale.x', 0.1);
        food.setAll('scale.y', 0.1);
    },
        
    update: function()
    {
        console.log("X: "+this.cell.scale.x);
        console.log("Y: "+this.cell.scale.y);
        game.physics.arcade.overlap(this.cell, food, this.eatFood, null, this);
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
    },
    
    eatFood: function(cell, f) 
    {
        f.kill();
        this.cell.scale.x += 0.01;
        this.cell.scale.y += 0.01;
    }
}