var wartsila = new Stage("Wartsila"),
    hedon = new Stage("Hedon"),
    abbott = new Stage("Abbott"),
    bfo = new Festival("Bevrijdingsfestival Overijssel");

wartsila.acts = [
    new Act("Openingsconcert met De Vuurvogel", "11:00", "12:00", "Kader-klein-Vuurvogel.jpg"),
    new Act("Alain Clark", "12:30", "13:00", 'Alain-Clark-kl.jpg'),
    new Act("Heideroosjes", "14:00", "14:45", 'heideroosjes-kl.jpg'),
    new Act("Krystl", "15:20", "16:10", 'Krystl-kl.jpg'),
    new Act("Normaal", "16:40", "17:40", 'kader-klein-Normaal.jpg'),
    new Act("Rapalje", "18:10", "19:00", 'Rapalje-kl.jpg'),
    new Act("Waylon", "19:30", "20:30", 'Waylon-Kl.jpg'),
    new Act("Chef' Special", "21:00", "21:50", 'Chefspecial-klein.jpg'),
    new Act("VanVelzen", "22:30", "23:30", 'VanVelzen-kl.jpg')
];
hedon.acts = [
    new Act("Das Pri-V", "12:45", "13:30"),
    new Act("Textures", "14:00", "14:50", 'Textures-kl.jpg'),
    new Act("The Asteroids Galaxy Tour", "15:20", "16:10", 'The-Asteroids-Galaxy-Tour-kl.jpg'),
    new Act("Eric Sardinas", "16:40", "17:30", 'Eric-Sardinas-kl.jpg'),
    new Act("Sonic Boom Six", "18:00", "18:50", 'Sonic-Boom-six-kl.jpg'),
    new Act("Black Rose Rebelz", "19:10", "19:30", 'Kader-klein-Black-Rose.jpg'),
    new Act("Negritos", "20:10", "21:00", 'Negritos-kl.jpg'),
    new Act("Blaudzun", "21:30", "22:30", 'Blaudzun-kl.jpg'),
    new Act("Nobody beats the drum", "23:00;", "23:59", 'Nobody-Beats-The-Drum-kl.jpg')
];

bfo.stages.push(wartsila);
bfo.stages.push(hedon);
bfo.stages.push(abbott);