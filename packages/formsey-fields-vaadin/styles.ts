import { css } from 'lit-element';

export const FORM_STYLES = css`
  .fft,.ffd {
    color: var(--lumo-secondary-text-color);
    font-weight: 500;
    font-size: var(--lumo-font-size-l);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
  }
  .ffd {
    font-size: var(--lumo-font-size-m);
  }
  .ffg {
    display: inline-grid;
    grid-gap: 5px 5px;
    width: 100%;
    box-sizing: border-box;
  }
  .fff {
    width: 100%;
  }

  /* YouTube field */
  formsey-youtube {
    display: table;
    width: 100%;
  }

  formsey-youtube .fs-video {
    position: relative;
    overflow: hidden;
    max-width: 100%;
  }

  formsey-youtube iframe {
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

`
