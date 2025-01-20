/**
 * Funzione che regola la durata dell'animazione di un testo p (interno a un div di classe .scrolling-text)
 * che scorre all'interno di un contenitore.
 * La durata dell'animazione viene calcolata in base alla lunghezza del testo rispetto alla larghezza del contenitore.
 * Se il testo non è più lungo del contenitore, l'animazione viene disabilitata.
 *
 * @param {number} speed - Un valore che modifica la velocità dell'animazione. Il valore predefinito è 1.
 * @param {boolean} PlayHover - Booleano che, se true, interrompe l'animazione quando il cursore è sopra il div.
 * 
 * La funzione deve essere chiamata dopo che il DOM è stato caricato per funzionare correttamente.
 */
function adjustAnimationDuration(speed = 1, PlayHover = true) {
    let hover = "running";
    if (!PlayHover) {
      hover = "paused";
    }
    const css = `
      .scrolling-text {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
      }
      .scrolling-text p {
        display: inline-block;
        animation: scroll linear infinite;
        /*animation: scroll cubic-bezier(0.1, 0, 0.9, 1) infinite;*/
        /*animation-delay: 1s;*/
        white-space: nowrap;
      }
      .scrolling-text:hover>p {
        animation-play-state: ${hover};
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
    speed = 0.1 / speed;
    // speed = 10 / speed;

    document.querySelectorAll('.scrolling-text p').forEach(p => {
        const parent = p.parentElement; // Ottieni il padre dell'elemento <p>
        const textLength = p.textContent.length;
        const parentWidth = parent.offsetWidth; // Larghezza del contenitore (padre)
        const textWidth = p.scrollWidth; // Larghezza del testo (contenuto del <p>)

        if (textWidth > parentWidth) {
            let duration = textLength * speed; // Dura almeno 5 secondi, con un incremento in base alla lunghezza
            // let duration = (textWidth / parentWidth) * speed; 
            p.style.animationDuration = `${duration}s`;
        } else {
            p.style.animation = 'none'; // Se il testo non è più lungo del padre, disabilita l'animazione
        }

        // Modifica il valore di "from" dell'animazione in base alla larghezza del contenitore
        const keyframes = `
          @keyframes scroll {
              from {
                  transform: translateX(${parentWidth}px);
              }
              to {
                  transform: translateX(-100%);
              }
          }
          `;
          const dynamicStyle = document.createElement('style');
          dynamicStyle.innerHTML = keyframes;
          document.head.appendChild(dynamicStyle);
    });
}

// Esegui la funzione automaticamente quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", function() {
    adjustAnimationDuration(.5, false);
});
