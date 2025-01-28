/**
 * Funzione che regola la durata dell'animazione di un testo p (interno a un div di classe .scrolling-text)
 * che scorre all'interno di un contenitore.
 * La durata dell'animazione viene calcolata in base alla lunghezza del testo rispetto alla larghezza del contenitore.
 * Se il testo non è più lungo del contenitore, l'animazione viene disabilitata.
 *
 * @param {number} speed - Un valore che modifica la velocità dell'animazione. Il valore predefinito è 1.
 * @param {boolean} PlayHover - Booleano che, se true, interrompe l'animazione quando il cursore è sopra il div.
 * @param {number} pmarginBottom 
 * @param {boolean} consoleLog 
 * @param {boolean} enablePadding - abilita un padding che in realtà è un margin
 * 
 * La funzione deve essere chiamata dopo che il DOM è stato caricato per funzionare correttamente.
 */
function adjustAnimationDuration(speed = 1, PlayHover = true, pmarginBottom = null, consoleLog = false, enablePadding = true, startPause = 2) {
    let hover = "running";
    if (!PlayHover) {
      hover = "paused";
    }
    let pmarginBottomText = "";
    if (pmarginBottom != null) {
      pmarginBottomText = "margin-bottom: " + pmarginBottom.toString() + "px;";
    }
    const css = `
      .scrolling-text {
        white-space: nowrap; 
        overflow: hidden;
      }
      .scrolling-text :first-child {
        animation: scroll linear infinite;
        /*animation: scroll cubic-bezier(0.1, 0, 0.9, 1) infinite;*/
        /*animation-delay: 1s;*/
        animation-play-state: running; /* default */
        ${pmarginBottomText}
      }
      .scrolling-text :first-child:hover {
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

    document.querySelectorAll('.scrolling-text *').forEach((p, index) => {
        if (p.children.length > 0) { // Salta l'iterazione se ci sono figli
          return; 
        }
        p.id = 'p-' + index;
        const parent = p.parentElement; // Ottieni il padre dell'elemento <p>
        const originalText = p.innerHTML;
        p.innerHTML = '';  // Rimuovi il testo
        let parentWidth = parent.offsetWidth; // Larghezza del contenitore (padre) senza testo

        let parentPaddingLeft = 0;
        let parentPaddingRight = 0;
        const parentStyle = window.getComputedStyle(parent); //gestisce eventuali padding sul padre
        if (enablePadding){
          parentPaddingLeft = parseFloat(parentStyle.paddingLeft);
          parentPaddingRight = parseFloat(parentStyle.paddingRight);
          parentWidth = parent.offsetWidth - parentPaddingLeft - parentPaddingRight;
        }

        p.innerHTML = originalText; // Ripristina il testo nel <p>

        // const parentWidth = parent.offsetWidth; // Larghezza del contenitore (padre)
        let textWidth = p.scrollWidth; // Larghezza del testo (contenuto del <p>)
        if (textWidth === 0) {
            p.style.display = 'inline-block';
            textWidth = p.scrollWidth;
        }

        if (textWidth > parentWidth) {
          let duration = (parentWidth+textWidth) * speed / 5; // Dura almeno 5 secondi, con un incremento in base alla lunghezza
          const remparentWidth = parentWidth / 16; //converte a REM
          let keyframes = `
            #p-${index} {
              animation: scroll-p-${index} ${duration}s linear infinite;
              width: ${remparentWidth - 0.125}rem;
            }

            td:has(*#p-${index}) {
              width: ${remparentWidth - 0.250}rem !important;
              display: block;
              margin-left: ${parentPaddingLeft}px;
              margin-right: ${parentPaddingRight}px;
            }`

          if (startPause != 0){
            const totalWidth = textWidth + parentPaddingLeft + parentPaddingRight;
            const timeAtZero = (parentWidth / (parentWidth + totalWidth)) * duration;  // Quando il testo arriva su 0
            const timeAtZeroPercentage = (timeAtZero / duration) * 100;  // Calcola la percentuale di tempo per il 0%
            const pausePercentage = (startPause / duration) * 100;  // Calcolare la pausa in percentuale della durata totale
            const pauseEndPercentage = timeAtZeroPercentage + pausePercentage;  // La fine della pausa
            keyframes += `
            @keyframes scroll-p-${index} {
                0% {
                    transform: translateX(${parentWidth}px);
                }
                ${timeAtZeroPercentage}% {
                    transform: translateX(${-parentPaddingLeft}px);
                }
                ${pauseEndPercentage}% {
                    transform: translateX(${-parentPaddingLeft}px);
                }
                100% {
                    transform: translateX(-${textWidth+parentPaddingLeft}px);
                }
            }`;
          } else {
            keyframes += `
            @keyframes scroll-p-${index} {
                from {
                    transform: translateX(${parentWidth}px);
                }
                to {
                    transform: translateX(-${textWidth+parentPaddingLeft}px);
                }
            }
            `;
          }
          const dynamicStyle = document.createElement('style');
          dynamicStyle.innerHTML = keyframes;
          document.head.appendChild(dynamicStyle);
        } else {
            p.style.animation = 'none'; // Se il testo non è più lungo del padre, disabilita l'animazione
        }
        if (consoleLog){
          console.log("text: ", p.textContent, "\nparentWidth: ", parentWidth, ".   textWidth: ", textWidth);
          console.log("parentWidth:", parentWidth, parentPaddingLeft, parentPaddingRight)
        }
    });
}

// Esegui la funzione automaticamente quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", function() {
    adjustAnimationDuration(.5, false);
});
