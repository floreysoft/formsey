import { aTimeout, expect, fixture, html } from "@open-wc/testing";
import { Form, get, set } from "@formsey/core/Form";
import { area, resolve } from "@formsey/core/Registry";
import "../index";

const DEFINITION = {
  type: "form",
  fields: [
    { type: "string", name: "firstName", label: "First name", required: true },
    { type: "string", name: "lastName", label: "Last name" },
    {
      type: "form", name: "address", fields: [
        { type: "string", name: "city", label: "City" }
      ]
    }
  ]
}

/** Collects elements across the shadow root of the styled form. */
function inputs(form: Form): HTMLInputElement[] {
  const styledForm = form.querySelector("formsey-styled-form")!
  return [...styledForm.shadowRoot!.querySelectorAll("input")]
}

async function createForm(value?: object): Promise<Form> {
  const form = await fixture<Form>(html`<formsey-form .definition=${structuredClone(DEFINITION)} .value=${value}></formsey-form>`)
  // Nested fields render in their own update cycles
  await aTimeout(50)
  return form
}

describe("path helpers", () => {
  const data = { person: { name: "Ada", tags: ["a", "b"] } }

  it("get() reads nested and indexed paths", () => {
    expect(get(data, "person.name")).to.equal("Ada")
    expect(get(data, "person.tags[1]")).to.equal("b")
    expect(get(data, "person.missing")).to.be.undefined
  })

  it("set() writes nested and indexed paths", () => {
    const copy = structuredClone(data)
    set(copy, "person.name", "Grace")
    set(copy, "person.tags[0]", "x")
    expect(copy).to.deep.equal({ person: { name: "Grace", tags: ["x", "b"] } })
  })

  it("resolve() behaves like get()", () => {
    expect(resolve(data, "person.tags[0]")).to.equal("a")
  })

  it("area() derives grid area names for unnamed fields", () => {
    const fields = [{ type: "title" }, { type: "string", name: "a" }, { type: "title" }]
    expect(area(fields[1], fields)).to.equal("a")
    expect(area(fields[0], fields)).to.equal("title0")
    expect(area(fields[2], fields)).to.equal("title1")
  })
})

describe("<formsey-form>", () => {
  it("renders all fields of the definition, including nested forms", async () => {
    const form = await createForm()
    expect(inputs(form).length).to.equal(3)
  })

  it("passes values down to the fields", async () => {
    const form = await createForm({ firstName: "Ada", address: { city: "London" } })
    expect(inputs(form).map(input => input.value)).to.deep.equal(["Ada", "", "London"])
  })

  it("fires load once the definition has been rendered", async () => {
    const form = document.createElement("formsey-form") as Form
    let loaded = 0
    form.addEventListener("load", () => loaded++)
    document.body.append(form)
    form.definition = structuredClone(DEFINITION)
    await aTimeout(50)
    form.remove()
    expect(loaded).to.equal(1)
  })

  it("merges field changes into the form value and reports the path", async () => {
    const form = await createForm({ firstName: "Ada" })
    let detail: any
    form.addEventListener("change", e => detail = (e as unknown as CustomEvent).detail)
    const city = inputs(form)[2]
    city.value = "London"
    city.dispatchEvent(new Event("change", { bubbles: true }))
    expect(detail.name).to.equal("address.city")
    expect(form.value).to.deep.equal({ firstName: "Ada", address: { city: "London" } })
  })

  it("getValue() / setValue() address values by path", async () => {
    const form = await createForm({ address: { city: "London" } })
    expect(form.getValue("address.city")).to.equal("London")
    form.setValue("address.city", "Paris")
    await aTimeout(50)
    expect(inputs(form)[2].value).to.equal("Paris")
  })

  it("collects validation errors by field path", async () => {
    const form = await createForm()
    let errors: Map<string, any> | undefined
    form.addEventListener("invalid", e => errors = (e as unknown as CustomEvent).detail)
    form.reportValidity()
    await aTimeout(50)
    expect(errors).to.exist
    expect([...errors!.keys()]).to.deep.equal(["firstName"])
  })
})
