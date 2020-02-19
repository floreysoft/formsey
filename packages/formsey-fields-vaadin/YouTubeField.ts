import { html, property, css } from 'lit-element';
import { Field, FieldDefinition } from '@formsey/core';

interface YouTubeFieldDefinition extends FieldDefinition {
  url: string
  width: string
  align: string
}

export class YouTubeField extends Field<YouTubeFieldDefinition, string> {
  @property({ converter: Object })
  definition: YouTubeFieldDefinition;

  private readonly WATCH_PARAMETER = "watch?v=";
	private readonly YOUTU_PARAMETER = "youtu.be/";

  static get styles() {
    return [...super.styles, css`
    :host {
      display: table;
      width: 100%;
    }

    .fs-video {
      position: relative;
      overflow: hidden;
      max-width: 100%;
    }

    iframe {
      border: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }`]
  }

  renderField() {
    let width = this.definition.width;
    let style = "width:"
		if ( width.endsWith("%") ) {
			// Set absolute height
			let widthInPercent : number = <number>(width.substring(0, width.lastIndexOf("%")) as unknown)
			let height = widthInPercent * 9 / 16;
			style += widthInPercent+"%;padding-bottom:"+height+"%"
		} else {
			if ( width.endsWith("px") ) {
				width = width.substring(0, width.lastIndexOf("px"));
			}
		  let widthInPixel = <number>(width as unknown);
			let heightInPixel = widthInPixel * 9 / 16;
			style += widthInPixel + "px;height:"+heightInPixel+"px"
		}
		return html`<div class="fs-video" style="${style};float:${this.definition.align}"><iframe src="//youtube.com/embed/${this.extractVideoId(this.definition.url)}"></iframe></div>`
  }

  protected extractVideoId(videoUrl: string) : string {
    let videoId = videoUrl;
		let watchIndex = videoUrl.indexOf(this.WATCH_PARAMETER);
		if ( watchIndex > 0 ) {
			videoId = videoUrl.substring(watchIndex + this.WATCH_PARAMETER.length)
		}
		let youtuIndex = videoUrl.indexOf(this.YOUTU_PARAMETER);
		if ( youtuIndex > 0 ) {
			videoId = videoUrl.substring(youtuIndex + this.YOUTU_PARAMETER.length)
		}
		let paramsIndex = videoUrl.indexOf("&");
		if ( paramsIndex > 0 ) {
			videoId = videoId.substring(0, paramsIndex);
		}
		paramsIndex = videoUrl.indexOf("?");
		if ( paramsIndex > 0 ) {
			videoId = videoId.substring(0, paramsIndex);
		}
		return videoId;
  }
}

customElements.define('formsey-youtube', YouTubeField);