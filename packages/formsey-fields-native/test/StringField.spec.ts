import { defineCE, fixture, expect } from "@open-wc/testing";

import "../StringField";
import { StringField } from "../StringField";

describe("<formsey-string>", () => {
  // render in component throws an exception, but all we see is a timeout
  // https://github.com/open-wc/open-wc/issues/228
  it("should throw when missing definition property", async () => {
    const el: any = new StringField(); // need to call protected method
    expect(() => el.checkProperties()).to.throw(
      "property 'definition' required"
    );
  });

  // https://github.com/open-wc/open-wc/tree/master/packages/testing-helpers
  it("checkProperties gets called", async () => {
    let checkCalled = false;
    let renderCalled = false;
    const tag = defineCE(
      class extends StringField {
        protected checkProperties(): void {
          checkCalled = true;
        }

        protected render() {
          renderCalled = true;
        }
      }
    );
    await fixture(`<${tag}></${tag}>`);
    expect(checkCalled).to.be.true;
    expect(renderCalled).to.be.true;
  });

  it('native input should have type="text"', async () => {
    const definition = {};
    const el: any = await fixture(
      `<formsey-string definition="${definition}"></formsey-string>`
    );
    const native = el.shadowRoot.querySelector("input");
    expect(native.getAttribute("type")).to.be.eql("text");
  });

  it("properly initializes value in native widget", async () => {
    const value = "hiho";
    const definition = {};
    const el: any = await fixture(
      `<formsey-string value="${value}" definition="${definition}"></formsey-string>`
    );
    expect(el).not.to.be.undefined;
    const native = el.shadowRoot.querySelector("input");
    expect(native).not.to.be.undefined;
    expect(native.value).to.be.eql(value);
  });
});
