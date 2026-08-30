$base = "assets\images\events"

$events = @{
    "delhi" = @("nh7-weekender-delhi","qutub-festival","india-international-trade-fair","comic-con-delhi")
    "bengaluru" = @("bangalore-open-air","karaga-festival","bengaluru-food-fete","bengaluru-tech-summit")
    "hyderabad" = @("hyderabad-music-festival","bonalu-festival","numaish-exhibition","formula-e-hyderabad")
    "pune" = @("nh7-weekender-pune","ganesh-festival-pune","pune-food-festival","pune-international-marathon")
    "jaipur" = @("jaipur-literature-festival","gangaur-festival","teej-fair-jaipur","pink-city-half-marathon")
    "kolkata" = @("durga-puja","kolkata-international-film-festival","park-street-carnival","kolkata-book-fair")
    "ahmedabad" = @("navratri-garba","international-kite-festival","ahmedabad-food-festival","sabarmati-marathon")
    "chennai" = @("margazhi-music-season","pongal-festival","chennai-book-fair","chennai-marathon")
    "goa" = @("sunburn-festival","carnival-of-goa","goa-food-cultural-festival","shigmo-festival")
}

foreach ($city in $events.Keys) {
    foreach ($event in $events[$city]) {
        $path = Join-Path $base "$city\$event"
        New-Item -ItemType Directory -Force -Path $path | Out-Null
        Write-Host "Created: $path"
    }
}
Write-Host "`nAll directories created!"
