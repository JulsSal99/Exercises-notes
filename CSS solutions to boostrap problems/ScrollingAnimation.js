/**
 * Funzione che regola la durata dell'animazione di un testo p (interno a un div di classe .scrolling-text)
 * che scorre all'interno di un contenitore.
 * La durata dell'animazione viene calcolata in base alla lunghezza del testo rispetto alla larghezza del contenitore.
 * Se il testo non è più lungo del contenitore, l'animazione viene disabilitata.
 *
 * @param {number} speed - Un valore che modifica la velocità dell'animazione. Il valore predefinito è 1.
 *
 * La funzione deve essere chiamata dopo che il DOM è stato caricato per funzionare correttamente.
 */
function adjustAnimationDuration(speed = 1) {
    const css = `
      .scrolling-text {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
      }
      .scrolling-text p {
        display: inline-block;
        animation: scroll cubic-bezier(0.1, 0, 0.9, 1) infinite;
        animation-delay: 1s;
        white-space: nowrap;
      }
      .scrolling-text:hover>p {
        animation-play-state: paused;
      }
      @keyframes scroll {
        from {
          transform: translateX(0px);
        }
        to {
          transform: translateX(-110%);
        }
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    document.querySelectorAll('.scrolling-text p').forEach(p => {
        const parent = p.parentElement; // Ottieni il padre dell'elemento <p>
        const textLength = p.textContent.length;
        const parentWidth = parent.offsetWidth; // Larghezza del contenitore (padre)
        const textWidth = p.scrollWidth; // Larghezza del testo (contenuto del <p>)

        if (textWidth > parentWidth) {
            let duration = (textLength / (10 * speed)) + 1; // Dura almeno 5 secondi, con un incremento in base alla lunghezza
            p.style.animationDuration = `${duration}s`;
        } else {
            p.style.animation = 'none'; // Se il testo non è più lungo del padre, disabilita l'animazione
        }
    });
}

// Esegui la funzione automaticamente quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", function() {
    adjustAnimationDuration();
});
