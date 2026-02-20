# Trame — Milano ebraica nel tempo (build)

Questa cartella è una variante del progetto **geo-trame-develop** adattata al dataset `TRAME_JMi_sample.json`.

## Come aprire

Consiglio di **servire** la cartella con un piccolo server HTTP (evita problemi di sicurezza del browser con `file://`).

Esempio (Python):

```bash
cd trame-milano
python -m http.server 8000
```

Poi apri nel browser:

- `http://localhost:8000/milano.html`

## Dataset

- `data/milano_sites.js` (generato): contiene `milanoSites` (con coordinate) e `milanoSitesNoCoords` (senza coordinate).
- `data/milano_sites_missing_coords.csv`: elenco dei record senza lat/lon (da completare con geocoding o pulizia dati).

Intervallo temporale (slider): **1927–2026** (derivato dal dataset).

## Note

- I record senza coordinate non vengono mostrati sulla mappa.
- Stile e componenti (Leaflet + TimeDimension) sono mantenuti coerenti con il progetto di partenza.
