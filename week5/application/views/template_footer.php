
        </div> <!-- /.content -->

        <footer>
            <p>&copy; 2012</p>
        </footer>

    </div> <!-- /.container -->
    
    <!-- Javascripts -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?=base_url("js/jquery.1.7.1.min.js")?>"><\/script>')</script>
    <?php if(ENVIRONMENT == "development" || ENVIRONMENT == "testing") : ?>
    <script src="<?=base_url("js/plugins.js")?>"></script>
    <script src="<?=base_url("js/app.js")?>"></script>
    <?php else : ?>
    <script src="<?=base_url("assets/script.js")?>"></script>
    <?php endif; ?>
    
    <!-- Google Analytics -->
    <script>
        var _gaq=[['_setAccount','XX-XXXXXXX-X'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
    
</body>
</html>