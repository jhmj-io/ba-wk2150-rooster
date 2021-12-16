# bitacademy-challenge-wk50  
Rooster coaches 

## Inleiding
In de code geen for of while loops gebruikt. Het idee is dat deze code beter is. Scherpere afbaking van functies, beter leesbaar en minder fouten. Meer over dit idee in dit artikel van [Samer Buna, 2017](https://medium.com/edge-coders/coding-tip-try-to-code-without-loops-18694cf06428). De gebruikte taal is: javascript. Een werkende [live demo](https://jhmj-io.github.io/bitacademy-challenge-wk50/) op github.io.


## Toelichting code
De belangrijkste functies zijn: makeplan, plan_session en equalize_and_radomize. De hoofdfunctie makeplan gaat na of er nog een niet geplande coaching sessie. Zo ja dan volgt aanroep van plan_session, gevolgd door een hernieuwde aanroep van zichzelf (makeplan). Zo nee dan is de planning gereed en kan deze opgeslagen en getoond worden. De functie plan_session gaat opzoek naar een coach die een voorkeur heeft voor het sessie moment. Als deze niet gevonden worden dan wordt gezocht naar de coach die nog vrij is en die niet vaker is ingezet dan het maximum per coach. Bij het zoeken van een coach die nog vrij is zorgt de functie equalize_and_radomize voor berekening van de maximum inzet en het op een willekeurige manier bovenaan zetten van beschikbare coaches.


## Challenge vragen - antwoorden

Zie [live demo](https://jhmj-io.github.io/bitacademy-challenge-wk50/)

1. Vraag: Maak een rooster dat iedere coach ten minste 1 keer inroostert. Laat vervolgens het rooster zien op een overzichtelijke manier. Je mag er voor nu nog vanuit gaan dat een coaching sessie de gehele dag duurt en dat de coaches de gehele dag beschikbaar zijn.
Antwoord: zie antwoord op vraag 4 met daarbij de opmerking: coaches worden ingepland per dagdeel en niet voor gehele dag.

2. Vraag: Sorteer de coaches op basis van aantal uren in de week en op basis van naam. Geef deze data op een leuke manier weer. Antwoord: druk eerst op button "Zelfgefabriceerd rooster" en daarna op "Volgorde uren/naam". Leuke manier: als een coach wordt ingezet conform zijn voorkeur dan kleurt de inzet groen.

3. Vraag: Het gegenereerde rooster heeft echter niet met iedereen rekening kunnen houden. Bij welke coach is zijn voorkeur het meeste naar voren gekomen en bij wie minder? Druk dit uit in percentages van ingeplande uren binnen de voorkeur / totaal ingeplande uren x 100%. Antwoord: zie headers van de roosters per coach. Overigens de headers van samenvattende Bitlab rooster geeft een gemiddeld percentage van toegekende voorkeur percentages. Hoe hoger dit getal hoe beter het rooster is?

4. Vraag: Genereer nu zelf een rooster die zo veel mogelijk luistert naar de voorkeur van de coaches. De shifts zijn hieronder in de tabel te vinden. Antwoord: druk op button: "Nieuw rooster (Refresh)".  Opmerkingen: 
    - de roosters van Sander hebben vaak een laag percentage van de toegekende voorkeur. Reden: Sander heeft een beperkte voorkeur, namelijk: alléén de avonden van 4 van de 7 dagen.
    - coaches zijn gehele dag inzetbaar.


## Conclusie
De roosters voldoen aan de eisen van de challenge. Betere roosters zijn mogelijk door het slimmer maken van de functie
equalize_and_radomize. Bijvoorbeeld: een coach niet inplannen als het geplande preferentie percentage hoger is dan zijn gemiddelde preferentie percentage. Van coach Sander is dat gemiddelde: 25%, namelijk 4 avondsessie van de 16 mogelijke sessies. Ook kan nog een functie toegevoegd worden die makeplan opnieuw uitvoert als het gemiddelde van alle preferentie percentage veel lager is dan het gemiddelde van alle coach gemiddeldes. 

