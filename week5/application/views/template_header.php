<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Untitled document</title>

    <!-- Styles -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,700,400italic,700italic">
    <?php if(ENVIRONMENT == "development" || ENVIRONMENT == "testing") : ?>
    <link rel="stylesheet" href="<?=base_url("css/style.css")?>">
    <?php else : ?>
    <link rel="stylesheet" href="<?=base_url("assets/style.css")?>">
    <?php endif; ?>

</head>
<body>
    <div class="container">

        <header>
            <nav>
                <ul class="main-nav">
                    <li>
                        <a href="<?=page_link()?>">Home</a>
                    </li>
                    <li>
                        <a href="<?=page_link("page2")?>">Page 2</a>
                    </li>
                    <li>
                        <a href="<?=page_link("page3")?>">Page 3</a>
                    </li>
                </ul>
            </nav>
        </header>

        <div class="content">
            