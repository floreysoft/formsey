import { LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

interface YouTubeFieldDefinition extends FieldDefinition {
	url: string
	width: string
	align: string
}
@customElement("formsey-youtube")
export class YouTubeField extends LabeledField<YouTubeFieldDefinition, string> {
	@property({ converter: Object })
	definition: YouTubeFieldDefinition;

	private readonly WATCH_PARAMETER = "watch?v=";
	private readonly YOUTU_PARAMETER = "youtu.be/";

	renderField() {
		let width = this.definition.width;
		let style = "width:"
		if (width.endsWith("%")) {
			// Set absolute height
			let widthInPercent: number = <number>(width.substring(0, width.lastIndexOf("%")) as unknown)
			let height = widthInPercent * 9 / 16;
			style += widthInPercent + "%;padding-bottom:" + height + "%"
		} else {
			if (width.endsWith("px")) {
				width = width.substring(0, width.lastIndexOf("px"));
			}
			let widthInPixel = <number>(width as unknown);
			let heightInPixel = widthInPixel * 9 / 16;
			style += widthInPixel + "px;height:" + heightInPixel + "px"
		}
		var align = "";
		switch (this.definition.align) {
			case "center":
				align = "margin-left: auto;margin-right: auto;"
				break;
			case "right":
				align = "margin-left: auto;"
				break;
		}
		return html`<div class="fs-video" style="${style};${align}"><iframe src="//youtube.com/embed/${this.extractVideoId(this.definition.url)}"></iframe></div>`
	}

	protected extractVideoId(videoUrl: string): string {
		let videoId = videoUrl;
		let watchIndex = videoUrl.indexOf(this.WATCH_PARAMETER);
		if (watchIndex > 0) {
			videoId = videoUrl.substring(watchIndex + this.WATCH_PARAMETER.length)
		}
		let youtuIndex = videoUrl.indexOf(this.YOUTU_PARAMETER);
		if (youtuIndex > 0) {
			videoId = videoUrl.substring(youtuIndex + this.YOUTU_PARAMETER.length)
		}
		let paramsIndex = videoUrl.indexOf("&");
		if (paramsIndex > 0) {
			videoId = videoId.substring(0, paramsIndex);
		}
		paramsIndex = videoUrl.indexOf("?");
		if (paramsIndex > 0) {
			videoId = videoId.substring(0, paramsIndex);
		}
		return videoId;
	}
}

getLibrary("native").registerComponent("youtube", {
	importPath: "@formsey/fields-native/YouTubeField",
	template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<YouTubeFieldDefinition, string>) => {
		return html`<formsey-youtube id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-youtube>`
	}
})
