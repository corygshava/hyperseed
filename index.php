<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>HyperSeed - Home</title>

	<link rel="stylesheet" href="ui/css/fa-all.css">
	<link rel="stylesheet" href="ui/css/w3.css">
	<link rel="stylesheet" href="ui/css/coryG_base.css">
	<link rel="stylesheet" href="ui/css/coryG_UIOps.css">
	<link rel="stylesheet" href="ui/css/animate.css">

	<link rel="shortcut icon" href="favicon.webp" type="image/webp">
	<link rel="stylesheet" type="text/css" href="styles.css">

	<script src="ui/js/SuperScript.js"></script>
	<script src="ui/js/toappend.js"></script>
	<script src="ui/js/customalerter.js"></script>
	<script src="ui/js/coryG_UIOps.js"></script>
	<script src="ui/js/app.js"></script>

	<style>
		.card{
			flex: 1 1 250px;
			cursor:pointer;
		}
		.card:hover{
			scale: 1.017;
		}
	</style>
</head>
<body>
    <div class="container">
        <header>
            <h1>HyperSeed</h1>
            <p class="subtitle spacy-md">
                Hi there, <b class="themetxt">Cory</b> here. 
                so this is a simple app that helps generates data for your databases and export it to whatever form you may want (kinda).
            </p>
            <!-- <p>like it to see it become its own dedicated project one day</p> -->
        </header>

        <div class="w3-center spacy-md text-sm">
            These arent pricing tiers just click one and go
        </div>

        <div class="flowline gap-md wrapme">
            <div class="card w3-hover-black slide-up" data-goto="./_new">
                <span class="h3 themetxt spacy-md">Hyperseed basic</span>
                <div style="padding: 0 40px;">
                    <li>Most stable release</li>
                    <li>Data export</li>
                    <li>Preset Saving</li>
                    <li>CSV export</li>
                </div>
            </div>
            <div class="card w3-hover-black slide-up w3-display-container" style="overflow:hidden" data-goto="./_steroids">
                <button class="w3-btn w3-orange w3-display-topright" style="border-radius: 0 0 0 var(--roundness);">Beta</button>
                <span class="h3 themetxt spacy-md">Hyperseed Advanced</span>
                <div style="padding: 0 40px;">
                    <li>Everything from basic (except stability 😂)</li>
                    <li>JSON export</li>
                    <li>Schema export</li>
                    <li>SQL and noSQL schema export</li>
                </div>
            </div>
            <div class="card w3-hover-black slide-up w3-display-container w3-hide" style="overflow:hidden" data-role="api">
                <button class="w3-btn w3-orange w3-display-topright w3-hide">Beta</button>
                <span class="h3 themetxt spacy-md">Hyperseed API</span>
                <div style="padding: 0 40px;">
                    <li>Everything <b>HyperSeed</b> but as an API</li>
                </div>
            </div>
        </div>

        <footer>
            <p><b class="themetxt">HyperSeed</b>, Generate realistic test data for your applications</p>
            &copy; CoryG, All rights reserved (kinda)
        </footer>
    </div>
</body>
</html>