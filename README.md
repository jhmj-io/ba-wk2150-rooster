# bitacademy-challenge-wk50  
Rooster coaches 

## Inleiding
In deze inzending weinig coding techniek gebruikt uit cursus Junior Data Engineer. De challenge gebruikt om verder vertrouwd te raken met GitHub, de bijkomende tooling en het publiek verantwoorden en toelichten van mijn "intellectual property" . Challenge ook gebruikt om geen for of while loops te gebruiken te onderzoeken. Het idee is dat dit stabielere code oplevert. Meer over dit idee in dit artikel van [Samer Buna, 2017](https://medium.com/edge-coders/coding-tip-try-to-code-without-loops-18694cf06428). De gemaakte code is: javascript. Een werkende [live demo](https://jhmj-io.github.io/bitacademy-challenge-wk50/) is te zien op github.io.


## Toelichting code

### Code in drie bestanden
1. coachcalender-compute.js - javascript voor generen en beoordelen van de roosters.
2. coachcalender-html.js - javascript voor dynamische vullen van html.
3. index.html - html en css (in style tag).

### Coachcalender-compute.js

- compute_init 
    - dow - object met days of week
    
            { "1": "maandag", "2": "dinsdag", etc. }

    - dvd - object met namen, start, einde en uren van de dagdelen

            { "1": {name: "ochtend",start:  "9:00", end:"13:30", uren: 4.5}, "2": {name: "middag", etc. }

    - resources
    - sessions

- makeplan
    - plan_session
    - equalize_and_radomize

- readplan

- resourcesstatistics

- resourcessort


### Coachcalender-html.js
- html_calender


### Index.html
- Geen toelichting



## Antwoord challenge vragen

Zie [live demo](https://jhmj-io.github.io/bitacademy-challenge-wk50/)

1. Vraag: Maak een rooster dat iedere coach ten minste 1 keer inroostert. Laat vervolgens het rooster zien op een overzichtelijke manier. Je mag er voor nu nog vanuit gaan dat een coaching sessie de gehele dag duurt en dat de coaches de gehele dag beschikbaar zijn.
Antwoord: zie antwoord op vraag 4. Met dien verstande: coachings sessies in vraag 4 zijn specifiek per dagdeel - ochtend, middag, avond.

2. Vraag: Sorteer de coaches op basis van aantal uren in de week en op basis van naam. Geef deze data op een leuke manier weer. Antwoord: druk eerst op button "Zelfgefabriceerd rooster" en daarna op "Volgorde uren/naam". Leuke manier: als een coach wordt ingezet conform zijn voorkeur dan kleur de inzet groen.

3. Vraag: Het gegenereerde rooster heeft echter niet met iedereen rekening kunnen houden. Bij welke coach is zijn voorkeur het meeste naar voren gekomen en bij wie minder? Druk dit uit in percentages van ingeplande uren binnen de voorkeur / totaal ingeplande uren x 100%. Antwoord: zie headers van de roosters per coach. Overigens de headers van samenvattende Bitlab rooster geeft een gemiddeld percentage van toegekende voorkeur percentages. Hoe hoger dit getal hoe beter het rooster is?

4. Vraag: Genereer nu zelf een rooster die zo veel mogelijk luistert naar de voorkeur van de coaches. De shifts zijn hieronder in de tabel te vinden. Antwoord: druk op button: "Nieuw rooster (Refresh)".  Opmerkingen: 
    - de roosters van Sander hebben vaak een laag percentage van de toegekende voorkeur. Reden: Sander heeft een beperkte voorkeur, namelijk: alléén de avonden van 4 van de 7 dagen.
    - coaches zijn gehele dag inzetbaar


## Conclusie



