import { expect, fixture, html } from "@open-wc/testing";
import { getLibrary } from "@formsey/core/Registry";
import "../StringField";
import { StringField } from "../StringField";

/** Fields render into light DOM, so the native input is a direct descendant. */
async function createStringField(definition: object, value?: string): Promise<StringField> {
  const el = await fixture<StringField>(html`<formsey-string .definition=${definition} .value=${value}></formsey-string>`)
  await el.updateComplete
  return el
}

describe("<formsey-string>", () => {
  it("registers itself in the native library", () => {
    expect(getLibrary("native").components["string"]).to.exist
  })

  it("renders nothing without a definition", async () => {
    const el = await fixture<StringField>(html`<formsey-string></formsey-string>`)
    expect(el.querySelector("input")).to.be.null
  })

  it('renders a native input with type="text"', async () => {
    const el = await createStringField({ type: "string", name: "name" })
    expect(el.querySelector("input")!.getAttribute("type")).to.equal("text")
  })

  it("renders label, help text and required marker", async () => {
    const el = await createStringField({ type: "string", name: "name", label: "Name", helpText: "Your name", required: true })
    expect(el.querySelector("label")!.textContent).to.contain("Name")
    expect(el.querySelector(".lfr")).to.exist
    expect(el.querySelector(".lfht")!.textContent).to.equal("Your name")
  })

  it("initializes the native input with the value", async () => {
    const el = await createStringField({ type: "string", name: "name" }, "hiho")
    expect(el.querySelector("input")!.value).to.equal("hiho")
  })

  it("falls back to the default of the definition", async () => {
    const el = await createStringField({ type: "string", name: "name", default: "fallback" })
    expect(el.value).to.equal("fallback")
  })

  it("dispatches input events carrying path and value", async () => {
    const el = await createStringField({ type: "string", name: "name" })
    el.parentPath = "person"
    let detail: any
    el.addEventListener("input", e => detail = (e as unknown as CustomEvent).detail)
    const input = el.querySelector("input")!
    input.value = "Ada"
    input.dispatchEvent(new Event("input", { bubbles: true }))
    expect(detail).to.deep.equal({ name: "person.name", value: "Ada" })
    expect(el.value).to.equal("Ada")
  })

  it("validates required fields", async () => {
    const el = await createStringField({ type: "string", name: "name", required: true })
    expect(el.checkValidity()).to.be.false
    el.value = "Ada"
    await el.updateComplete
    expect(el.checkValidity()).to.be.true
  })
})
