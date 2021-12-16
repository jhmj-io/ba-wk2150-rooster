# bitacademy-challenge-wk50  
Rooster coaches 

## Inleiding
In de code geen for of while loops gebruikt. Het idee is dat dergelijke code beter is. Scherpere afbaking van functies, beter leesbaar en minder fouten. Meer over dit idee in dit artikel van [Samer Buna, 2017](https://medium.com/edge-coders/coding-tip-try-to-code-without-loops-18694cf06428). De gebruikte taal is: javascript. Een werkende [live demo](https://jhmj-io.github.io/bitacademy-challenge-wk50/) op github.io.


## Toelichting code
De belangrijkste functies zijn: makeplan, plan_session en equalize_and_radomize. De hoofdfunctie makeplan gaat na of er nog een niet geplande coaching sessie is. Zo ja dan volgt aanroep van plan_session, gevolgd door een hernieuwde aanroep van zichzelf (makeplan). Zo nee dan is de planning gereed en kan deze getoond worden. De functie plan_session gaat opzoek naar een coach die een voorkeur heeft voor het sessiemoment. Als deze er niet is dan wordt gezocht naar een coach die nog vrij is en die niet vaker is ingezet dan het maximum per coach. De functie equalize_and_radomize zorgt voor berekening van het maximum en het op een willekeurige manier bovenaan zetten van beschikbare coaches. Door het willekeurig bovenaan zetten is elk rooster uniek.


## Challenge vragen - antwoorden

Zie [live demo](https://jhmj-io.github.io/bitacademy-challenge-wk50/)

1. Vraag: Maak een rooster dat iedere coach ten minste 1 keer inroostert. Laat vervolgens het rooster zien op een overzichtelijke manier. Je mag er voor nu nog vanuit gaan dat een coaching sessie de gehele dag duurt en dat de coaches de gehele dag beschikbaar zijn.
Antwoord: zie antwoord op vraag 4 met daarbij de opmerking: coaches worden ingepland per dagdeel en niet voor gehele dag.

2. Vraag: Sorteer de coaches op basis van aantal uren in de week en op basis van naam. Geef deze data op een leuke manier weer. Antwoord: druk eerst op button "Zelfgefabriceerd rooster" en daarna op "Volgorde uren/naam". Leuke manier = als een coach wordt ingezet conform zijn voorkeur dan kleurt de inzet groen.

3. Vraag: Het gegenereerde rooster heeft echter niet met iedereen rekening kunnen houden. Bij welke coach is zijn voorkeur het meeste naar voren gekomen en bij wie minder? Druk dit uit in percentages van ingeplande uren binnen de voorkeur / totaal ingeplande uren x 100%. Antwoord: zie headers van de roosters per coach. De header van het Bitlab rooster geeft een gemiddeld percentage van toegekende voorkeurpercentages van de coaches. Hoe hoger dit getal hoe beter het rooster is!

4. Vraag: Genereer nu zelf een rooster die zo veel mogelijk luistert naar de voorkeur van de coaches. De shifts zijn hieronder in de tabel te vinden. Antwoord: druk op button: "Nieuw rooster (Refresh)".  Opmerkingen: 
    - de roosters van Alexander en Sander hebben vaak een laag toegekende voorkeurpercentage. Reden: Alexander en Sander hebben een beperkte voorkeur, namelijk: alléén de avonden van 3 en respectievelijk 4 van de 7 dagen.
    - coaches zijn gehele dag inzetbaar.


## Conclusie
De roosters voldoen aan de eisen van de challenge. Betere roosters zijn mogelijk door het slimmer maken van de functie
equalize_and_radomize. Bijvoorbeeld: een coach niet inplannen als het geplande voorkeurpercentage hoger is dan zijn gemiddelde voorkeurpercentage. Van coach Sander is dat gemiddelde 25%, namelijk 4 avondsessies van de 16 mogelijke sessies. Ook kan nog een functie toegevoegd worden die makeplan opnieuw uitvoert als het gemiddelde van alle geplande voorkeurpercentages veel lager is dan het gemiddelde van de gemiddelde percentages - het Bitlab gemiddelde.  
Door aan de functie plan_session logica voor beperkingen toe te voegen worden de roosters realistischer . Bijvoorbeeld: maximaal 2 dagdelen per dag of geen inzet van coach op dagen waarop hij/zij niet beschikbaar is, etc.
