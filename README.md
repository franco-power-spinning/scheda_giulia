# Scheda di Allenamento

Questa applicazione web permette di visualizzare e tracciare i progressi del tuo allenamento.

## Funzionalità

- Visualizzazione della scheda di allenamento
- Registrazione di peso e ripetizioni per ogni esercizio
- Storico dei progressi per ogni esercizio
- Salvataggio automatico dei dati nel browser

## Come utilizzare

1. Apri il file `index.html` nel tuo browser
2. Per ogni esercizio, inserisci:
   - Il peso utilizzato (in kg)
   - Il numero di ripetizioni effettuate
3. Clicca su "Salva" per registrare i dati
4. I dati verranno salvati automaticamente e potrai visualizzare lo storico degli allenamenti

## Personalizzazione

Per modificare la scheda di allenamento:

1. Apri il file `workout.json`
2. Modifica i dati degli esercizi secondo le tue esigenze
3. Aggiungi le immagini degli esercizi nella cartella `images`

## Struttura dei dati

Ogni esercizio contiene:
- Nome
- Immagine
- Numero di serie
- Numero di ripetizioni
- Tempo di recupero
- Note aggiuntive

## Note tecniche

- I dati vengono salvati nel localStorage del browser
- Le immagini devono essere posizionate nella cartella `images`
- L'applicazione funziona offline dopo il primo caricamento 