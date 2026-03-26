"use client";

import { useMemo, useState } from "react";

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
];

const ACCESSORIES: Accessory[] = [
  { id: "steps-basic", name: "Dvoustupňové schody", price: 6642 },
  { id: "cover-lifter-standard", name: "Zvedák termokrytu Standard", price: 8340 },
  { id: "wifi", name: "inTouch (Wi-Fi ovládání)", price: 12500 },
  { id: "heat-pump-5", name: "Tepelné čerpadlo Gecko 5 kW", price: 66200 },
  { id: "ozonator", name: "Ozonátor", price: 4482 },
  { id: "purewater", name: "PureWater systém (UV + O3)", price: 14382 },
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
  const [discount, setDiscount] = useState(0);
  const [shellColor, setShellColor] = useState("alpine-mist");
  const [cabinetColor, setCabinetColor] = useState("grey");
  const [transport, setTransport] = useState(10000);
  const [installation, setInstallation] = useState(0);
  const [note, setNote] = useState("");

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const variants = Object.keys(product.variants);
  const variantKey = variants.includes(selectedVariant) ? selectedVariant : variants[0];
  const variant = product.variants[variantKey];

  const accessoriesTotal = ACCESSORIES.filter((a) => selectedAccessories.includes(a.id)).reduce(
    (sum, item) => sum + item.price,
    0
  );

  const shellPrice = SHELL_COLORS.find((x) => x.id === shellColor)?.price || 0;
  const cabinetPrice = CABINET_COLORS.find((x) => x.id === cabinetColor)?.price || 0;

  const subtotal = variant.price + accessoriesTotal + shellPrice + cabinetPrice + transport + installation;
  const discountAmount = Math.round(subtotal * (discount / 100));
  const totalNoVat = subtotal - discountAmount;
  const totalVat = Math.round(totalNoVat * 1.12);

  const offerText = useMemo(() => {
    return [
      "PRODEJNÍ NABÍDKA – HYDROPOOL",
      "",
      `Klient: ${customerName || "Neuvedeno"}`,
      `Model: ${product.model}`,
      `Varianta: ${variantKey}`,
      `Barva skořepiny: ${SHELL_COLORS.find((x) => x.id === shellColor)?.name || ""}`,
      `Barva kabinetu: ${CABINET_COLORS.find((x) => x.id === cabinetColor)?.name || ""}`,
      "",
      `Cena bez DPH: ${currency.format(totalNoVat)}`,
      `Cena s DPH 12 %: ${currency.format(totalVat)}`,
      "",
      `Poznámka: ${note || "bez poznámky"}`,
    ].join("\n");
  }, [customerName, product.model, variantKey, shellColor, cabinetColor, totalNoVat, totalVat, note]);

  function toggleAccessory(id: string) {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function downloadOffer() {
    const blob = new Blob([offerText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nabidka-hydropool.txt";
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
            <p>Jednoduchá verze pro rychlé spuštění na Vercelu.</p>
          </div>

          <div className="heroBox">
            <div className="muted">Aktuálně</div>
            <div className="big">{product.model}</div>
            <div className="muted">{variantKey}</div>
            <div className="price">{currency.format(totalNoVat)}</div>
            <div className="muted">bez DPH</div>
          </div>
        </section>

        <div className="grid">
          <div className="leftCol">
            <section className="card">
              <h2>Základní konfigurace</h2>
              <div className="formGrid">
                <div className="field">
                  <label>Klient</label>
                  <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>

                <div className="field">
                  <label>Model</label>
                  <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                    {PRODUCTS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.model}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Varianta</label>
                  <select value={variantKey} onChange={(e) => setSelectedVariant(e.target.value)}>
                    {variants.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Barva skořepiny</label>
                  <select value={shellColor} onChange={(e) => setShellColor(e.target.value)}>
                    {SHELL_COLORS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Barva kabinetu</label>
                  <select value={cabinetColor} onChange={(e) => setCabinetColor(e.target.value)}>
                    {CABINET_COLORS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Sleva (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>

                <div className="field">
                  <label>Doprava</label>
                  <input
                    type="number"
                    min="0"
                    value={transport}
                    onChange={(e) => setTransport(Number(e.target.value))}
                  />
                </div>

                <div className="field">
                  <label>Instalace</label>
                  <input
                    type="number"
                    min="0"
                    value={installation}
                    onChange={(e) => setInstallation(Number(e.target.value))}
                  />
                </div>
              </div>
            </section>

            <section className="card">
              <h2>Technické parametry</h2>
              <div className="stats">
                <div className="stat"><div className="statLabel">Počet míst</div><div className="statValue">{variant.seats}</div></div>
                <div className="stat"><div className="statLabel">Rozměry</div><div className="statValue">{variant.size}</div></div>
                <div className="stat"><div className="statLabel">Trysky</div><div className="statValue">{variant.jets}</div></div>
                <div className="stat"><div className="statLabel">Objem vody</div><div className="statValue">{variant.water}</div></div>
                <div className="stat"><div className="statLabel">Hloubka</div><div className="statValue">{variant.depth}</div></div>
                <div className="stat"><div className="statLabel">Výkon</div><div className="statValue">{variant.power}</div></div>
                <div className="stat"><div className="statLabel">Lehátka</div><div className="statValue">{variant.loungers}</div></div>
                <div className="stat"><div className="statLabel">Váha</div><div className="statValue">{variant.weight}</div></div>
              </div>
              <p className="note">{variant.notes}</p>
            </section>

            <section className="card">
              <h2>Příslušenství</h2>
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
              <h2>Poznámka</h2>
              <textarea
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Poznámka ke klientovi..."
              />
            </section>
          </div>

          <div className="rightCol">
            <section className="card sticky">
              <h2>Souhrn nabídky</h2>

              <div className="summaryRow"><span className="summaryLabel">Model</span><span className="summaryValue">{product.model} • {variantKey}</span></div>
              <div className="summaryRow"><span className="summaryLabel">Příslušenství</span><span className="summaryValue">{currency.format(accessoriesTotal)}</span></div>
              <div className="summaryRow"><span className="summaryLabel">Doprava</span><span className="summaryValue">{currency.format(transport)}</span></div>
              <div className="summaryRow"><span className="summaryLabel">Instalace</span><span className="summaryValue">{currency.format(installation)}</span></div>
              <div className="summaryRow"><span className="summaryLabel">Sleva</span><span className="summaryValue">− {currency.format(discountAmount)}</span></div>

              <div className="hr" />

              <div className="totalRow">
                <span>Celkem bez DPH</span>
                <span>{currency.format(totalNoVat)}</span>
              </div>

              <div className="subTotalRow">
                <span className="muted">Celkem s DPH 12 %</span>
                <span>{currency.format(totalVat)}</span>
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
