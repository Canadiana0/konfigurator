"use client";

import { useEffect, useMemo, useState } from "react";

type Variant = {
  price: number;
  seats: string;
  size: string;
  depth: string;
  jets: number;
  water: string;
  weight: string;
  power: string;
  loungers: number;
  notes: string;
};

type Product = {
  id: string;
  model: string;
  line: string;
  variants: Record<string, Variant>;
};

type Accessory = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const PRODUCTS: Product[] = [
  {
    id: "379",
    model: "Hydropool 379",
    line: "Signature",
    variants: {
      Gold: {
        price: 280110,
        seats: "3",
        size: "165 × 213 cm",
        depth: "93 cm",
        jets: 31,
        water: "738 l",
        weight: "295 kg",
        power: "6 kW",
        loungers: 0,
        notes: "Kompaktní model pro menší prostor.",
      },
      Platinum: {
        price: 280110,
        seats: "3",
        size: "165 × 213 cm",
        depth: "76 cm",
        jets: 31,
        water: "772 l",
        weight: "314 kg",
        power: "6 kW",
        loungers: 0,
        notes: "Model dle ceníku 2026.",
      },
    },
  },
  {
    id: "455",
    model: "Hydropool 455",
    line: "Signature",
    variants: {
      Gold: {
        price: 301710,
        seats: "4",
        size: "203 × 203 cm",
        depth: "93 cm",
        jets: 33,
        water: "1039 l",
        weight: "333 kg",
        power: "6 kW",
        loungers: 0,
        notes: "Komfortní vířivka pro 4 osoby.",
      },
      Platinum: {
        price: 347610,
        seats: "4",
        size: "203 × 203 cm",
        depth: "93 cm",
        jets: 40,
        water: "1039 l",
        weight: "333 kg",
        power: "9 kW",
        loungers: 0,
        notes: "Platinum přidává více trysek a vyšší výkon.",
      },
    },
  },
  {
    id: "579",
    model: "Hydropool 579",
    line: "Signature",
    variants: {
      Gold: {
        price: 301710,
        seats: "4–5",
        size: "203 × 203 cm",
        depth: "93 cm",
        jets: 34,
        water: "961 l",
        weight: "354 kg",
        power: "6 kW",
        loungers: 1,
        notes: "Rodinná vířivka s jedním lehátkem.",
      },
      Platinum: {
        price: 347610,
        seats: "4–5",
        size: "203 × 203 cm",
        depth: "93 cm",
        jets: 41,
        water: "961 l",
        weight: "354 kg",
        power: "9 kW",
        loungers: 1,
        notes: "Vyšší počet trysek a vyšší výkon.",
      },
    },
  },
  {
    id: "679",
    model: "Hydropool 679",
    line: "Signature",
    variants: {
      Gold: {
        price: 332310,
        seats: "5–6",
        size: "213 × 213 cm",
        depth: "99 cm",
        jets: 39,
        water: "1150 l",
        weight: "390 kg",
        power: "6 kW",
        loungers: 1,
        notes: "Oblíbený větší rodinný model.",
      },
      Platinum: {
        price: 374610,
        seats: "5–6",
        size: "213 × 213 cm",
        depth: "99 cm",
        jets: 53,
        water: "1150 l",
        weight: "390 kg",
        power: "9 kW",
        loungers: 1,
        notes: "Výrazně více trysek a vyšší výkon systému.",
      },
    },
  },
  {
    id: "655",
    model: "Hydropool 655",
    line: "Signature",
    variants: {
      Gold: {
        price: 332310,
        seats: "neuvedeno",
        size: "213 × 213 cm",
        depth: "99 cm",
        jets: 40,
        water: "neuvedeno",
        weight: "neuvedeno",
        power: "6 kW",
        loungers: 1,
        notes: "Signature model dle ceníku 2026.",
      },
      Platinum: {
        price: 374610,
        seats: "neuvedeno",
        size: "213 × 213 cm",
        depth: "99 cm",
        jets: 50,
        water: "neuvedeno",
        weight: "neuvedeno",
        power: "9 kW",
        loungers: 1,
        notes: "Signature Platinum dle ceníku 2026.",
      },
    },
  },
  {
    id: "728",
    model: "Hydropool 728",
    line: "Signature",
    variants: {
      Platinum: {
        price: 394410,
        seats: "neuvedeno",
        size: "229 × 229 cm",
        depth: "99 cm",
        jets: 51,
        water: "neuvedeno",
        weight: "neuvedeno",
        power: "9 kW",
        loungers: 1,
        notes: "Velký Signature Platinum model dle ceníku 2026.",
      },
    },
  },
  {
    id: "779",
    model: "Hydropool 779",
    line: "Signature",
    variants: {
      Platinum: {
        price: 394410,
        seats: "neuvedeno",
        size: "229 × 229 cm",
        depth: "99 cm",
        jets: 55,
        water: "neuvedeno",
        weight: "neuvedeno",
        power: "9 kW",
        loungers: 1,
        notes: "Velký Signature Platinum model dle ceníku 2026.",
      },
    },
  },
  {
    id: "799",
    model: "Hydropool 799",
    line: "Signature",
    variants: {
      Platinum: {
        price: 412410,
        seats: "6–8",
        size: "229 × 229 cm",
        depth: "99 cm",
        jets: 64,
        water: "1385 l",
        weight: "467 kg",
        power: "9 kW",
        loungers: 2,
        notes: "Velký společenský model s dvojlehátkem.",
      },
    },
  },
];

const ACCESSORIES: Accessory[] = [
  { id: "steps-basic", name: "Dvoustupňové schody", price: 6642, category: "Přístup" },
  { id: "cover-lifter-standard", name: "Zvedák termokrytu Standard", price: 8340, category: "Přístup" },
  { id: "cover-lifter-hydraulic-over", name: "Zvedák termokrytu Hydraulic (nad vanu)", price: 11502, category: "Přístup" },
  { id: "cover-lifter-hydraulic-back", name: "Zvedák termokrytu Hydraulic (za vanu)", price: 13580, category: "Přístup" },
  { id: "wifi", name: "inTouch (dálkové ovládání pomocí Wi-Fi)", price: 12500, category: "Technologie" },
  { id: "heat-pump-5", name: "Tepelné čerpadlo Gecko 5 kW", price: 66200, category: "Technologie" },
  { id: "air-massage", name: "Vzduchová vyhřívaná masáž (10 trysek navíc)", price: 23382, category: "Signature výbava" },
  { id: "bypass", name: "ByPass na druhotné přitápění", price: 5562, category: "Signature výbava" },
  { id: "moonfall", name: "Moonfall Package (Aquablade vodopádky + osvětlení)", price: 29682, category: "Signature výbava" },
  { id: "ozonator", name: "Ozonátor", price: 4482, category: "Signature výbava" },
  { id: "purewater", name: "PureWater systém (UV + O3)", price: 14382, category: "Signature výbava" },
];

const SHELL_COLORS = [
  { id: "alpine-mist", name: "Alpine Mist", price: 0 },
  { id: "silver-marble", name: "Silver Marble", price: 0 },
  { id: "cosmic-swirl", name: "Cosmic Swirl", price: 0 },
  { id: "pure-white", name: "Pure White", price: 0 },
];

const CABINET_COLORS = [
  { id: "grey", name: "Šedý kabinet", price: 0 },
  { id: "brown", name: "Hnědý kabinet", price: 0 },
  { id: "black", name: "Černý kabinet", price: 4900 },
];

const COVER_OPTIONS = [
  { id: "included", name: "Termokryt v ceně", price: 0 },
  { id: "premium", name: "Prémiové řešení termokrytu", price: 7900 },
];

const DELIVERY_OPTIONS = [
  { id: "standard", name: "Doprava, montáž, zprovoznění a zaškolení", price: 10000 },
  { id: "none", name: "Bez dopravy a montáže", price: 0 },
  { id: "crane", name: "Jeřáb / speciální manipulace – individuálně", price: 0 },
];

const currency = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

export default function Page() {
  const [selectedProductId, setSelectedProductId] = useState("579");
  const [selectedVariant, setSelectedVariant] = useState("Gold");
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(["steps-basic"]);
  const [customerName, setCustomerName] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [discount, setDiscount] = useState(0);
  const [customTransport, setCustomTransport] = useState(0);
  const [installation, setInstallation] = useState(0);
  const [shellColor, setShellColor] = useState("alpine-mist");
  const [cabinetColor, setCabinetColor] = useState("grey");
  const [coverOption, setCoverOption] = useState("included");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [priceMode, setPriceMode] = useState("b2c");
  const [salesperson, setSalesperson] = useState("Canadiana");
  const [validityDays, setValidityDays] = useState(14);
  const [note, setNote] = useState("");

  const product = PRODUCTS.find((p) => p.id === selectedProductId)!;
  const variants = Object.keys(product.variants);
  const safeVariant = variants.includes(selectedVariant) ? selectedVariant : variants[0];
  const variant = product.variants[safeVariant];

  useEffect(() => {
    if (!variants.includes(selectedVariant)) {
      setSelectedVariant(variants[0]);
    }
  }, [selectedProductId, selectedVariant, variants]);

  const selectedAccessoryItems = ACCESSORIES.filter((a) =>
    selectedAccessories.includes(a.id)
  );
  const selectedShell = SHELL_COLORS.find((x) => x.id === shellColor);
  const selectedCabinet = CABINET_COLORS.find((x) => x.id === cabinetColor);
  const selectedCover = COVER_OPTIONS.find((x) => x.id === coverOption);
  const selectedDelivery = DELIVERY_OPTIONS.find((x) => x.id === deliveryOption);

  const accessoriesTotal = selectedAccessoryItems.reduce((sum, item) => sum + item.price, 0);
  const optionsTotal =
    (selectedShell?.price || 0) +
    (selectedCabinet?.price || 0) +
    (selectedCover?.price || 0);
  const transportTotal = Number(customTransport || 0) + (selectedDelivery?.price || 0);
  const baseTotal =
    variant.price +
    accessoriesTotal +
    optionsTotal +
    transportTotal +
    Number(installation || 0);
  const discountAmount = Math.round(baseTotal * (Number(discount || 0) / 100));
  const finalTotal = Math.max(0, baseTotal - discountAmount);
  const vatTotal = Math.round(finalTotal * 1.12);
  const publicPrice = priceMode === "b2c" ? vatTotal : finalTotal;

  const offerText = useMemo(() => {
    return [
      "PRODEJNÍ NABÍDKA – HYDROPOOL",
      "",
      `Klient: ${customerName || "Neuvedeno"}`,
      `Firma: ${customerCompany || "Neuvedeno"}`,
      `E-mail: ${customerEmail || "Neuvedeno"}`,
      `Obchodník: ${salesperson || "Canadiana"}`,
      `Platnost nabídky: ${validityDays} dní`,
      `Cenový režim: ${priceMode === "b2c" ? "B2C" : "B2B"}`,
      `Model: ${product.model}`,
      `Řada: ${product.line}`,
      `Varianta: ${safeVariant}`,
      `Barva skořepiny: ${selectedShell?.name || "neuvedeno"}`,
      `Barva kabinetu: ${selectedCabinet?.name || "neuvedeno"}`,
      `Termokryt: ${selectedCover?.name || "neuvedeno"}`,
      `Typ dopravy: ${selectedDelivery?.name || "neuvedeno"}`,
      "",
      "TECHNICKÉ PARAMETRY",
      `Počet míst: ${variant.seats}`,
      `Rozměry: ${variant.size}`,
      `Hloubka: ${variant.depth}`,
      `Hydromasážní trysky: ${variant.jets || "neuvedeno"}`,
      `Objem vody: ${variant.water}`,
      `Váha: ${variant.weight}`,
      `Spotřeba / výkon: ${variant.power}`,
      `Lehátka: ${variant.loungers}`,
      "",
      "PŘÍSLUŠENSTVÍ",
      ...(selectedAccessoryItems.length
        ? selectedAccessoryItems.map((item) => `- ${item.name}: ${currency.format(item.price)}`)
        : ["- bez příslušenství"]),
      `Příplatek za barvy a kryt: ${currency.format(optionsTotal)}`,
      `Doprava / manipulace: ${currency.format(transportTotal)}`,
      `Instalace / zprovoznění: ${currency.format(Number(installation || 0))}`,
      `Sleva: ${Number(discount || 0)} %`,
      "",
      `Cena bez DPH: ${currency.format(finalTotal)}`,
      `Cena s DPH 12 %: ${currency.format(vatTotal)}`,
      `Zobrazovaná prodejní cena: ${currency.format(publicPrice)}`,
      "",
      `Poznámka: ${note || "bez poznámky"}`,
    ].join("\n");
  }, [
    customerName,
    customerCompany,
    customerEmail,
    salesperson,
    validityDays,
    priceMode,
    product,
    safeVariant,
    variant,
    selectedShell,
    selectedCabinet,
    selectedCover,
    selectedDelivery,
    selectedAccessoryItems,
    optionsTotal,
    transportTotal,
    installation,
    discount,
    finalTotal,
    vatTotal,
    publicPrice,
    note,
  ]);

  function toggleAccessory(id: string) {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function downloadOffer() {
    const blob = new Blob([offerText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nabidka-${product.id}-${safeVariant.toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page">
      <div className="container">
        <section className="hero">
          <div>
            <div className="badge">Canadiana • Hydropool Signature 2026</div>
            <h1>Prodejní konfigurátor vířivek</h1>
            <p>
              Obchodní konfigurátor pro aktuálně prodávanou řadu Hydropool Signature.
              Vyber model, variantu, výbavu, dopravu a okamžitě získáš kalkulaci i text nabídky.
            </p>
          </div>

          <div className="heroBox">
            <div className="muted">Aktuálně nakonfigurováno</div>
            <div className="big">{product.model}</div>
            <div className="muted">{safeVariant}</div>
            <div className="price">{currency.format(finalTotal)}</div>
            <div className="muted">bez DPH</div>
          </div>
        </section>

        <div className="grid">
          <div className="leftCol">
            <section className="card">
              <h2>Základní konfigurace</h2>

              <div className="formGrid">
                <Field label="Klient">
                  <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </Field>

                <Field label="Firma">
                  <input value={customerCompany} onChange={(e) => setCustomerCompany(e.target.value)} />
                </Field>

                <Field label="E-mail">
                  <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                </Field>

                <Field label="Obchodník">
                  <input value={salesperson} onChange={(e) => setSalesperson(e.target.value)} />
                </Field>

                <Field label="Model">
                  <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                    {PRODUCTS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.model}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Varianta">
                  <select value={safeVariant} onChange={(e) => setSelectedVariant(e.target.value)}>
                    {variants.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Barva skořepiny">
                  <select value={shellColor} onChange={(e) => setShellColor(e.target.value)}>
                    {SHELL_COLORS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Barva kabinetu">
                  <select value={cabinetColor} onChange={(e) => setCabinetColor(e.target.value)}>
                    {CABINET_COLORS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Termokryt">
                  <select value={coverOption} onChange={(e) => setCoverOption(e.target.value)}>
                    {COVER_OPTIONS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Typ dopravy">
                  <select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
                    {DELIVERY_OPTIONS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Sleva (%)">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </Field>

                <Field label="Doprava / manipulace">
                  <input
                    type="number"
                    min="0"
                    value={customTransport}
                    onChange={(e) => setCustomTransport(Number(e.target.value))}
                  />
                </Field>

                <Field label="Instalace / zprovoznění">
                  <input
                    type="number"
                    min="0"
                    value={installation}
                    onChange={(e) => setInstallation(Number(e.target.value))}
                  />
                </Field>

                <Field label="Režim ceny">
                  <select value={priceMode} onChange={(e) => setPriceMode(e.target.value)}>
                    <option value="b2c">B2C (s DPH)</option>
                    <option value="b2b">B2B (bez DPH)</option>
                  </select>
                </Field>

                <Field label="Platnost nabídky (dny)">
                  <input
                    type="number"
                    min="1"
                    value={validityDays}
                    onChange={(e) => setValidityDays(Number(e.target.value))}
                  />
                </Field>
              </div>
            </section>

            <section className="card">
              <h2>Technické parametry modelu</h2>
              <div className="stats">
                <Stat label="Počet míst" value={variant.seats} />
                <Stat label="Rozměry" value={variant.size} />
                <Stat label="Trysky" value={String(variant.jets)} />
                <Stat label="Objem vody" value={variant.water} />
                <Stat label="Hloubka" value={variant.depth} />
                <Stat label="Výkon" value={variant.power} />
                <Stat label="Lehátka" value={String(variant.loungers)} />
                <Stat label="Váha" value={variant.weight} />
              </div>
              <p className="note">{variant.notes}</p>
            </section>

            <section className="card">
              <h2>Příslušenství a doplňky</h2>
              <div className="accessories">
                {ACCESSORIES.map((item) => (
                  <label key={item.id} className="checkCard">
                    <input
                      type="checkbox"
                      checked={selectedAccessories.includes(item.id)}
                      onChange={() => toggleAccessory(item.id)}
                    />
                    <div>
                      <div className="checkTitle">{item.name}</div>
                      <div className="muted">{currency.format(item.price)}</div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="card">
              <h2>Poznámka obchodníka</h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                placeholder="Např. klient chce dodání v květnu..."
              />
            </section>
          </div>

          <div className="rightCol">
            <section className="card sticky">
              <h2>Souhrn nabídky</h2>

              <SummaryRow label="Model" value={`${product.model} • ${safeVariant}`} />
              <SummaryRow label="Barvy" value={`${selectedShell?.name} / ${selectedCabinet?.name}`} />
              <SummaryRow label="Kryt" value={selectedCover?.name || ""} />
              <SummaryRow label="Základní cena" value={currency.format(variant.price)} />
              <SummaryRow label="Příslušenství" value={currency.format(accessoriesTotal)} />
              <SummaryRow label="Doprava" value={currency.format(transportTotal)} />
              <SummaryRow label="Instalace" value={currency.format(Number(installation || 0))} />
              <SummaryRow label="Sleva" value={`− ${currency.format(discountAmount)}`} />

              <div className="hr" />

              <div className="totalRow">
                <span>Celkem bez DPH</span>
                <span>{currency.format(finalTotal)}</span>
              </div>

              <div className="subTotalRow">
                <span className="muted">Celkem s DPH 12 %</span>
                <span>{currency.format(vatTotal)}</span>
              </div>

              <div className="subTotalRow">
                <span className="muted">Prodejní zobrazení</span>
                <span>{currency.format(publicPrice)}</span>
              </div>

              <button className="button" onClick={downloadOffer}>
                Export nabídky
              </button>
            </section>

            <section className="card">
              <h2>Text nabídky</h2>
              <div className="offerBox">{offerText}</div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="summaryRow">
      <span className="summaryLabel">{label}</span>
      <span className="summaryValue">{value}</span>
    </div>
  );
}
